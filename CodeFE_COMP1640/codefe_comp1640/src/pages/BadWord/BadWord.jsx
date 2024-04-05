import React from "react";
import "./Style.css";
import axios from "axios";
import { useState, useEffect } from "react";
import ModelEdit from "../../forms/ModelEdit/ModelEdit";

import * as Toast from "../../components/Toast";
const API_BASE = process.env.REACT_APP_API_KEY;
function BadWord() {
  const [topicData, setTopicData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    
  }, [])

  return (
    <div className="container">
      <h1>Manager Bad Word</h1>
      <table className="table align-middle mb-0 bg-white table-bordered mt-5">
        <thead className="bg-light text-align-center">
          <tr>
            <th>No</th>
            <th>Word</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {
            topicData?.map((item, index) => {
              return (
                <tr>
                  <td key={index}>{index + 1}</td>
                  <td className="topic_tile">
                    <div className="d-flex align-items-center">{item.name}</div>
                  </td>
                  <td className="topic_action">
                    <button
                      type="button"
                      className="btn btn-success btn-sm btn-rounded"
                      // onClick={() =>handleApproveTopic(item)}
                    >
                      Edit
                    </button>
                  
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#editTopic"
                      className="btn btn-danger-soft btn-sm btn-rounded ms-2"
                      // onClick={()=>setDataEdit(item)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              )
            })
          }

        </tbody>
      </table>
      {/* <ModelEdit dataEdit={dataEdit}/> */}
    </div>
  );
}
export default BadWord;
