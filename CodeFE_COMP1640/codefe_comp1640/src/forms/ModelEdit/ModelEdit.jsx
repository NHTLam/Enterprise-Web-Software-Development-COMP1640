import React from 'react'
import { useState, useEffect } from 'react';
import * as Toast from "../../components/Toast";
import axios from 'axios';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const API_BASE = process.env.REACT_APP_API_KEY;
const userId = localStorage.getItem("user_id");


function ModelEdit({dataEdit}) {
    console.log(dataEdit);
    const [content, setContent] = useState()
    const [title, setTitle] = useState()
    const [userData, setUserData] = useState([])
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios.post(`${API_BASE}/app-user/get`,
            { userId: userId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        ).then(data => setUserData(data.data)).catch(err => console.log(err))
    }, [])

    // console.log(userData)
    const handleUpdate = async () => {
        try {
            const res = await axios.put(
                `${API_BASE}/article/update?id=${dataEdit.articleId}`,
                {
                    departmentId: dataEdit.departmentId,
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
                    startDate: startDate ? startDate : dataEdit.startDate,
                    endDate: endDate? endDate : dataEdit.endDate,
                    content: content? content : dataEdit.content,
                    title: title? title : dataEdit.title,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (res.status === 200) {
                Toast.toastSuccess("Update Successfully")
                console.log(res)
            }
        } catch {
            Toast.toastErorr("Something went wrong");
        }
    }
    return (
        <div>
            <form>
                <div
                    className="modal fade"
                    id="editTopic"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Reques New Topic
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
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
                                        placeholder={dataEdit.title}
                                        onChange={(e) => setTitle(e.target.value)}
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
                                        placeholder={dataEdit.content}
                                        onChange={(e) => setContent(e.target.value)}
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
                                    <DatePicker selected={startDate ? startDate : dataEdit.startDate } onChange={(date) => setStartDate(date)} />
                                </div>
                                <div className="mb-3">
                                    <label for="start date" className="form-label">
                                        Choose End Date
                                    </label>
                                    <DatePicker selected={endDate ? endDate : dataEdit.endDate } onChange={(date) => setEndDate(date)} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                                <div className="btn btn-success"
                                    data-bs-dismiss="modal" onClick={handleUpdate}
                                    type="submit">
                                    update topic
                                </div>
                            </div>
                        </div >
                    </div >
                </div >
            </form >
        </div >
    )
}

export default ModelEdit