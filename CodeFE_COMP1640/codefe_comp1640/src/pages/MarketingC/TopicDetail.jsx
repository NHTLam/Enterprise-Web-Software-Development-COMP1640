
import PostInfor from "../../forms/PostInfor/PostInfor"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link} from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_KEY;

function TopicDetail({ dataTopic, sendDataToParent }) {
  const [data, setData] = useState([]);
  const [finalData, setfinalData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API_BASE}/article/GetAllArticle`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
        Authorization: `Bearer ${token}`
      }
    }).then(data => {
      setData(data.data.data)
    })
      .catch(err => console.log(err))
  }, [])
  useEffect(() => {
    if (Array.isArray(data)) {
    setfinalData(data.filter(data => data.topicId === dataTopic.articleId))
  }
  }, [dataTopic])
  const sendDataToParentOnChange = () => {
    sendDataToParentOnChange(finalData);
  };
  // useEffect(() => {
  //   const getFeedback = async () => {
  //     const token = localStorage.getItem("token");
  //     const res = await axios.get(
  //       `${API_BASE}/feedback/getbyarticleID?articleId=${dataTopic?.articleId}`,
  //       {
  //         headers: {
  //           "ngrok-skip-browser-warning": "true",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //   console.log("feedbacks",res)
  //   };
  //   getFeedback();
  // }, [dataTopic.articleId]);
  

  return (
    <div>
      <form>
        <div
          className="modal fade"
          id="topicDetail"
          aria-labelledby="exampleModalLabel"
          aria-hidden="false"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Topic Detail
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <PostInfor dataTopic={dataTopic} />
                {
                  finalData.map((item,index)=>{
                    return(
                      <Link to={`/contribute/view/${item.articleId}`}>
                        
                            <div className="mb-3 w-100" onChange={sendDataToParentOnChange}  data-bs-dismiss="modal" >
                                <div class="card w-100">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <img src="https://www.analyticsinsight.net/wp-content/uploads/2021/07/Technology-Can-Boost-Your-Business-Productivity.jpg" class="img-fluid rounded-start" alt="..." />
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                              <div className="card-title d-flex justify-content-between align-items-center">
                                              <p class="card-text">{item.content}</p>
                                              {item.isApproved === false ? <></>: <div className="btn btn-success">Checked</div>}
                                              </div>
                                                <p class="card-text"><small class="btn btn-info">See more</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                  })
                }
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
            </div >
          </div >
        </div >
      </form >
    </div>
  )
}

export default TopicDetail