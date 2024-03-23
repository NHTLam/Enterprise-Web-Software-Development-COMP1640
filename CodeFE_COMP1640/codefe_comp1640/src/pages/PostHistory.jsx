import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_KEY;

function PostHistory() {
  const [listPost, setListPost] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    const getPosts = () => {
      axios.get(`${API_BASE}/article/get-by-user/${userId}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          Authorization: `Bearer ${token}`
        }
      }).then(data => {
        console.log(data.data)
        setListPost(data.data.data);
      })
        .catch(err => console.log(err))
    }
    getPosts();
  }, [])
  return (
    <div>
      {listPost.map((post) => {
        return (
          <div class="card">
            <h5 class="card-header">{post.content}</h5>
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="!#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PostHistory