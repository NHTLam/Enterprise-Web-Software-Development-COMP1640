import React from 'react'
import { useState, useEffect } from 'react';
import * as Toast from "../../components/Toast";
import axios from 'axios';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const API_BASE = process.env.REACT_APP_API_KEY;


function ModelAdd() {
    const [credentials, setCredentials] = useState({})
    const [userData, setUserData] = useState([])
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        axios.post(`${API_BASE}/app-user/get`,
            { userId: userId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        ).then(data => setUserData(data.data)).catch(err => console.log(err))
    }, [])
    console.log("test data: ", userData)
   
    console.log("departmentId: ", userData.departmentId)
    // console.log(userData)
    const handleNewTopic = async () => {
        const userId = localStorage.getItem("user_id");
        try {
            const res = await axios.post(
                `${API_BASE}/article/create`,
                {
                    departmentId: userData.departmentId,
                    userId: userId,
                    isTopic: true,
                    fileData: null,
                    submissionTime: null,
                    isApproved: false,
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
                setTimeout(() => {
                    window.location.reload();
                }, 4000)
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