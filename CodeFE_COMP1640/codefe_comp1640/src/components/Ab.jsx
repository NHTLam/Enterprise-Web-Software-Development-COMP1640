import React from "react";
import { Link } from "react-router-dom";
import "./style1.css";
import "./script.js";
const Sidebar = () => {
  return (
    <ul className="sidebar-nav">
      <li className="sidebar-item">
        <Link to="/ad_manage" className="sidebar-link d-flex">
          <i className="bi bi-bar-chart-fill"></i>
          <p className="mt-1">Dashboard</p>
        </Link>
      </li>
      <li className="sidebar-item">
        <Link to="/ad_manage/account" className="sidebar-link d-flex">
          <i className="bi bi-person"></i>
          <p className="mt-1">Manage Account</p>
        </Link>
      </li>
      <li className="sidebar-item">
        <Link to="/mk_manage_topic" className="sidebar-link d-flex">
          <i className="bi bi-card-text"></i>
          <p className="mt-1">Manager Topic</p>
        </Link>
      </li>
      <li className="sidebar-item">
        <Link to="/manager_role" className="sidebar-link d-flex">
          <i className="bi bi-person-lines-fill"></i>
          <p className="mt-1">Manager Role</p>
        </Link>
      </li>
    </ul>
  );
};

export default Sidebar;
