import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import Slide from '../components/Slide';
import thumgnail from "../assets/slide3.jpeg"
const API_BASE = process.env.REACT_APP_API_KEY;

const Home = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState();
    const [contributions, setContributions] = useState([]);
    const [data,setData] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`${API_BASE}/article/GetAllArticle`, {
            headers: {
                'ngrok-skip-browser-warning': 'true',
                Authorization: `Bearer ${token}`
            }
        }).then(data => {
            console.log("data", data.data.data)
            setData(data.data.data)
        })
            .catch(err => console.log(err))
    }, [])
    useEffect(()=>{
    setContributions(data.filter(data => (data.isApproved === true && data.isTopic === false)))
    },[data])
    console.log("data",data)
    console.log("Approved", contributions)
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
    // useEffect(() => {
    //     const id = localStorage.getItem("user_id");
    //         if (id !== undefined&&id !== "undefined" && id !== null) {
    //             const token = localStorage.getItem("token");
    //             const getAccount = async () => {
    //                 const response = await axios.post(`${API_BASE}/app-user/get`, { userId: id }, {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`
    //                     }
    //                 });
    //                 setUserData(response);
    //             }
    //             getAccount();
    //         }
    // }, []);
    localStorage.setItem("user", userData);
    //department data
    const departments = [
        {
            id: 1,
            name: "Information Technology",
            thumgnail: "https://www.franklin.edu/sites/default/files/styles/btcb_photo/public/fr/back%20to%20college%20blog/main%20images/iStock-1081869346.jpg?itok=aBlpXTJR"
        },
        {
            id: 2,
            name: "Business and Economics",
            thumgnail: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/3AmsNeMmdIUytvhtu8ePPX/92e66e4f3ec1ed931a4d4ecaec27b029/GettyImages-551986071.jpg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000"
        },
        {
            id: 3,
            name: "Graphics Design",
            thumgnail: "https://learn.g2.com/hubfs/iStock-1191609321%20%281%29.jpg"
        },
        {
            id: 4,
            name: "Marketing",
            thumgnail: "https://blog.webico.vn/wp-content/uploads/2017/01/tu-vung-tieng-anh-trong-marketing-scaled.jpg"
        }
    ]

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
                    departments.map((item, index) => {
                        return (
                            <div key={index} className="col-4 p-1">
                                <Link to={`/department/${item.id}`}>
                                    <div className="card w-100">
                                        <img src={item.thumgnail} className="card-img w-100" style={mystyle} alt="..." />
                                        <div className="card-img-overlay d-flex justify-content-center">
                                            <h5 className="card-title fs-3 text-dark">{item.name}</h5>
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
                <Pagination itemsPerPage={5} dataContributions={contributions} />
            </div>
        </div>
    )
}

export default Home