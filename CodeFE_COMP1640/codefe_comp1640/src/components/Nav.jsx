import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style1.css";
import "./script.js";

const Nav = () => {
  const navigate = useNavigate();
  const handleClickLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand px-4 py-3">
      <form action="#" className="d-none d-sm-inline-block"></form>
      <div className="navbar-collapse collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item dropdown">
            <Link
              href="#"
              data-bs-toggle="dropdown"
              className="nav-icon pe-md-0"
            >
              <i class="bi bi-person-circle" style={{ fontSize: "30px" }}></i>
            </Link>
            <div className="dropdown-menu dropdown-menu-end rounded">
              <Link to="/" className="dropdown-item">
                Home
              </Link>
              <button onClick={handleClickLogOut} className="dropdown-item">
                Logout
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
