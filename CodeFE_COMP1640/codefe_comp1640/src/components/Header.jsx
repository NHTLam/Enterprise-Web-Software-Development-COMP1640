import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const API_BASE = process.env.REACT_APP_API_KEY;
const Header = () => {
  const navigate = useNavigate();
  const [islogin, setIsLogin] = useState(Boolean);
  const [userId, setUserId] = useState();
  const [listPath, setListPath] = useState([]);

  const pathsFunctionAdmin = [
    '/dashboard/get-data',
    '/app-user/list',
    '/feedback/create',
    '/role/list-role'
  ]

  setTimeout(() => {
    const token = localStorage.getItem("token");
    if (token != null) setIsLogin(true);
  }, 1);

  const handleClickLogOut = (e) => {
    e.preventDefault();
    // localStorage.clear();
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");

    setIsLogin(false);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
      if (token) {
        const token = localStorage.getItem("token");
        if (userId === undefined || userId === "undefined" || userId === null) {
          const getUserId = async () => {
            const response = await axios.post(`${API_BASE}/app-user/get-user-id`, null, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
            });
            setUserId(response.data);

            if (response.data !== undefined && response.data !== "undefined"){
              console.log("Good userId: " + response.data)
              const getListPath = async () => {
                const response2 = await axios.post(`${API_BASE}/permission/list-path`, 
                {
                  userId: response.data
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
          }
          getUserId();
        }

      }
      navigate("/");
    navigate("/");
  }, [])

  const AllowAccessAdminPage = listPath.some(x => pathsFunctionAdmin.includes(x))
  console.log("listPaths: " + listPath + "\nAllowAccessAdminPage:" + AllowAccessAdminPage)

  return (
    <div className="position-fixed top-0 start-0 end-0 z-3">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-xl">
          <Link to="/" className="navbar-brand">
            Gr-News
          </Link>
          <div className="d-flex">
            {islogin ? (
              <div className=" " to="/login">
                <Dropdown>
                  <Dropdown.Toggle
                    className="btn btn-light border border-primary me-2"
                    id="dropdown-basic"
                  ></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link to="/me">
                        <div>Profile</div>
                      </Link>
                    </Dropdown.Item>
                    {AllowAccessAdminPage ? (
                      <Dropdown.Item>
                        <Link to="/ad_manage">Admin Home</Link>
                      </Dropdown.Item>
                    ) : (
                      <></>
                    )}
                    <Dropdown.Item>
                      <Link to={"/history"}>
                        <div>Post History</div>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleClickLogOut}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <>
                <Link
                  className="btn btn-light border border-primary me-2 "
                  to="/login"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
