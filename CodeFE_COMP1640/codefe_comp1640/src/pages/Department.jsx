import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Contribution from '../forms/Contribution/Contribution';
const API_BASE = process.env.REACT_APP_API_KEY;

function Department() {
  const {departmentId} = useParams();
  const [data, setData] = useState([]);
  const [isTopic, setIsTopic] = useState([]);
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
}, [])

  useEffect(()=>{    
  if (Array.isArray(data)) {
    setIsTopic(data.filter(data => data.isTopic === true));
  }
  },[data])
  return (
    <div>
      <Contribution currentItems={isTopic} link={`/topic/view`}/>
    </div>
  )
}

export default Department