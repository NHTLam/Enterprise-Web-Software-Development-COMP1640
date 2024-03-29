import PostInfor from "../../forms/PostInfor/PostInfor"
import { useState, useEffect, useRef } from "react";
import imageInput from "../../assets/add_image.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from 'react'
const API_BASE = process.env.REACT_APP_API_KEY || "";

function MarketingCFeedb(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const onFileChange = (files) => {
        console.log(files)
    }
    const [imageList, setImageList] = useState([]);
    const fileInputRef = useRef(null);
    const [postData, setPostData] = useState();
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`${API_BASE}/article/get/${id}`, {
            headers: {
                'ngrok-skip-browser-warning': 'true',
                Authorization: `Bearer ${token}`

            }, staleTime: 0
        })
            .then(data => {
                setPostData(data.data.data)
                // console.log(data.data)
            })
            .catch(err => console.log(err))
    })
    // console.log(postData);       
    if (!postData) {
        return <></>;
    }

    const handleClickDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(
                `${API_BASE}/article/delete`,
            );
            if (response.status === 200) {
                navigate("/st_submit_post");
                console.log("delete sucess");
            } else if (response.status === 400) {
                console.log("some thing went wrong");
            }
        } catch (err) {
            console.log("Error " + err);
        }
    };
    function onFileInput(e) {
        const files = e.target.files;
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            // if (files[i].type.split('/')[0] !== 'images') continue;
            if (!imageList.some((e) => e.name === files[i].name)) {
                setImageList((preImages) => [
                    ...preImages, {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    }
                ])
            }
        }
    }
    const fileRemove = (file) => {
        const updatedList = [...imageList];
        updatedList.splice(imageList.indexOf(file), 1);
        setImageList(updatedList);
        props.onFileChange(updatedList);
    }
    return (
        <div>
            <PostInfor />
            <>
                <div className='mt-5 mb-5 max-width m-auto'>

                    <form>
                        <div className='bg-light'>
                            <div className="mb-3 mt-5">
                                <input className="form-control" type="file" id="formFileMultiple" multiple />
                            </div>
                        </div>
                        <div className="drop_card form-control">
                            <div className="image_area">
                                {imageList.map((item, index) => (
                                    <div className="image-preview__item">
                                        <span className="image-preview__item__del" onClick={() => fileRemove(item)}>&times;</span>
                                        <img src={item.url} alt={item.name} />
                                    </div>
                                ))}
                                <div className="drag_area">
                                    <img src={imageInput} alt="image_upload" className='img' />
                                    <input name="file" type="file" className='file_input' onChange={onFileInput} ref={fileInputRef} multiple />
                                </div>
                            </div>
                        </div>

                        <div className="input-group mt-3">
                            <span className="input-group-text">Note</span>
                            <textarea
                                className="form-control"
                                aria-label="With textarea"
                                value={postData.content}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-secondary float-end mt-3">Download Contribution</button>
                        <button type="submit" className="btn btn-success float-end mt-3">Public</button>
                    </form>
                </div>

            </>
        </div>
    )
}

export default MarketingCFeedb