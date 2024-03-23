import React, { useState, useEffect } from "react";
import axios from "axios";
const token = localStorage.getItem("token");
const API_BASE = process.env.REACT_APP_API_KEY;

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [articleId, setArticleId] = useState(6);
  const [userId, setUserId] = useState(2);
  const [feedbackTime, setFeedbackTime] = useState(new Date());
  const [isSending, setIsSending] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);

  const handleFeedback = async () => {
    try {
      const formattedFeedbackTime = feedbackTime.toISOString();
      const saveFeedback = axios.post(
        `${API_BASE}/feedback/create`,
        {
          userId,
          articleId,
          feedback,
          feedbackTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newFeedback = {
        userId: userId,
        articleId: articleId,
        context: feedback,
        feedbackTime: formattedFeedbackTime,
      };

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
      setIsSending(true);
      setIsChanging(true);
    } catch (err) {
      console.error("Error sending feedback:", err);
    }
  };

  const handleUpdate = () => {
    setIsSending(false);
    setIsChanging(false);
  };

  useEffect(() => {
    console.log("Feedback list updated:", feedbackList);
  }, [feedbackList]);

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
              <td>1</td>
            </tr>
            <tr>
              <th scope="row">ArticleID</th>
              <td>1</td>
            </tr>
            <tr>
              <th scope="row">Date</th>
              <td>Friday, 18 March 2022, 4:47 PM</td>
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
          <th>ArticleID</th>
          <th>Date</th>
          <th>Feedback</th>
        </tr>
        {feedbackList.map((feedbackk) => (
          <tr key={feedbackk.userId}>
            <td>{feedbackk.userId}</td>
            <td>{feedbackk.articleId}</td>
            <td>{feedbackk.feedbackTime}</td>
            <td>{feedbackk.context}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Feedback;
