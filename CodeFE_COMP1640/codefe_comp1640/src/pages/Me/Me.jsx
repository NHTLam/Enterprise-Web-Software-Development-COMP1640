import React, { useState } from 'react'
import "./Style.css"
import axios from 'axios';
import { useEffect } from 'react';
const token = localStorage.getItem("token");

const API_BASE = process.env.REACT_APP_API_KEY;

function Me() {
    const [userData, setUserData] = useState();
    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        if (userId !== undefined){
            const getAccount = async () => {
                const response = await axios.post(`${API_BASE}/app-user/get`,{userId: userId}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = response.data;
                setUserData(data);
            }
            getAccount();
        }
    },[]);
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
                            <div class="col col-8 mb-xxl-0">
                                <div class="bg-secondary-soft px-4 py-5 rounded">
                                    <div class="row g-3">
                                        <h4 class="mb-4 mt-0">Contact detail</h4>
                                        <div class="col-md-6">
                                            <label class="form-label">First Name *</label>
                                            <input type="text" class="form-control" placeholder="" aria-label="First name" />
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Last Name *</label>
                                            <input type="text" class="form-control" placeholder="" aria-label="Last name" />
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Student Id *</label>
                                            <input type="text" class="form-control" placeholder="" aria-label="Student Id" />
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Class</label>
                                            <input type="text" class="form-control" placeholder="" aria-label="Class" />
                                        </div>
                                        <div class="col-md-6">
                                            <label for="inputEmail4" class="form-label">Email *</label>
                                            <input type="email" class="form-control" id="inputEmail4" value={userData.email}/>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Phone</label>
                                            <input type="text" class="form-control" placeholder="" aria-label="Phone number" />
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
                            <div class="col-4">
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
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Me