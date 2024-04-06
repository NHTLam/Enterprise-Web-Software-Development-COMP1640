import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import Slide from '../components/Slide';
import thumgnail from "../assets/slide3.jpeg"
import * as Department from "../data/department"
const API_BASE = process.env.REACT_APP_API_KEY;

const Home = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState();
    const [userData, setUserData] = useState();
    const [contributions, setContributions] = useState([]);
    const [data,setData] = useState([]);
    const [departmentData, setDepartmentData] = useState(Department.DepartmentData());
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`${API_BASE}/article/GetAllArticle`, {
            headers: {
                'ngrok-skip-browser-warning': 'true',
                Authorization: `Bearer ${token}`
            }
        }).then(data => {
            setData(data.data.data)
        })
            .catch(err => console.log(err))
    }, [])
    useEffect(()=>{
    setContributions(data.filter(data => (data.isApproved === true && data.isTopic === false)))
    },[data])
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
    //department data


    const mystyle = {
        maxHeight: "280px",
        minHeight: "280px",
    };
    return (
        <div className="container p-0">
            <Slide />
            <div className="row">
                <h1 className='mt-5'>Department</h1>
                <hr></hr>
                {
                    departmentData.map((item, index) => {
                        return (
                            <div key={index} className="col-4 p-1">
                                <Link to={`/department/${item.id}`}>
                                    <div className="card w-100">
                                        <img src={item.thumgnail} className="card-img w-100" style={mystyle} alt="..." />
                                        <div className="card-img-overlay d-flex justify-content-center">
                                            <h5 className="card-title fs-3 text-black fw-bold">{item.name}</h5>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }

                {/* <div className="col p-1">
                    <Link>
                        <div className="card">
                            <img src={thumgnail} className="card-img" alt="..." />
                            <div className="card-img-overlay">
                                <h5 className="card-title"></h5>
                            </div>
                        </div>
                    </Link>
                </div> */}
            </div>
            <hr className='mt-5'></hr>
            <nav className="navbar navbar-expand-lg navbar-light ">
                <div className="container">
                    <div className="collapse navbar-collapse w-50" id="navbarSupportedContent">

                        <h1 className=''>Top contribution</h1>
                    </div>
                    <form className="d-flex me-2 ms-5 w-100">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-secondary border border-primary" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <div className="d-flex flex-wrap justify-content-center align-content-center mb-5">
                <Pagination itemsPerPage={5} dataContributions={[...contributions].reverse()} link ={"/contribution/detail"} />
            </div>
        </div>
    )
}

export default Home