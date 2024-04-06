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
  const [userData, setUserData] = useState();

  const pathsFunctionAdmin = [
    '/dashboard/get-data',
    '/app-user/list',
    '/feedback/create',
    '/role/list-role',
    '/log/list',
    '/bad-word/list'
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

          if (response.data !== undefined && response.data !== "undefined") {

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
  }, [])

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    if (userId !== "undefined" && userId !== null && userId !== undefined) {
      const token = localStorage.getItem("token");
      const getAccount = async () => {
        const response = await axios.post(`${API_BASE}/app-user/get`, { userId: userId }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
      }
      getAccount();
    }
  }, [userId]);
  const AllowAccessAdminPage = listPath.some(x => pathsFunctionAdmin.includes(x))
  var ValidAccessUrl = listPath.filter(x => pathsFunctionAdmin.includes(x))[0]
  if (ValidAccessUrl === '/dashboard/get-data') {
    ValidAccessUrl = "/ad_manage"
  }
  else if (ValidAccessUrl === '/app-user/list') {
    ValidAccessUrl = "/ad_manage/account"
  }
  else if (ValidAccessUrl === "/feedback/create") {
    ValidAccessUrl = "/mk-manage-topic"
  }
  else if (ValidAccessUrl === "/role/list-role") {
    ValidAccessUrl = "/manager_role"
  }
  else if (ValidAccessUrl === "/log/list"){
    ValidAccessUrl = "/check_log"
  }
  else if (ValidAccessUrl == "/bad-word/list"){
    ValidAccessUrl = "/manage_bad_word"
  }


  return (
    <div className="position-fixed top-0 start-0 end-0 z-3">
      <nav className="navbar navbar-expand-lg navbar-light bg-light-subtle">
        <div className="container-xl">
          <Link to="/" className="navbar-brand">
            Gr-News
          </Link>
          <div className="d-flex">
            {islogin ? (
              <div className=" " to="/login">
                <Dropdown>
                  <Dropdown.Toggle
                    // style={{width: "100px"}}
                    className="d-flex btn btn-primary justify-content-center align-items-center w-auto"
                    id="dropdown-basic"
                  >
                  {userData ? <div>{userData.username}</div> : <div>Loading...</div>}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link to="/me">
                        <div>Profile</div>
                      </Link>
                    </Dropdown.Item>
                    {AllowAccessAdminPage ? (
                      <Dropdown.Item>
                        <Link to={{ pathname: `${ValidAccessUrl}` }}>Admin Home</Link>
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
