import React from "react";
import "./Style.css";
import axios from "axios";
import { useState, useEffect } from "react";
import ModelEdit from "../../forms/ModelEdit/ModelEdit";

const API_BASE = process.env.REACT_APP_API_KEY;
function CheckLog() {
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.post(`${API_BASE}/log/list`, null, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
        Authorization: `Bearer ${token}`
      }
    }).then(data => {
      setData(data.data)
    })
      .catch(err => console.log(err))
  }, [])


  return (
    <div className="container">
      <h1>Check Log</h1>
      <table className="table align-middle mb-0 bg-white table-bordered mt-5">
        <thead className="bg-light text-align-center">
          <tr>
            <th>No</th>
            <th>Response</th>
            <th>PayLoad</th>
            <th>Status</th>
            <th>Path</th>
            <th>Method</th>
          </tr>
        </thead>
        <tbody>

          {
            data?.map((item, index) => {
              return (
                <tr>
                  <td key={index}>{index + 1}</td>
                  <td className="topic_tile">
                    <div className="mylongtext d-flex align-items-center">{item.response}</div>
                  </td>
                  <td className="topic_startdate">{item.payLoad}</td>
                  <td className="topic_enddate">{item.status}</td>
                  <td className="topic_description">{item.path}</td>
                  <td className="topic_description">{item.method}</td>
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
export default CheckLog;
