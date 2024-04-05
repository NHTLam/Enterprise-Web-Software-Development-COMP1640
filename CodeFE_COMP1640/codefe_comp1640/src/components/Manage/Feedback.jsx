import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Toast from "../../components/Toast";

const API_BASE = process.env.REACT_APP_API_KEY;

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [articleId, setArticleId] = useState(6);
  const [feedbackTime, setFeedbackTime] = useState(new Date());
  const [isSending, setIsSending] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);
  const navigate = useNavigate();

  const handleFeedback = async () => {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    try {
      setIsSending(true);
      setIsChanging(true);
      const formattedFeedbackTime = feedbackTime.toISOString();
      const newFeedback = {
        userId: userId,
        articleId: articleId,
        feedback: feedback,
        feedbackTime: formattedFeedbackTime,
      };
      const saveFeedback = await axios.post(
        `${API_BASE}/feedback/create`,
        {
          userId: userId,
          articleId,
          feedbackContent: feedback,
          feedbackTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (saveFeedback.status === 403) {
        console.log("No Permission!");
        Toast.toastErorr("You do not have permission to perform this action");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      console.log("Create feedback success");
      console.log("asdasd: " + saveFeedback.data);
      const FeedbackIndex = feedbackList.findIndex(
        (item) => item.userId === userId && item.articleId === articleId
      );

      if (FeedbackIndex !== -1) {
        const updatedFeedbackList = [...feedbackList];
        updatedFeedbackList[FeedbackIndex] = newFeedback;
        setFeedbackList(updatedFeedbackList);
      } else {
        setFeedbackList([...feedbackList, newFeedback]);
      }
    } catch (err) {
      console.error("Error sending feedback:", err);
    }
  };

  const handleUpdate = async () => {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    try {
      setIsSending(false);
      setIsChanging(false);
      const formattedFeedbackTime = feedbackTime.toISOString();
      const updateFeedback = {
        userId: userId,
        articleId: articleId,
        feedbackContent: feedback,
        feedbackTime: formattedFeedbackTime,
      };
      const saveFeedback = await axios.put(
        `${API_BASE}/feedback/update/${userId}`,
        {
          updateFeedback,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (saveFeedback.status === 403) {
        console.log("No Permission!");
        Toast.toastErorr("You do not have permission to perform this action");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      console.log("Feedback updated successfully:", saveFeedback.data);
      const FeedbackIndex = feedbackList.findIndex(
        (item) => item.userId === userId && item.articleId === articleId
      );
      if (FeedbackIndex !== -1) {
        const updatedFeedbackList = [...feedbackList];
        updatedFeedbackList[FeedbackIndex] = updateFeedback;
        setFeedbackList(updatedFeedbackList);
      }
    } catch (err) {
      console.log("Error updating feedback:", err);
    }
  };

  useEffect(() => {
    const listFb = () => {
      const token = localStorage.getItem("token");
      axios
        .get(`${API_BASE}/feedback/list`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Ab ", res.data);
          setFeedbackList(res.data);
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    };
    listFb();
  }, []);

  const userId = localStorage.getItem("user_id");
  return (
    <div className="container border border-5">
      <h3>Feedback</h3>
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
              <th scope="row">UserID</th>
              <td>{userId}</td>
            </tr>
            <tr>
              <th scope="row">ArticleID</th>
              <td>{articleId}</td>
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
                  onChange={(e) => setFeedback(e.target.value)}
                  disabled={isSending ? true : false}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="mb-2">
          <button
            className="btn btn-group btn-outline-primary mr-2"
            type="submit"
            onClick={isChanging ? handleUpdate : handleFeedback}
          >
            {isChanging ? "update" : "save"}
          </button>
        </div>
      </div>

      <hr />
      <table className="table table-striped mt-2 text-center">
        <tr>
          <th>userID</th>
          <th>FID</th>
          <th>ArticleID</th>
          <th>Date</th>
          <th>Feedback</th>
        </tr>
        {feedbackList.map((feedbackk) => (
          <tr key={feedbackk.userId}>
            <td>{feedbackk.userId}</td>
            <td>{feedbackk.feedbackId}</td>
            <td>{feedbackk.articleId}</td>
            <td>{feedbackk.feedbackTime}</td>
            <td>{feedbackk.feedbackContent}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Feedback;
