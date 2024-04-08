import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./Style.css";
import imageInput from "../../assets/add_image.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Loader from "../../components/Loader"
import * as Toast from "../../components/Toast";
const API_BASE = process.env.REACT_APP_API_KEY;

const PostSubmit = (props) => {
  const { topicId } = useParams()
  //decalre value
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  //State
  const [imageList, setImageList] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [departmentId, setDepartmentId] = useState();
  const [credentials, setCredentials] = useState({});
  const [checkBox, setCheckBox] = useState(false);
  const [disable, setDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  //functions
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API_BASE}/article/get/${topicId}`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
        Authorization: `Bearer ${token}`

      }, staleTime: 0
    })
      .then(data => {
        setDepartmentId(data.data.data.departmentId)
        // console.log(data.data)
      })
      .catch(err => console.log(err))
  }, [topicId])

  const handleCheckBox = () => {
    if (checkBox) {
      setCheckBox(false); // Uncheck the checkbox
      setDisable(true); // Disable the button
    } else {
      setCheckBox(true); // Check the checkbox
      setDisable(false); // Enable the button
    }
  };

  const handleClickSubmit = async (event) => {
  event.preventDefault();
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  if (selectedFile.length === 0) {
    alert("Please select at least one file to upload.");
    return;
  }
  const formData = new FormData();
  for (let i = 0; i < selectedFile.length; i++) {
    formData.append("files", selectedFile[i]);
  }
  try {
    setIsLoading(true);
    const res = await axios.post(
      `${API_BASE}/article/create`,
      {
        departmentId,
        topicId: +topicId,
        userId: +userId,
        ...credentials,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      const articleId = res.data.data.articleId;
      formData.append("articleId", articleId);
      await axios.post(
        `${API_BASE}/article/upload-file?articleId=${articleId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Toast.toastSuccess("Submit success");
      setIsLoading(false);
      setTimeout(() => {
        navigate(`/contribute/view/edit/${articleId}`);
      }, 3000);
    } else if (res.status === 403) {
      console.log("No Permission!");
      Toast.toastErorr("You do not have permission to perform this action");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else if (res.status === 400) {
      Toast.toastErorr("Submit failed");
    }
  } catch (error) {
    Toast.toastErorr("Submit Error");
    setIsLoading(false);
    console.error("Error:", error);
  }
};
  // function onFileInput(e) {
  //   const files = e.target.files;
  //   if (files.length === 0) return;
  //   for (let i = 0; i < files.length; i++) {
  //     // if (files[i].type.split('/')[0] !== 'images') continue;
  //     if (!imageList.some((e) => e.name === files[i].name)) {
  //       setImageList((preImages) => [
  //         ...preImages,
  //         {
  //           name: files[i].name,
  //           url: URL.createObjectURL(files[i]),
  //         },
  //       ]);
  //     }
  //   }
  // }

  // const fileRemove = (file) => {
  //   const updatedList = [...imageList];
  //   updatedList.splice(imageList.indexOf(file), 1);
  //   setImageList(updatedList);
  //   props.onFileChange(updatedList);
  // };

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
                multiple
                onChange={(e) => setSelectedFile(e.target.files)}
              />
            </div>
          </div>
          {/* <div className="drop_card form-control">
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
          </div> */}
          <div className="input-group mt-3">
            <span className="input-group-text">Note</span>
            <textarea
              className="form-control"
              aria-label="Note"
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
                  href="!#"
                >
                  Terms of service
                </a>
              </p>
            </div>
          </div>

          {isLoading ?
            <div className="div w-100 text-blue float-end">
              {Loader.RotatingLoad()}
            </div>
            :
            <button
              disabled={disable}
              type="submit"
              onClick={handleClickSubmit}
              className="btn btn-secondary float-end"
            >
              Submit
            </button>}
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
