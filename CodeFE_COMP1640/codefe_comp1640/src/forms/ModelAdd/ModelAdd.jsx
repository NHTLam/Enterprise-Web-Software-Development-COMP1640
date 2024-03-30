import React from 'react'
import { useState, useEffect } from 'react';
import * as Toast from "../../components/Toast";
import axios from 'axios';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const API_BASE = process.env.REACT_APP_API_KEY;
const userId = localStorage.getItem("user_id");


function ModelAdd() {
    const [credentials, setCredentials] = useState({})
    const [userData, setUserData] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const token = localStorage.getItem("token");

    useEffect(() => {
       const res =  axios.post(`${API_BASE}/app-user/get`,
            { userId: userId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        if(res.status === 200){
        setUserData(res.data); 
        setTimeout(() => {
            window.location.reload();
        }, 4000);
    }
    }, [])

    // console.log(userData)
    const handleNewTopic = async () => {
        try {
            const res = await axios.post(
                `${API_BASE}/article/create`,
                {
                    departmentId: userData.departmentId,
                    userId: userId,
                    isTopic: true,
                    fileData: null,
                    submissionTime: null,
                    isApproved: true,
                    comments: [],
                    department: null,
                    feedbacks: [],
                    user: null,
                    topicId: null,
                    startDate: startDate,
                    endDate: endDate,
                    ...credentials,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (res.status === 200) {
                Toast.toastSuccess("Request Toast Success")
                console.log(res)
            }
        } catch {
            Toast.toastErorr("Something went wrong");
        }
    }
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    return (
        <div>
            <form>

                <h5 className="modal-title" id="exampleModalLabel">
                    Reques New Topic
                </h5>

                <div className="body">
                    {/* <!-- Form to input user details --> */}
                    <div className="mb-3">
                        <label for="title" className="form-label">
                            Title of Topic
                        </label>
                        <input
                            name="title"
                            type="text"
                            className="form-control"
                            id="title"
                            placeholder="Enter Title"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label for="content" className="form-label">
                            Description
                        </label>
                        <input
                            name="content"
                            type="text"
                            className="form-control"
                            id="content"
                            placeholder="Enter Description"
                            onChange={handleChange}
                        />
                    </div>
                    {/* <div className="mb-3">
                                    <label for="email" className="form-label">
                                        Image Thumnail
                                    </label>
                                    <input
                                        name="email"
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter Email"
                                        onChange={handleChange}
                                    />
                                </div> */}
                    <div className="mb-3">
                        <label for="start date" className="form-label">
                            Choose Start Date
                        </label>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                    <div className="mb-3">
                        <label for="start date" className="form-label">
                            Choose End Date
                        </label>
                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                    </div>
                </div>
                <div className="footer">
                    <div className="btn btn-success" onClick={handleNewTopic}>
                        create new topic
                    </div>
                </div>
            </form >
        </div >
    )
}

export default ModelAdd