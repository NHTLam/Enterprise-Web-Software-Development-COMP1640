import PostInfor from "../forms/PostInfor/PostInfor"
import PostSubmit from "../forms/PostSubmit/PostSubmit";

import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_KEY;

function StAddPost() {
    const {topicId} = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`${API_BASE}/article/get/${topicId}`, {
            headers: {
                'ngrok-skip-browser-warning': 'true',
                Authorization: `Bearer ${token}`
            }
        }).then(data => {
            setData(data.data.data)
        })
            .catch(err => console.log(err))
    }, [data])
    const onFileChange = (files) =>{
        console.log(files)
    }

    return (
        <div className="mt-5">
            <h1 className="text-black fw-bolder">Submit Contribution</h1>
            <PostInfor dataTopic={data}/>
            <PostSubmit onFileChange={(files) => onFileChange(files)} />
        </div>
    )
}

export default StAddPost