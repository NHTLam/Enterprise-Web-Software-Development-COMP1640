import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
const API_BASE = process.env.REACT_APP_API_KEY || "";
const userId = localStorage.getItem("user_id");

const token = localStorage.getItem("token");

const ViewHistory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [feedback, setFeedback] = useState("");
  // const [articleId, setArticleId] = useState(id);
  const [feedbackTime, setFeedbackTime] = useState(new Date());
  const disabledView = true;
  const [userName, setUserName] = useState("");
  const [data, setData] = useState("");
  const [topicData, setTopicData] = useState("");
  const [file, setFile] = useState();

  useEffect(() => {
    const getFeedback = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${API_BASE}/feedback/getbyarticleID?articleId=${id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("data", res.data)
      setFeedback(res.data[0]?.feedbackContent);
      setUserName(res.data[0]?.username);
    };
    getFeedback();
  }, [id]);

  useEffect(() => {
    const getContent = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE}/article/get/${id}`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setData(res.data.data);
        axios.get(`${API_BASE}/article/get/${res.data.data?.topicId}`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        }).then(data => {
          setTopicData(data.data.data)
        })
        axios
      .post(`${API_BASE}/article/GetUpLoadedFiles?articleId=${res.data.data?.articleId}`, null, {
        headers: {
          "ngrok-skip-browser-warning": true,
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setFile(data.data.data);
      })
      .catch((err) => console.log(err));
      }
    };
    getContent();
  }, [id]);
  return (
    <div className="container">
      <div className="text-black fw-bolder fs-2">
        Topic Infor
      </div>
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th scope="col" className="col-3"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Topic Title</th>
            <td>{topicData.title}</td>
          </tr>
          <tr>
            <th scope="row">Topic Content</th>
            <td>{topicData.content}</td>
          </tr>
          <tr>
            <th scope="row">Start Date</th>
            <td>{topicData.startDate}</td>
          </tr>
          <tr>
            <th scope="row">End Date</th>
            <td>{topicData.endDate}</td>
          </tr>
        </tbody>
      </table>
      <div className="text-black fw-bolder fs-2 mb-0 mt-5">
        Contribution
      </div>
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th scope="col" className="col-3"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Username</th>
            <td>{userName}</td>
          </tr>
          <tr>
            <th scope="row">Contribution</th>
            <td>
              {file?.map((item)=>{
                return(
                  <a href="!#">{item.fileName}</a>
                )
              })}
            </td>
          </tr>
          <tr>
            <th scope="row">Article Content</th>
            <td>{data.content}</td>
          </tr>

          <p>Submit Time: {data.submissionTime}</p>
          <tr>
            <th scope="row">Date</th>
            <td>{feedbackTime.toLocaleString()}</td>
          </tr>
          <tr>
            <th scope="row">Feedback</th>
            <td>
              <textarea
                textarea
                class="form-control shadow-none"
                rows="5"
                value={feedback}
                disabled={disabledView}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewHistory;
