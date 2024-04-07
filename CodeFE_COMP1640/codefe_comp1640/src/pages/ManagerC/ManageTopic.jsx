import React from "react";
import "./Style.css";
import axios from "axios";
import { useState, useEffect } from "react";
import ModelEdit from "../../forms/ModelEdit/ModelEdit";
import * as Toast from "../../components/Toast";
const API_BASE = process.env.REACT_APP_API_KEY;
function ManageTopic() {
  const [topicData, setTopicData] = useState([]);
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);
  const [listPath, setListPath] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
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

    if (userId !== undefined && userId !== "undefined"){     
      const getListPath = async () => {
        const response2 = await axios.post(`${API_BASE}/permission/list-path`, 
        {
          userId: userId
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setListPath(response2.data);
      }
      getListPath();
    }
  }, [])

  useEffect(() => {
    setTopicData(data.filter(data => data.isTopic === true))
  }, [data])

  const handleApproveTopic = (item) => {
      const token = localStorage.getItem("token");
      axios.put(`${API_BASE}/article/Approved`,{
        articleId: item.articleId,
      } ,{
        headers: {
          'ngrok-skip-browser-warning': 'true',
          Authorization: `Bearer ${token}`
        }
      }).then(data => {
        Toast.toastSuccess("apprvoed successfully")
        setTimeout(()=>{
          window.location.reload()
        },3000)
      }).catch(err =>{
        Toast.toastErorr("Approve Failed")
      })
   }
   const handleApproved = () =>{
    Toast.toastInfo("Topic Allready Approved")
   }
  return (
    <div className="container">
      <h1>Manager Check Topic</h1>
      <table className="table align-middle mb-0 bg-white table-bordered mt-5">
        <thead className="bg-light text-align-center">
          <tr>
            <th>No</th>
            <th>Topic Title</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Condinator</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {
            [...topicData].reverse()?.map((item, index) => {
              return (
                <tr>
                  <td key={index}>{index + 1}</td>
                  <td className="topic_tile">
                    <div className="d-flex align-items-center">{item.title}</div>
                  </td>
                  <td className="topic_startdate">{item.startDate}</td>
                  <td className="topic_enddate">{item.endDate}</td>
                  <td className="topic_description">{item.userId}</td>
                  <td className="topic_description">{item.departmentId}</td>
                  {item.isApproved === true ? <td> <p className="top_status btn btn-success">Approved</p></td> : <td> <p className="top_status btn btn-warning">Pendding</p></td>}
                  <td className="topic_action d-flex">
                    {listPath.includes('/feedback/create') && listPath.includes('/dashboard/get-data') ? ( 
                    <div
                    >
                      {item.isApproved === true ? <button className="btn btn-light" onClick={handleApproved}>Approved</button>: <button type="button"
                      className="btn btn-success btn-sm btn-rounded"
                      onClick={() =>handleApproveTopic(item)}>Approve</button> }
                    </div>
                    ) : (
                      <></>
                    )}
                  
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#editTopic"
                      className="btn btn-danger-soft btn-sm btn-rounded ms-2"
                      onClick={()=>setDataEdit(item)}
                    >
                      {" "}
                      View
                    </button>
                  </td>

                </tr>
              )
            })
          }

        </tbody>
      </table>
      <ModelEdit dataEdit={dataEdit}/>
    </div>
  );
}
export default ManageTopic;
