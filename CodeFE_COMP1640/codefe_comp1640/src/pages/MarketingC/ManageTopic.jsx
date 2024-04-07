import React from "react";
import "./Style.css";
import axios from "axios";
import { useState, useEffect } from "react";
import ModelAdd from "../../forms/ModelAdd/ModelAdd";
import ModelEdit from "../../forms/ModelEdit/ModelEdit";
import Pagination from "../../components/Pagination";
import TopicDetail from "./TopicDetail";
const API_BASE = process.env.REACT_APP_API_KEY;

function ManageTopic() {
  const [topicData, setTopicData] = useState([]);
  const [topicApproved, setTopicApproved] = useState([]);
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);
  const [DataFromChild, setDataFromChild] = useState([]);
  const [dataContribution, setDataContribution] = useState([]);
  const [TopicInfor, setTopicInfor] = useState([]);
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
    if (Array.isArray(data)) {
      setTopicData(data.filter(data => data.isTopic === true && data.isApproved === false));
    }
  },[data])

  useEffect(() => {
    if (Array.isArray(data)) {
      setTopicApproved(data.filter(data => data.isApproved === true && data.isTopic === true));
    }
  },[data])

  useEffect(() => {
      setDataContribution(data.filter(data => data.topicId === topicApproved && data.isTopic === true));
  },[data])
  
  const handleDataFromChild = (data) => {
    setDataFromChild(data);
  };
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
            [...topicData].reverse()?.map((item, index) => {
              return (
                <tr>
                  <td key={index}>{index + 1}</td>
                  <td className="topic_tile">
                    <div className="d-flex align-items-center">{item.title}</div>
                  </td>
                  <td className="topic_startdate">{item.startDate?.toLocaleString()}</td>
                  <td className="topic_enddate">{item.endDate?.toLocaleString()}</td>
                  <td className="topic_description">{item.content}</td>
                  {item.isApproved === true ? <td> <p className="top_status btn btn-success">Approved</p></td> : <td> <p className="top_status btn btn-warning">Pending</p></td>}
                  <td className="topic_action">
                    {/* <button
                      type="button"
                      className="btn btn-success-soft btn-sm btn-rounded"
                    >
                      Public
                    </button> */}
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#editTopic"
                      className="btn btn-danger-soft btn-sm btn-rounded ms-2"
                      onClick={()=>setDataEdit(item)}
                    >
                      {" "}
                      Edit
                    </button>
                  </td>

                </tr>
              )
            })
          }

        </tbody>
      </table>

      {/* Topic approved and have contribute of student */}
      {
        [...topicApproved].reverse()?.map((item,idex) =>{
          return(
            <div class="card mt-5">
            <h5 class="card-header"><span className="text-black fw-bolder">Topic {item.articleId}:</span> {item.title} </h5>
            <div class="card-body">
              <h5 class="card-title">{item.content}</h5>
    
              <p class="card-text">Start Date: {item.startDate?.toLocaleString()}</p>

              <p class="card-text">End Date: {item.endDate?.toLocaleString()}</p>
              <p class="card-text">Contribution: 30</p>
              <a href="!#" class="btn btn-primary" onClick={()=>setTopicInfor(item)}
              data-bs-toggle="modal"
              data-bs-target="#topicDetail"
              >
                View Submition
              </a>
            </div>
          </div>
          )
        })
        
      }

      <ModelEdit dataEdit={dataEdit}/>
      <TopicDetail dataTopic={TopicInfor}  sendDataToParent={handleDataFromChild}  />
    </div>
  );
}
export default ManageTopic;
