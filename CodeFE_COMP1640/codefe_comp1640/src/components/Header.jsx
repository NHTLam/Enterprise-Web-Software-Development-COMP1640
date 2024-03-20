import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const Header = () => {
  const [islogin, setIsLogin] = useState(Boolean);

  const token = localStorage.getItem("token");
  setTimeout(() => {
    if (token != null) setIsLogin(true);
  }, 1000);

  console.log(islogin);
  console.log("token got: ", token);

  const handleClickLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsLogin(false);
  };
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
                      <Link to="/me">Profile</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>Post History</Dropdown.Item>
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
