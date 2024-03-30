import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const API_BASE = process.env.REACT_APP_API_KEY;
const userId = localStorage.getItem("user_id");
const token = localStorage.getItem("token");

const DetailContribution = () => {
  const [comment, setComment] = useState("");
  const [listCmt, setListCmt] = useState([]);
  const [articleId, setArticleId] = useState(6);
  const navigate = useNavigate();

  const handleSubmitComment = async (e) => {
    if (e.key === "Enter") {
      try {
        const response = await axios.post(
          `${API_BASE}/comment/create`,
          {
            articleId: articleId,
            userId: userId,
            commentContent: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 403) {
          console.log("No Permission!");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
        console.log("Create comment success!");
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
      try {
        const res = await axios.post(`${API_BASE}/comment/list`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 403) {
          console.log("No Permission!");
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
  }, []);

  //   View detail contribution and comment
  return (
    <div className="container">
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
              <th scope="row">Title of Topic</th>
              <td>Topic about evolution of AI in the world</td>
            </tr>
            <tr>
              <th scope="row">Description</th>
              <td>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dignissimos suscipit quaerat dolores omnis distinctio sint fuga.
                Voluptas, reprehenderit! Ullam nisi, maiores sunt voluptate,
                repellat tenetur corporis obcaecati et similique consequuntur
                minus error eligendi cumque ex voluptatibus adipisci, facilis
                sit provident culpa. Sequi veniam tempore sapiente perferendis
                ut, est totam dolorum voluptatibus ex enim quia commodi quam
                iste maxime quaerat quasi dolorem saepe. Consequatur itaque
                dicta commodi nemo voluptatem tempora nulla porro voluptas. Ut
                iste possimus, cumque voluptatibus nostrum, voluptates ex magni
                quos odit, eaque voluptatum et aut pariatur a nobis distinctio
                aliquam eius id corrupti veritatis temporibus ipsam dolor sit.
              </td>
            </tr>
            <tr>
              <th scope="row">Start Date</th>
              <td>02/03/2024</td>
            </tr>
            <tr>
              <th scope="row">End Date</th>
              <td>10/03/2024</td>
            </tr>
            <tr>
              <th scope="row">Requirement</th>
              <td>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
                veniam eligendi saepe, expedita, voluptates officia recusandae
                impedit eaque consequatur facilis maiores assumenda et quaerat
                earum consectetur ipsum ab reiciendis molestiae!
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
            <h4 className="fw-bold text-black ms-3">{cmt.userId}</h4>
            <p className="text-black ms-3">{cmt.commentContent}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailContribution;
