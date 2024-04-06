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
  const [content, setContent] = useState("");

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
      console.log("data",res.data)
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
      setContent(res.data.data.content);
    };
    getContent();
  }, [id]);

  return (
    <div className="container">
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
            <th scope="row">Article Content</th>
            <td>{content}</td>
          </tr>
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
