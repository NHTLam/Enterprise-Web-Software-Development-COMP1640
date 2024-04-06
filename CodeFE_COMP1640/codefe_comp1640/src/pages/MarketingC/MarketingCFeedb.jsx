import PostInfor from "../../forms/PostInfor/PostInfor";
import { useState, useEffect, useRef } from "react";
import imageInput from "../../assets/add_image.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import * as Toast from "../../components/Toast";
const API_BASE = process.env.REACT_APP_API_KEY || "";
const userId = localStorage.getItem("user_id");

const token = localStorage.getItem("token");

function MarketingCFeedb(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [updateFeedback, setUpdateFeedback] = useState("");
  const [feedbackId, setFeedbackId] = useState(0);
  const [articleId, setArticleId] = useState(id);
  const [feedbackTime, setFeedbackTime] = useState(new Date());
  const [isSending, setIsSending] = useState(false);
  const [showButtonSave, setShowButtonSave] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);
  const onFileChange = (files) => {
    console.log(files);
  };
  const [file, setFile] = useState();
  const [viewFeedback, setViewFeedback] = useState([]);
  // const onFileChange = (files) => {
  //   console.log(files);
  // };
  // const [imageList, setImageList] = useState([]);
  // const fileInputRef = useRef(null);
  // const [postData, setPostData] = useState();
  // useEffect(() => {
  //   console.log("id", id);
  //   axios
  //     .get(`${API_BASE}/article/get/${id}`, {
  //       headers: {
  //         "ngrok-skip-browser-warning": "true",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       staleTime: 0,
  //     })
  //     .then((data) => {
  //       setPostData(data.data.data);
  //     })
  //     .catch((err) => console.log(err));
  // });
  // if (!postData) {
  //   return <></>;
  // }

  const [imageList, setImageList] = useState([]);
  const fileInputRef = useRef(null);
  const [postData, setPostData] = useState();

  //Save feedback 1 lan. edit het

  useEffect(() => {
    const getFeedback = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${API_BASE}/feedback/getbyarticleID?articleId=${articleId}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setViewFeedback(res.data);
      setShowButtonSave(res.data.length > 0);
    };
    getFeedback();
  }, [articleId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
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
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("id: ", id);
    axios
      .post(`${API_BASE}/article/GetUpLoadedFiles?articleId=${id}`, null, {
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
  }, [id]);
  console.log("File: ", file);
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
  async function handleFeedback() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
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
      const newFeedback = {
        userId: userId,
        articleId: articleId,
        feedbackContent: feedback,
        feedbackTime: formattedFeedbackTime,
        feedbackId: response.data.feedbackId,
      };
      setFeedbackList([...feedbackList, newFeedback]);
      setFeedbackId(newFeedback.feedbackId);
      setTimeout(() => {
        window.location.reload();
      }, 500);
      Toast.toastSuccess("Creaed feedback successfully");
      if (response.status === 403) {
        console.log("No Permission!");
        Toast.toastErorr("You do not have permission to perform this action");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      Toast.toastErorr("Create feedback failed");
    }
  }

  const handleUpdateFeedback = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    try {
      const formattedFeedbackTime = feedbackTime.toISOString();
      const update = {
        userId: userId,
        articleId: articleId,
        feedbackContent: updateFeedback,
        feedbackTime: formattedFeedbackTime,
        feedbackId: feedbackId,
      };
      const res = await axios.put(
        `${API_BASE}/feedback/update/${feedbackId}`,
        update,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedFeedbackList = feedbackList.map((item) => {
        if (item.feedbackId === feedbackId) {
          return update;
        } else {
          return item;
        }
      });
      setFeedbackList(updatedFeedbackList);
      setFeedback(updateFeedback);
      setTimeout(() => {
        window.location.reload();
      }, 500);
      Toast.toastSuccess("Update feedback successfully");
    } catch (err) {
      console.log("Error updating feedback:", err);
    }
  };

  const handlePublicContribution = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `${API_BASE}/article/Approved`,
        {
          articleId: +id,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        Toast.toastSuccess("apprvoed successfully");
        setTimeout(() => {
          navigate("/mk-manage-topic");
        }, 1000);
      }
    } catch (err) {
      Toast.toastErorr("Some thing went wrong, Approve false");
      console.log(err);
    }
  };
  const handleDownloadFile = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = axios.get(
        `${API_BASE}/article/GetFile?articleId=${id}`,
        null,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        console.log("res: ", res);
        Toast.toastSuccess("Download successfully");
      }
    } catch (err) {
      Toast.toastErorr("Some thing went wrong, Approve false");
      console.log(err);
    }
  };
  return (
    <div>
      {/* <PostInfor dataTopic={postData} /> */}
      <>
        <div>
          {file?.map((file) => {
            return <a href="!#">{file?.fileName} </a>;
          })}
        </div>
        <div className="mt-5 mb-5 max-width m-auto">
          <form>
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
                placeholder={postData.content}
              ></textarea>
            </div>
            <button
              className="btn btn-secondary float-end mt-3"
              onClick={handleDownloadFile}
            >
              Download Contribution
            </button>
            <button
              className="btn btn-success float-end mt-3"
              onClick={handlePublicContribution}
            >
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
                    disabled={isSending ? true : false}
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mb-2">
            {!showButtonSave && (
              <button
                className="btn btn-group btn-outline-primary mr-2"
                type="submit"
                onClick={handleFeedback}
              >
                Save feedback
              </button>
            )}
          </div>
        </div>

        <div className="container">
          <table className="table table-striped mt-5">
            <thead>
              <tr>
                <th>UserID</th>
                <th>ArticleID</th>
                <th>FeedbackID</th>
                <th>Context</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {viewFeedback.map((feedback) => (
                <tr key={feedback.articleId}>
                  <td>{feedback.userId}</td>
                  <td>{feedback.articleId}</td>
                  <td>{feedback.feedbackId}</td>
                  <td>{feedback.feedbackContent}</td>
                  <td>{feedback.feedbackTime.toLocaleString("vi-VN")}</td>
                  <td>
                    <button
                      className="btn btn-group btn-outline-danger mr-2 ms-2"
                      data-bs-toggle="modal"
                      data-bs-target="#updateFeedback"
                      onClick={() => {
                        setFeedbackId(feedback.feedbackId);
                        setFeedback(feedback.feedbackContent);
                      }}
                    >
                      Edit feedback
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal */}
        <div
          className="modal fade"
          id="updateFeedback"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <label htmlFor="feedback" className="form-label">
                  Feedback
                </label>
                <input
                  name="feedback"
                  type="text"
                  className="form-control"
                  id="feedback"
                  placeholder={feedback}
                  value={updateFeedback}
                  onChange={(e) => setUpdateFeedback(e.target.value)}
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleUpdateFeedback}
                >
                  Update feedback
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Modal */}
      </div>
    </div>
  );
}

export default MarketingCFeedb;
