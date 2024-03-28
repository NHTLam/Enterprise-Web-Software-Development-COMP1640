import React from "react";
import { Link } from "react-router-dom";
import "./style1.css";
import "./script.js";

const Nav = () => {
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
              <Link to="#" className="dropdown-item">
                Profile
              </Link>
              <Link to="#" className="dropdown-item">
                Settings
              </Link>
              <Link to="#" className="dropdown-item">
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
