import PostInfor from "../components/PostInfor"
import { useState, useEffect, useRef } from "react";
import imageInput from "../assets/add_image.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import React from 'react'

function StEditPost(props) {
    const navigate = useNavigate();
    const onFileChange = (files) => {
        console.log(files)
    }
    const [imageList, setImageList] = useState([]);
    const fileInputRef = useRef(null);
    const [postData, setPostData] = useState();

    useEffect(() => {
        axios.get("https://5b28-2405-4802-1d0e-f8f0-f97e-3de2-2c81-98a7.ngrok-free.app/api/Article/89", {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            },staleTime: 0
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
                `https://5b28-2405-4802-1d0e-f8f0-f97e-3de2-2c81-98a7.ngrok-free.app/api/Article/89`,
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
                            <span className="input-group-text">With textarea</span>
                            <p>{postData.content}</p>
                        </div>
                        <button type="submit" className="btn btn-secondary float-end mt-3">Submit</button>
                        <button type="submit" className="btn btn-secondary float-end mt-3" onClick={handleClickDelete}>Detele</button>
                    </form>




                </div>

            </>
        </div>
    )
}

export default StEditPost