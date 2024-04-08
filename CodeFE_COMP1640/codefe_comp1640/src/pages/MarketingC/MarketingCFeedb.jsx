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
  const [oldFeedback, setOldFeedback] = useState("");
  const [userName, setUserName] = useState("");

  const [file, setFile] = useState();
  const [viewFeedback, setViewFeedback] = useState([]);
  const [postData, setPostData] = useState();
  const [userData, setUserData] = useState();

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
        axios
          .post(
            `${API_BASE}/app-user/get`,
            { userId: data.data.data?.userId },
            {
              headers: {
                "ngrok-skip-browser-warning": "true",
                Authorization: `Bearer ${token}`,
              },
              staleTime: 0,
            }
          )
          .then((data) => {
            setUserData(data.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [id]);
  console.log("user: ", userData);

  useEffect(() => {
    const token = localStorage.getItem("token");
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
      setOldFeedback(res.data[0]?.feedbackContent);
      setFeedbackId(res.data[0]?.feedbackId);
      setUserName(res.data[0]?.username);
      setShowButtonSave(res.data.length > 0);
    };
    getFeedback();
  }, [articleId]);
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
  const handleDownloadAllFiles = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${API_BASE}/article/GetFile?articleId=${articleId}`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // Yêu cầu dữ liệu trả về là kiểu Blob
        }
      );

      const fileBlob = response.data; // Blob chứa tất cả các tệp

      // Tạo một URL tạm thời cho Blob để tạo liên kết tải xuống
      const fileUrl = URL.createObjectURL(fileBlob);

      // Tạo một liên kết tạm thời để tải xuống tất cả các tệp
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", "all_files.zip");
      document.body.appendChild(link);
      link.click();

      // Sau khi người dùng nhấp vào liên kết, loại bỏ liên kết tạm thời khỏi DOM
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleDownloadFile = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${API_BASE}/article/GetFile?articleId=${articleId}`,
        null,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const disposition = response.headers["content-disposition"];
      const matches = /filename="([^"]+)"/.exec(disposition);
      const fileName =
        matches != null && matches.length > 1 ? matches[1] : "file.zip";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  if (!postData) {
    return <></>;
  }

  return (
    <div>
      {/* <PostInfor dataTopic={postData} /> */}
      {/* <>
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
      </> */}
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
                <th scope="row">Username</th>
                <td>{userName}</td>
              </tr>
              <tr>
                <th scope="row">Contributer</th>
                <td>{userData?.username}</td>
              </tr>
              <tr>
                <th scope="row">Contribution</th>
                <div className="file-list">
                  {file?.map((item, index) => (
                    <div key={index} className="file-item">
                      <span>{item.fileName}</span>
                      {/* <button
                        className="btn btn-secondary ms-2"
                        onClick={() => handleDownloadFile(item.id)}
                      >
                        Tải xuống
                      </button> */}
                    </div>
                  ))}
                </div>
                <div>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={handleDownloadAllFiles}
                  >
                    Download
                  </button>
                </div>
              </tr>
              <tr>
                <th scope="row">Article Content</th>
                <td>{postData?.content}</td>
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
                    placeholder={oldFeedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    disabled={isSending}
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
          <div className="d-flex mb-2">
            <div className="button1">
              <button
                className="btn btn-group btn-outline-danger mr-2 ms-2"
                data-bs-toggle="modal"
                data-bs-target="#updateFeedback"
                onClick={() => {
                  setFeedbackId(feedbackId);
                  setUpdateFeedback(feedback);
                }}
              >
                Edit feedback
              </button>
            </div>
            <div className="button2">
              {postData?.isApproved === true ? (
                <></>
              ) : (
                <button
                  className="btn btn-success mr-2 ms-2"
                  onClick={handlePublicContribution}
                >
                  Public
                </button>
              )}
            </div>
          </div>
        </div>
        {/* <div className="container">
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
                  <td>{feedback.username}</td>
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
                        // setFeedback(feedback.feedbackContent);
                        setUpdateFeedback(feedback.feedbackContent);
                      }}
                    >
                      Edit feedback
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
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
                  placeholder={oldFeedback}
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
