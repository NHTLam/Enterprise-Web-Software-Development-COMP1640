import React from "react";
import { Link } from "react-router-dom";
import "./style1.css";
import "./script.js";
const Sidebar = () => {
  return (
    <ul className="sidebar-nav w-100">
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
      <li className="sidebar-item w-100">
        <div className="dropdown">

          <a className="sidebar-link d-flex" href="!#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-card-text"></i>
            <p className="mt-1">Marketing Condinator</p>
          </a>
          <ul className="dropdown-menu w-100 " aria-labelledby="dropdownMenuLink">
            <Link to="/mk-manage-topic" className="sidebar-link d-flex">
              <li><a className="" href="!#">Manage Topic</a></li>
            </Link>
            <Link to="/mk-manage-topic" className="sidebar-link d-flex">
              <li><a className="" href="!#">View Contribution</a></li>
            </Link>
          </ul>
        </div>
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
