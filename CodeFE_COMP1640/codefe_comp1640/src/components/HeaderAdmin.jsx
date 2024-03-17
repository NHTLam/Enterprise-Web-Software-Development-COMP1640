import React from "react";
import { Link } from "react-router-dom";

const HeaderAdmin = () => {
  return (
    <div className="container-fluid bg-secondary">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <a
          href="/ad_home"
          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        >
          <h2>Gr-News</h2>
        </a>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to="/ad_home" className="nav-link px-2 link-dark">
              Home
            </Link>
          </li>
          <li>
            <Link to="/ad_home/account" className="nav-link px-2 link-dark">
              Account
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-link px-2 link-dark">
              Profile admin
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderAdmin;
