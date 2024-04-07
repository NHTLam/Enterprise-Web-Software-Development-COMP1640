import React, { useState } from 'react'
import "./Style.css"
import axios from 'axios';

import * as Toast from "../../components/Toast"
import { useEffect } from 'react';
import Header from '../../components/Header';

const API_BASE = process.env.REACT_APP_API_KEY;

function Me() {
    const [credentials, setCredentials] = useState({});
    const userId = localStorage.getItem("user_id");
    const [userData, setUserData] = useState();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleClickUpdate = async (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault();
         const res = await axios.post(`${API_BASE}/app-user/update`, {
            userId: +userId,
            username: userData.username,
            departmentId: userData.departmentId,
            email: userData.email,
            password: userData.password,
            class: userData.class,
            roleUserMappings: userData.roleUserMappings,
            ...credentials}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(res.status === 200){
            Toast.toastSuccess("User updated successfully");
        }
        // }else{
        //     Toast.toastErorr("Error updating user");
        // }
    }
    // console.log(userData.roleUserMapping)
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (userId !== undefined) {
            const getAccount = async () => {
                const response = await axios.post(`${API_BASE}/app-user/get`, { userId: userId }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = response.data;
                setUserData(data);
            }
            getAccount();
        }
    }, []);
    if (userData == null) return <></>



    return (
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="my-5">
                        <h3>My Profile</h3>
                        <hr />
                    </div>
                    <form class="file-upload">
                        <div class="row">
                            <div class="col mb-xxl-0">
                                <div class="bg-secondary-soft px-4 py-5 rounded">
                                    <div class="row g-3">
                                        <h4 class="mb-4 mt-0">Contact detail</h4>
                                        <div class="col-md-6">
                                            <label class="form-label">Id</label>
                                            <input type="text" class="form-control" placeholder="" aria-label="Student Id" value={userData.userId} />
                                        </div>
                                        <div class="col-md-6">
                                            <label for="inputEmail4" class="form-label">Email</label>
                                            <input type="email" class="form-control" id="inputEmail4" value={userData.email} />
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">User Name</label>
                                            <input type="text" class="form-control" placeholder="" aria-label="Last name" value={userData.username} />
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Class</label>
                                            <input type="text" class="form-control" placeholder="" aria-label="Class" value={userData.class} />
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Address</label>
                                            <input type="text" class="form-control" placeholder={userData.address} aria-label="First name" onChange={handleChange} id="address"/>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Phone</label>
                                            <input type="text" class="form-control" placeholder={userData.phone} aria-label="Phone number" onChange={handleChange} id="phone" maxlength="10" minlength="10" />
                                        </div>
                                    </div>
                                </div>



                                {/* <div class="bg-secondary-soft mt-3 px-4 py-5 rounded">
                                    <div class="row g-3">
                                        <h4 class="my-4">Change Password</h4>

                                        <div class="col-md-6">
                                            <label for="exampleInputPassword1" class="form-label">Old password *</label>
                                            <input type="password" class="form-control" id="exampleInputPassword1" />
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <label for="exampleInputPassword2" class="form-label">New password *</label>
                                            <input type="password" class="form-control" id="exampleInputPassword2" />
                                        </div>
                                       
                                        <div class="col-md-12">
                                            <label for="exampleInputPassword3" class="form-label">Confirm Password *</label>
                                            <input type="password" class="form-control" id="exampleInputPassword3" />
                                        </div>
                                    </div>
                                </div> */}

                            </div>
                            {/* <div class="col-4">
                                <div class="bg-secondary-soft px-4 py-5 rounded">
                                    <div class="row g-3">
                                        <h4 class="mb-4 mt-0">Upload your profile photo</h4>
                                        <div class="text-center">
                                            <div class="square position-relative display-2 mb-3">
                                                <i class="fas fa-fw fa-user position-absolute top-50 start-50 translate-middle text-secondary"></i>
                                            </div>
                                            <input type="file" id="customFile" name="file" hidden="" />
                                            <label class="btn btn-success-soft btn-block" for="customFile">Upload</label>
                                            <button type="button" class="btn btn-danger-soft">Remove</button>
                                            <p class="text-muted mt-3 mb-0"><span class="me-1">Note:</span>Minimum size 300px x 300px</p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="btn btn-success mt-5" onClick={handleClickUpdate}>
                                Update
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Me