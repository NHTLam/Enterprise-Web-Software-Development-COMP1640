import React from "react";
import "./Style.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModelEdit from "../../forms/ModelEdit/ModelEdit";

import * as Toast from "../../components/Toast";
const API_BASE = process.env.REACT_APP_API_KEY;
function BadWord() {
  const navigate = useNavigate();
  const [datas, setData] = useState([]);
  const [name, setName] = useState("");
  const [updateItem, setUpdateItem] = useState({});

  const handleAddBadWord = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE}/bad-word/create`,
        {
          name
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Create Role success!");
      Toast.toastSuccess(`Create Successfully`)
      window.location.reload()
    } catch (err) {
      console.log("Create Role failed!");
      Toast.toastErorr("You do not have permission to perform this action");
      setTimeout(()=>{
        navigate("/");
      },1000) 
    }
  };

  const handleUpdateBadWord = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE}/bad-word/update`,
        {
          badWordId: updateItem.badWordId,
          name: name
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Update Role success!");
      Toast.toastSuccess(`Update Successfully`)
      window.location.reload()
    } catch (err) {
      console.log("Update Role failed!");
      Toast.toastErorr("You do not have permission to perform this action");
      setTimeout(()=>{
        navigate("/");
      },1000) 
    }
  };

  const handleDelete = async (item) => {
    try{
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_BASE}/bad-word/delete`,{
        badWordId: item.badWordId,
      } ,{
        headers: {
          'ngrok-skip-browser-warning': 'true',
          Authorization: `Bearer ${token}`
        }
      })
      Toast.toastSuccess(`Delete ${item.title} Successfully`)
      window.location.reload()
    }
    catch(err){
      Toast.toastErorr("Delete Failed")
    }
  }


  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.post(`${API_BASE}/bad-word/list`, null, {
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
      <h1>Manager Bad Word</h1>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#createBadWord"
        >
          Add Word
        </button>
      </div>
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
            datas?.map((item, index) => {
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
                      data-bs-toggle="modal"
                      data-bs-target="#UpdateWord"
                      onClick={() =>setUpdateItem(item)}
                    >
                      Edit
                    </button>
                  
                    <button
                      type="button"
                      className="btn btn-danger-soft btn-sm btn-rounded ms-2"
                      onClick={() =>handleDelete}
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

      {/* Create popup */}
      <form>
        <div
          className="modal fade"
          id="createBadWord"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Word
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* <!-- Form to input user details --> */}
                <div className="mb-3">
                  <label for="name" className="form-label">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handleAddBadWord}
                >
                  Add Word
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Update popup */}  
      <form>
        <div
          className="modal fade"
          id="UpdateWord"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Update Word
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* <!-- Form to input user details --> */}
                <div className="mb-3">
                  <label for="name" className="form-label">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder={updateItem.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handleUpdateBadWord}
                >
                  Update Word
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default BadWord;
