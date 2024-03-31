
import PostInfor from "../../forms/PostInfor/PostInfor"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Contribution from "../../forms/Contribution/Contribution";
const API_BASE = process.env.REACT_APP_API_KEY;

function TopicDetail({ dataTopic }) {
  const [data, setData] = useState([]);
  const [finalData, setfinalData] = useState([]);
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
  useEffect(() => {
    console.log("is running")
    if (Array.isArray(data)) {
    setfinalData(data.filter(data => data.topicId === dataTopic.articleId))
  }
  }, [dataTopic])
  return (
    <div>
      <form>
        <div
          className="modal fade"
          id="topicDetail"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Topic Detail
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <PostInfor dataTopic={dataTopic} />
                <Contribution currentItems={finalData} />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div >
          </div >
        </div >
      </form >
    </div>
  )
}

export default TopicDetail