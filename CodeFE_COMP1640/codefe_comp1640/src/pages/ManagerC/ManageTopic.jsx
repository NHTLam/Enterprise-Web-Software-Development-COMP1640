import React from "react";
import "./Style.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const API_BASE = process.env.REACT_APP_API_KEY;
const topicId = 6;
function ManageTopic() {
  const [topicData, setTopicData] = useState([]);
  const [data, setData] = useState([]);
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

  useEffect(() => {
    setTopicData(data.filter(data => data.isTopic === true))
  }, [data])
  console.log("topicData", topicData)

  return (
    <div className="container">
      <h1>Manage Topic</h1>
      <table className="table align-middle mb-0 bg-white table-bordered mt-5">
        <thead className="bg-light text-align-center">
          <tr>
            <th>No</th>
            <th>Topic Title</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {
            topicData?.map((item, index) => {
              return (
                <tr>
                  <td key={index}>{index + 1}</td>
                  <td className="topic_tile">
                    <div className="d-flex align-items-center">{item.content}</div>
                  </td>
                  <td className="topic_startdate">{item.submissionTime}</td>
                  <td className="topic_enddate">{item.submissionTime}</td>
                  <td className="topic_description">{item.content}</td>
                  {item.isApproved === true ? <td> <p className="top_status btn btn-success">Approved</p></td> : <td> <p className="top_status btn btn-warning">Pendding</p></td>}
                  <td className="topic_action">
                    <button
                      type="button"
                      className="btn btn-success btn-sm btn-rounded"
                    >
                      Public
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm btn-rounded"
                    >
                      <Link to={`contribute/view/${topicId}`}> View</Link>
                    </button>
                  </td>

                </tr>
              )
            })
          }

        </tbody>
      </table>
      <div className="btn btn-success m-2" data-bs-toggle="modal" data-bs-target="#createAccount">
          {" "}
          Add new request Topic
      </div>

      {/* Topic approved and have contribute of student */}
      <div class="card mt-5">
        <h5 class="card-header">Topic Name</h5>
        <div class="card-body">
          <h5 class="card-title">Topic Title</h5>

          <p class="card-text">Topic Description</p>
          <p class="card-text">Contribution: 30</p>
          <a href="!#" class="btn btn-primary">
            View Submition
          </a>
        </div>
      </div>
    </div>
  );
}
export default ManageTopic;
