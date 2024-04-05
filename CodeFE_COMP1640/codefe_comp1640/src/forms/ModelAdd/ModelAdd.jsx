import React from 'react'
import { useState, useEffect } from 'react';
import * as Toast from "../../components/Toast";
import axios from 'axios';
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";
const API_BASE = process.env.REACT_APP_API_KEY;


function ModelAdd() {
    const [credentials, setCredentials] = useState({

    })
    const [userData, setUserData] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
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
    const handleStartDate = (e) =>{
        const dateSelected = new Date(e)
        const currentDtae = new Date();
        if(dateSelected < currentDtae){
            Toast.toastErorr("Start Date cannot be less than current date")
            setStartDate("");
        }else{

            setStartDate(dateSelected)
        }
    }

    const handleEndDate = (e) =>{
        const dateSelected = new Date(e);
        const currentDtae = new Date();
        if(dateSelected < currentDtae){
            setEndDate("");
            Toast.toastErorr("End Date cannot be less than current date")
        }else{

            setEndDate(dateSelected)
        }
    }

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
                Toast.toastSuccess("Request Topic Success")
                setTimeout(() => {
                    navigate("/mk-manage-topic")
                }, 3000)
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

                <h5 className="modal-title fs-2 fw-bolder text-black mb-4" id="exampleModalLabel">
                    Reques New Topic
                </h5>

                <div className="">
                    {/* <!-- Form to input user details --> */}
                    <div className="w-50 mb-3">
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

                    <div className="w-50 mb-3">
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
                        <DatePicker selected={startDate} onChange={handleStartDate} />
                    </div>
                    <div className="mb-3">
                        <label for="start date" className="form-label">
                            Choose End Date
                        </label>
                        <DatePicker selected={endDate} onChange={handleEndDate} />
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