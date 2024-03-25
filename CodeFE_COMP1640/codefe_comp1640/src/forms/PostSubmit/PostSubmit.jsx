import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./Style.css";
import imageInput from "../../assets/add_image.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
const API_BASE = process.env.REACT_APP_API_KEY;
const userId = localStorage.getItem("user_id");
const token = localStorage.getItem("token");


const PostSubmit = (props) => {
  //decalre value
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  //State
  const [imageList, setImageList] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [departmentId, setDepartmentId] = useState(1);
  const [credentials, setCredentials] = useState({});
  const [checkBox, setCheckBox] = useState(false);
  const [disable, setDisable] = useState(true);
  const [comment, setComment] = useState("");
  const [listCmt, setListCmt] = useState([]);

  //Feedback
  const [feedback, setFeedback] = useState("");
  const [articleId, setArticleId] = useState(6);
  const [feedbackTime, setFeedbackTime] = useState(new Date());
  const [isSending, setIsSending] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);

  console.log("Cmt: " + comment);
  console.log("FB: " + feedback);
  console.log("Cmt: " + comment);
  ////

  //functions feedback
  const handleFeedback = async () => {
    try {
      console.log("đâsdsadas");
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
      console.log("Create feedback success!");
      console.log("Feedback: ", response.data);
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
    console.log("đâsdasd");
    setIsSending(false);
    setIsChanging(false);
  };

  // useEffect(() => {
  //   console.log("Feedback list updated:", feedbackList);
  // }, [feedbackList]);

  //functions
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCheckBox = () => {
    if (checkBox) {
      setCheckBox(false); // Uncheck the checkbox
      setDisable(true); // Disable the button
    } else {
      setCheckBox(true); // Check the checkbox
      setDisable(false); // Enable the button
    }
  };

  const handleSubmitComment = async (e) => {
    if (e.key === "Enter") {
      try {
        const response = await axios.post(
          `${API_BASE}/comment/create`,
          {
            articleId: 6,
            userId: userId,
            commentContent: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Create comment success!");
        console.log("ab: ", response.data);
        const newComment = [...listCmt, response.data];
        console.log("newComment: ", newComment);
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
        setListCmt(res.data);
        console.table("List of commnet:", JSON.stringify(res.data));
      } catch (err) {
        console.log("Failed to list account! " + err);
      }
    };
    listCmt();
  }, []);

  const handleClickSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    console.log(selectedFile);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `${API_BASE}/article/upload-file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await axios.post(
        `${API_BASE}/article/create`,
        {
          departmentId,
          userId,
          ...credentials,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const postData = response.data;
      if (res.status === 200) {
        console.log("Submit successful", postData);
        toast.success('Submit Success!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      } else if (res.status === 400) {
        console.log("some thing went wrong");
        toast.error('Some thing went wrong', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light"
          });
      }
      if (response.status === 200) {
        // Assuming successful upload has status 200
        console.log("File uploaded successfully!");
        toast.success('Submit Success!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
        setSelectedFile(null); // Clear file selection
      } else {
        toast.error('Some thing went wrong', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light"
          });
        console.error("Error uploading file:", response.data); // Access error details from response
      }
    } catch (error) {
      toast.error('Some thing went wrong', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light"
        });
      console.error("Error:", error);
    }
  };

  // const handleClickSubmit = async (e) => {
  //     e.preventDefault();

  //     const data = new FormData();
  //     data.append("file", file);
  //     axios.post(`${API_BASE}/article/upload-file`, data, {
  //         headers: {
  //             Authorization: `Bearer ${token}`
  //         }
  //     }).then(res => console.log(res.data))
  //     .catch(err => console.log(err))
  //     try {
  //         const response = await axios.post(
  //             `${API_BASE}/article/create`,
  //             {
  //                 departmentId,
  //                 userId,
  //                 fileData: data,
  //                 ...credentials,
  //             }, {
  //             headers: {
  //                 Authorization: `Bearer ${token}`
  //             }
  //         });
  //         const postData = response.data;
  //         if (response.status === 200) {
  //             console.log("Submit successful", postData);
  //         } else if (response.status === 400) {
  //             console.log("some thing went wrong");
  //         }
  //     } catch (err) {
  //         console.log("Error " + err);
  //     }
  // };

  // const handleChange = (e) => {
  //     setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  // };

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

  return (
    <>
      <div className="mt-5 mb-5 max-width m-auto">
        <form>
          <div className="bg-light">
            <div className="mb-3 mt-5">
              <input
                className="form-control"
                type="file"
                id="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
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

          {/* Comment */}
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

          {/* Feedback */}
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

          <div className="input-group mt-3">
            <span className="input-group-text">With textarea</span>
            <textarea
              className="form-control"
              aria-label="With textarea"
              id="content"
              onChange={handleChange}
            ></textarea>
          </div>

          <div class="form-check mt-2">
            <input
              class="form-check-input"
              type="checkbox"
              value={checkBox}
              id="flexCheckDefault"
              onClick={handleCheckBox}
            />
            <div className="d-flex">
              <label class="form-check-label fw-bold" for="flexCheckDefault">
                Accepts
              </label>
              <p className="form-check-label fw-bold ms-1">
                <a
                  className="text-primary link-opacity-50-hover"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#termModal"
                >
                  Terms of service
                </a>
              </p>
            </div>
          </div>

          <button
            disabled={disable}
            type="submit"
            className="btn btn-secondary float-end mt-3"
            onClick={handleClickSubmit}
          >
            Submit
          </button>
        </form>
      </div>

      {/* Modal popup */}
      <form>
        <div
          className="modal fade"
          id="termModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Terms of Service
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <p className="fw-bold">
                    Welcome to our platform for submitting assignments. Before
                    you proceed to submit any work, please read the following
                    terms carefully. By submitting your work, you agree to abide
                    by these terms:
                  </p>
                </div>

                <ol>
                  <li>
                    <h5>Original Work:</h5>
                    <ul>
                      <li>
                        + All submitted work must be original and created solely
                        by you.
                      </li>
                      <li>
                        + Any plagiarism or unauthorized use of third-party
                        content will result in immediate disqualification.
                      </li>
                    </ul>
                  </li>

                  <li>
                    <h5>Submission Guidelines:</h5>
                    <ul>
                      <li>
                        + Follow the submission guidelines provided by your
                        instructor or the institution.
                      </li>
                      <li>
                        + Ensure that your submission meets the required format,
                        file type, and any other specifications mentioned.
                      </li>
                    </ul>
                  </li>

                  <li>
                    <h5>Timely Submission:</h5>
                    <ul>
                      <li>
                        + Submit your assignments before the specified deadline.
                      </li>
                      <li>
                        + Late submissions may incur penalties or may not be
                        accepted at all, depending on the discretion of the
                        instructor.
                      </li>
                    </ul>
                  </li>

                  <li>
                    <h5>Privacy:</h5>
                    <ul>
                      <li>
                        + Your privacy is important to us. Any personal
                        information collected during the submission process will
                        be handled in accordance with our privacy policy.
                      </li>
                    </ul>
                  </li>
                </ol>

                <div className="form-group">
                  <p>
                    By submitting your work, you acknowledge that you have read,
                    understood, and agreed to abide by these Terms of Service.
                    If you do not agree with any part of these terms, please
                    refrain from submitting your work.
                  </p>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
PostSubmit.protoTypes = {
  onFileChange: PropTypes.func,
};

export default PostSubmit;
