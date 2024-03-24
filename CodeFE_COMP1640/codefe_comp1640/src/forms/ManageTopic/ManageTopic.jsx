import React from 'react';
import './Style.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const API_BASE = process.env.REACT_APP_API_KEY;
const topicId = 6;
function ManageTopic() {
  const [topicData, setTopicData] = useState([]);
  useEffect(() => {
    axios.get(``)
      .then(data => {
        setTopicData(data.data);
      })
      .catch(err => console.log(err))
  })
  return (
    <div className="topic_table">
      <table className="table align-middle mb-0 bg-white table-bordered mt-5">
        <thead className="bg-light text-align-center">
          <tr>
            <th>No</th>
            <th>Topic Title</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td className='topic_tile'>
              <div className="d-flex align-items-center">
                IT
              </div>
            </td>
            <td className='topic_startdate'>
              22/22/2022
            </td>
            <td className='topic_enddate'>
              24/22/2022
            </td>
            <td className='topic_description'>
              description
            </td>

            <td>
              <p className="top_status">Approved</p>
            </td>

            <td className='topic_action'>
              <button type="button" className="btn btn-success btn-sm btn-rounded">
                Public
              </button>
              <button type="button" className="btn btn-danger btn-sm btn-rounded">
                <Link to={`contribute/view/edit/${topicId}`}> View</Link>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="btn btn-success m-2">
        Add new request Topic
      </div>
    </div>
  )
}

export default ManageTopic