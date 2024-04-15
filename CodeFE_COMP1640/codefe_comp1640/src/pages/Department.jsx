import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Contribution from '../forms/Contribution/Contribution';
import Pagination from '../components/Pagination';
import * as Departments from "../data/department"
const API_BASE = process.env.REACT_APP_API_KEY;

function Department() {
  const { departmentId } = useParams();
  const [data, setData] = useState([]);
  const [isTopic, setIsTopic] = useState([]);
  const [departmentGet, setDepartmentGet] = useState();
  const [departmentData, setDepartmentData] = useState(Departments.DepartmentData());

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API_BASE}/article/get-by-department/${departmentId}`, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
        Authorization: `Bearer ${token}`
      }
    }).then(data => {
      setData(data.data.data)
    })
      .catch(err => console.log(err))
  }, [departmentId])

  useEffect(() => {
    if (Array.isArray(data)) {
      setIsTopic(data.filter(data => data.isTopic === true && data.isApproved === true));
    }
  }, [data])
  console.log("is topic", isTopic)
  useEffect(() => {
    setDepartmentGet(departmentData?.filter(item => item?.id === +departmentId))
  }, [])

  return (
    <div>
      {
        departmentGet?.map((item, index) => {
          return (
            <div className="d-flex">
              <h1 className='text-black fw-bolder w-50 me-5'>{item?.name}</h1>
              <form className="d-flex ms-5 w-50">
                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-secondary border border-primary" type="submit">Search</button>
              </form>
            </div>
          )
        })
      }
      <div className="d-flex flex-wrap justify-content-center align-content-center mb-5">
        {isTopic.length <= 0 ? <h1 className='fw-bold mt-5'>Finding data ...</h1> :
          <Pagination itemsPerPage={5} dataContributions={[...isTopic].reverse()} link={`/topic/view`} />
        }
      </div>
      {/* <Contribution currentItems={} link={`/topic/view`}/> */}
    </div>
  )
}

export default Department