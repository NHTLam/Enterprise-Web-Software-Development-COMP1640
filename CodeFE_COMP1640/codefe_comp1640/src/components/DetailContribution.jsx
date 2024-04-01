import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
const API_BASE = process.env.REACT_APP_API_KEY;
const token = localStorage.getItem("token");
const user = localStorage.getItem("user_id");

const DetailContribution = () => {
  const { contributionId } = useParams();
  const [comment, setComment] = useState("");
  const [listCmt, setListCmt] = useState([]);
  const [articleId, setArticleId] = useState(contributionId);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  console.log("user: ", user);
  const handleSubmitComment = async (e) => {
    if (e.key === "Enter") {
      try {
        const response = await axios.post(
          `${API_BASE}/comment/create`,
          {
            articleId: articleId,
            userId: user,
            commentContent: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 403) {
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }

        const newComment = [...listCmt, response.data];
        setListCmt(newComment);
        setComment("");
      } catch (error) {
        console.error("Error creating comment:", error); // Handle network or other errors
      }
    }
  };

  useEffect(() => {
    const listCmt = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.post(
          `${API_BASE}/comment/list-by-artical-id`,
          { articleId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 403) {
          setTimeout(() => {
            navigate("/detail-contribution");
          }, 1000);
        }
        setListCmt(res.data);
        console.table("List of commnet:", JSON.stringify(res.data));
      } catch (err) {
        console.log("Failed to list account! " + err);
      }
    };
    listCmt();
  }, [listCmt]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API_BASE}/article/get/${contributionId}`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setData(data.data.data);
      })
      .catch((err) => console.log(err));
  }, [data]);

  //   View detail contribution and comment
  return (
    <div className="container">
      {
        <div>
          <table className="table table-striped mt-5">
            <thead>
              <tr>
                <th scope="col" className="col-3"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Title</th>
                <td>{data.title}</td>
              </tr>
              <tr>
                <th scope="row">Description</th>
                <td>
                  <h1>{data.content}</h1>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      }

      <hr />
      <div className="form-comment border border-2 mt-3">
        <div className="input-group">
          <span className="input-group-text">Comment</span>
          <textarea
            className="form-control"
            aria-label="With textarea"
            id="content"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleSubmitComment}
          ></textarea>
        </div>
        {listCmt.map((cmt) => (
          <div key={cmt.userId} className="bg-light rounded-4 p-0 mt-2">
            <h4 className="fw-bold text-black ms-3">
              {cmt.userForComment.userName}
            </h4>
            <p className="text-black ms-3">{cmt.commentContent}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailContribution;
