import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_KEY;
function Contribution({ currentItems, link }) {
    const navigate = useNavigate();
    const [listPost, setListPost] = useState([])
    var id = "";
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");
        const getPosts = () => {
            axios
                .get(`${API_BASE}/article/get-by-user/${userId}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((data) => {
                    setListPost(data.data.data.filter(data => data.isTopic === false));
                })
                .catch((err) => console.log(err));
        };
        getPosts();
        
    }, []);

    function CheckArticle(item) {
        
        console.log("List Post", listPost);
        console.log("item recive", item);
        const foundItem =  listPost.find(con => con?.topicId === item?.articleId);
        if (foundItem) {
            console.log("same");
            console.log("contribution already have in topic", foundItem);
            navigate(`/contribute/view/edit/${foundItem.articleId}`)
        }
    }
    return (
        <div className="d-flex flex-wrap mt-4 mb-4 w-100">
            {
                currentItems.map((item, index) => {
                    return (
                        <div className='w-100' >
                            <div className="mb-3 w-100">
                                <div class="card w-100">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <img src="https://www.analyticsinsight.net/wp-content/uploads/2021/07/Technology-Can-Boost-Your-Business-Productivity.jpg" 
                                            class="img-fluid rounded-start" alt="..." />
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">{item.title}</h5>
                                                <p class="card-text">{item.content}</p>
                                                <p>{item?.startDate}</p>
                                                <p>{item?.endDate}</p>
                                                <p class="card-text" onClick={()=>CheckArticle(item)}>
                                                    <Link to={`${link}/${item.articleId}`} class="btn btn-light">See moree</Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Contribution