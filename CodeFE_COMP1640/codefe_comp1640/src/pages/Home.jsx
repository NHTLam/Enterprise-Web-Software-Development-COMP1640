import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
const API_BASE = process.env.REACT_APP_API_KEY;

const Home = () => {

    const navigate = useNavigate();
    const [userId, setUserId] = useState();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const token = localStorage.getItem("token");
            if (userId === undefined || userId === null) {
                const getUserId = async () => {
                    const response = await axios.post(`${API_BASE}/app-user/get-user-id`, null, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUserId(response.data);
                }
                getUserId();
            }
        }
        navigate("/");
    }, [])
    localStorage.setItem("user_id", userId);
    return (
        <div className="container">
            <div className="row">
                <h1 className='mt-5'>Topic</h1>
                <hr></hr>
                <div className="col">
                    <Link to={"/topic/view"}>
                        <div className="card">
                            <img src="https://www.analyticsinsight.net/wp-content/uploads/2021/07/Technology-Can-Boost-Your-Business-Productivity.jpg" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <p className="card-text">dsasadas</p>
                            </div>
                        </div>

                    </Link>
                </div>
                <div className="col-5">
                    <div className="card h-100">
                        <img src="https://www.analyticsinsight.net/wp-content/uploads/2021/07/Technology-Can-Boost-Your-Business-Productivity.jpg" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className='mt-5'>Top contribution</h1>
            <hr></hr>
            <Pagination itemsPerPage={4} />
        </div>
    )
}

export default Home