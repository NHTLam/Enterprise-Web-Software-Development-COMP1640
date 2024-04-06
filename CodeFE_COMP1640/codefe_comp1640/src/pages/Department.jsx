import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Contribution from '../forms/Contribution/Contribution';
import * as Departments from "../data/department"
const API_BASE = process.env.REACT_APP_API_KEY;

function Department() {
  const {departmentId} = useParams();
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

  useEffect(()=>{    
  if (Array.isArray(data)) {
    setIsTopic(data.filter(data => data.isTopic === true && data.isApproved === true));
  }
  },[data])

  useEffect(()=>{
    setDepartmentGet(departmentData?.filter(item => item?.id === +departmentId))
  },[])

  return (
    <div>
      {
        departmentGet?.map((item,index)=>{
          return(
            <h1 className='text-black fw-bolder'>{item?.name}</h1>
          )
        })
      }
      <Contribution currentItems={isTopic.reverse()} link={`/topic/view`}/>
    </div>
  )
}

export default Department