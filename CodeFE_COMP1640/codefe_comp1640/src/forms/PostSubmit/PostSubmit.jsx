import React, { useState, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import './Style.css';
import imageInput from '../../assets/add_image.png';
import { Link, useNavigate } from "react-router-dom";
const API_BASE = process.env.REACT_APP_API_KEY;

const PostSubmit = props => {
    //decalre value
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    //State
    const [imageList, setImageList] = useState([]);
    const [selectedFile, setSelectedFile] = useState("");
    const [departmentId, setDepartmentId] = useState(1);
    const [credentials, setCredentials] = useState({});

    //functions
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleClickSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('Please select a file to upload.');
            return;
        }

        console.log(selectedFile)
        const formData = new FormData();
        formData.append('file', selectedFile);
        console.log(formData.get('file'));

        try {
            const response = await axios.post(`${API_BASE}/article/upload-file`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            const res = await axios.post(
                `${API_BASE}/article/create`,
                {
                    departmentId,
                    userId,
                    ...credentials,
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const postData = response.data;
            if (res.status === 200) {
                console.log("Submit successful", postData);
            } else if (res.status === 400) {
                console.log("some thing went wrong");
            }
            if (response.status === 200) { // Assuming successful upload has status 200
                console.log('File uploaded successfully!');
                setSelectedFile(null); // Clear file selection
            } else {
                console.error('Error uploading file:', response.data); // Access error details from response
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // const handleClickSubmit = async (e) => {
    //     e.preventDefault();

    //     const data = new FormData();
    //     data.append("file", file);
    //     axios.post(`${API_BASE}/article/upload-file`, data, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     }).then(res => console.log(res.data))
    //     .catch(err => console.log(err))
    //     try {
    //         const response = await axios.post(
    //             `${API_BASE}/article/create`,
    //             {
    //                 departmentId,
    //                 userId,
    //                 fileData: data,
    //                 ...credentials,
    //             }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         const postData = response.data;
    //         if (response.status === 200) {
    //             console.log("Submit successful", postData);
    //         } else if (response.status === 400) {
    //             console.log("some thing went wrong");
    //         }
    //     } catch (err) {
    //         console.log("Error " + err);
    //     }
    // };

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
                            <input className="form-control" type="file" id="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
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
                        <textarea className="form-control" aria-label="With textarea" id="content" onChange={handleChange}></textarea>
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