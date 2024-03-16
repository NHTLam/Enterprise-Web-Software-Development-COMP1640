import React, { useState, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import './Style.css'
import imageInput from '../../assets/add_image.png';
import { Link, useNavigate } from "react-router-dom";

const PostSubmit = props => {
    // const API_KEY_URL = import.meta.env.API_URL_KEY|| "";
    const navigate = useNavigate();
    const [imageList, setImageList] = useState([]);
    const [userId,setUserId] = useState(2);
    const [departmentId,setDepartmentId] = useState(1);

    const [content,setContent] = useState("test delete");
    const fileInputRef = useRef(null);

    const handleClickSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `https://5b28-2405-4802-1d0e-f8f0-f97e-3de2-2c81-98a7.ngrok-free.app/api/Article`,
                {
                    departmentId,
                    userId,
                    content
                }
            );
            const postData = response.data;
            if (response.status === 200) {
                console.log("Submit successful", postData);
            } else if (response.status === 400) {
                console.log("some thing went wrong");
            }
        } catch (err) {
            console.log("Error " + err);
        }
    };

    // const handleChange = (e) => {
    //     setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    // };

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
        <>
            <div className='mt-5 mb-5 max-width m-auto'>
                <form>
                    <div className='bg-light'>
                        <div className="mb-3 mt-5">
                            <input className="form-control" type="file" id="fileData" multiple />
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
                        <textarea className="form-control" aria-label="With textarea"  id="content"></textarea>
                    </div>

                    <button type="submit" className="btn btn-secondary float-end mt-3" onClick={handleClickSubmit}>Submit</button>
                </form>
            </div>

        </>
    )
}
PostSubmit.protoTypes = {
    onFileChange: PropTypes.func
}
export default PostSubmit