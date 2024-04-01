import PostInfor from "../../forms/PostInfor/PostInfor";
import { useState, useEffect, useRef } from "react";
import imageInput from "../../assets/add_image.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import * as Toast from "../../components/Toast";
const API_BASE = process.env.REACT_APP_API_KEY || "";
const token = localStorage.getItem("token");
const userId = localStorage.getItem("user_id");

// {
//   "feedbackId": 89,
//   "userId": 2,
//   "articleId": 328,
//   "feedbackContent": "1321312",
//   "feedbackTime": "2024-03-31T14:57:08.997",
//   "article": null,
//   "user": null
// },

function MarketingCFeedb(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [feedbackId, setFeedbackId] = useState(null);
  const [articleId, setArticleId] = useState(id);
  const [feedbackTime, setFeedbackTime] = useState(new Date());
  const [isSending, setIsSending] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);
  const onFileChange = (files) => {
    console.log(files);
  };
  const [imageList, setImageList] = useState([]);
  const fileInputRef = useRef(null);
  const [postData, setPostData] = useState();
  // const token = localStorage.getItem("token");
  // const userId = localStorage.getItem("user_id");
  useEffect(() => {
    console.log("id", id);
    axios
      .get(`${API_BASE}/article/get/${id}`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
        staleTime: 0,
      })
      .then((data) => {
        setPostData(data.data.data);
        // console.log(data.data)
      })
      .catch((err) => console.log(err));
  },);
  // console.log(postData);
  if (!postData) {
    return <></>;
  }

  const handleClickDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`${API_BASE}/article/delete`);
      if (response.status === 200) {
        navigate("/st_submit_post");
        console.log("delete sucess");
      } else if (response.status === 400) {
        console.log("some thing went wrong");
      } else if (response.status === 403) {
        console.log("No Permission!");
        Toast.toastErorr("You do not have permission to perform this action");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      console.log("Error " + err);
    }
  };
  function onFileInput(e) {
    const files = e.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      // if (files[i].type.split('/')[0] !== 'images') continue;
      if (!imageList.some((e) => e.name === files[i].name)) {
        setImageList((preImages) => [
          ...preImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }
  const fileRemove = (file) => {
    const updatedList = [...imageList];
    updatedList.splice(imageList.indexOf(file), 1);
    setImageList(updatedList);
    props.onFileChange(updatedList);
  };

  //Feedback
  const handleFeedback = async () => {
    setIsSending(true);
    try {
      const formattedFeedbackTime = feedbackTime.toISOString();
      const response = await axios.post(
        `${API_BASE}/feedback/create`,
        {
          userId: userId,
          articleId,
          feedbackContent: feedback,
          feedbackTime: formattedFeedbackTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 403) {
        console.log("No Permission!");
        Toast.toastErorr("You do not have permission to perform this action");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      console.log("Create feedback success!");
      console.log("Feedback: ", response.data);
      const fbId = response.data.feedbackId;
      setFeedbackId(fbId);
      const newFeedback = {
        userId: userId,
        articleId: articleId,
        feedbackContent: feedback,
        feedbackTime: formattedFeedbackTime,
      };
      setFeedbackList([...feedbackList, newFeedback]);
    } catch (err) {
      console.error("Error sending feedback:", err);
    } finally {
      setIsSending(false);
    }
  };

  const handleUpdate = async () => {
    setIsSending(false);
    setIsUpdating(true);
    try {
      const formattedFeedbackTime = feedbackTime.toISOString();
      const updateFeedback = {
        userId: userId,
        articleId: articleId,
        feedbackContent: feedback,
        feedbackTime: formattedFeedbackTime,
      };
      const res = await axios.put(
        `${API_BASE}/feedback/update/${feedbackId}`,
        updateFeedback,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedFeedbackList = feedbackList.map((item) => {
        if (item.feedbackId === feedbackId) {
          return {
            ...item,
            ...updateFeedback,
          };
        }
        return item;
      });
      setFeedbackList(updatedFeedbackList);
      console.log("Update feedback: " + res.data);
      setIsUpdating(false);
    } catch (err) {
      console.error("Error updating feedback:", err);
    }
  };

  return (
    <div>
      <PostInfor dataTopic={postData} />
      <>
        <div className="mt-5 mb-5 max-width m-auto">
          <form>
            <div className="bg-light">
              <div className="mb-3 mt-5">
                <input
                  className="form-control"
                  type="file"
                  id="formFileMultiple"
                  multiple
                />
              </div>
            </div>
            <div className="drop_card form-control">
              <div className="image_area">
                {imageList.map((item, index) => (
                  <div className="image-preview__item">
                    <span
                      className="image-preview__item__del"
                      onClick={() => fileRemove(item)}
                    >
                      &times;
                    </span>
                    <img src={item.url} alt={item.name} />
                  </div>
                ))}
                <div className="drag_area">
                  <img src={imageInput} alt="image_upload" className="img" />
                  <input
                    name="file"
                    type="file"
                    className="file_input"
                    onChange={onFileInput}
                    ref={fileInputRef}
                    multiple
                  />
                </div>
              </div>
            </div>

            <div className="input-group mt-3">
              <span className="input-group-text">Note</span>
              <textarea
                className="form-control"
                aria-label="With textarea"
                value={postData.content}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-secondary float-end mt-3">
              Download Contribution
            </button>
            <button type="submit" className="btn btn-success float-end mt-3">
              Public
            </button>
          </form>
        </div>
      </>
      <div className="form-feedback border border-2 mt-3">
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
                    disabled={isSending || isUpdating}
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mb-2">
            <button
              className="btn btn-group btn-outline-primary mr-2"
              type="submit"
              onClick={() => handleFeedback()}
            >
              Save feedback
            </button>
            <button
              className="btn btn-group btn-outline-danger mr-2 ms-2"
              type="submit"
              onClick={handleUpdate}
            >
              {/* sửa lại save chắc chắn disabled, khi ấn edit sẽ popup rồi sửa ấn update rồi */}
              Update feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketingCFeedb;
