import React from "react";
import { Link } from "react-router-dom";
import "./style1.css";
import "./script.js";
import { useState, useEffect } from "react";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_KEY;

const Sidebar = () => {
  const [listPath, setListPath] = useState([]);
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    if (userId !== undefined && userId !== "undefined") {
      const getListPath = async () => {
        const response2 = await axios.post(
          `${API_BASE}/permission/list-path`,
          {
            userId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setListPath(response2.data);
      };
      getListPath();
    }
  }, []);

  return (
    <ul className="sidebar-nav w-100">
      <li className="sidebar-item">
        {listPath.includes("/dashboard/get-data") ? (
          <Link to="/ad_manage" className="sidebar-link d-flex">
            <i className="bi bi-bar-chart-fill"></i>
            <p className="mt-1">Dashboard</p>
          </Link>
        ) : (
          <></>
        )}
      </li>
      <li className="sidebar-item">
        {listPath.includes("/app-user/list") ? (
          <Link to="/ad_manage/account" className="sidebar-link d-flex">
            <i className="bi bi-person"></i>
            <p className="mt-1">Manage Account</p>
          </Link>
        ) : (
          <></>
        )}
      </li>
      <li className="sidebar-item w-100">
        {listPath.includes("/feedback/create") ? (
          <div className="dropdown">
            <a
              className="sidebar-link d-flex"
              href="!#"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-card-text"></i>
              <p className="mt-1">Marketing Condinator</p>
            </a>
            <ul
              className="dropdown-menu w-100 "
              aria-labelledby="dropdownMenuLink"
            >
              {listPath.includes("/dashboard/get-data") ? (
                <Link to="/mk-manage-topic" className="sidebar-link d-flex">
                  <li>
                    <a className="" href="!#">
                      Manage Topic
                    </a>
                  </li>
                </Link>
              ) : (
                <></>
              )}
              <Link
                to="/mk-manage-topic/create"
                className="sidebar-link d-flex"
              >
                <li>
                  <a className="" href="!#">
                    Request New Topic
                  </a>
                </li>
              </Link>

            </ul>
          </div>
        ) : (
          <></>
        )}
      </li>
      <li className="sidebar-item">
        {listPath.includes("/role/list-role") ? (
          <Link to="/manager_role" className="sidebar-link d-flex">
            <i className="bi bi-person-lines-fill"></i>
            <p className="mt-1">Manage Role</p>
          </Link>
        ) : (
          <></>
        )}
      </li>
      <li className="sidebar-item">
        {listPath.includes("/feedback/create") &&
          listPath.includes("/dashboard/get-data") ? (
          <Link to="/manager_manage" className="sidebar-link d-flex">
            <i className="bi bi-person"></i>
            <p className="mt-1">Manage Check Topic</p>
          </Link>
        ) : (
          <></>
        )}
      </li>
      <li className="sidebar-item">
        {listPath.includes("/log/list") ? (
          <Link to="/check_log" className="sidebar-link d-flex">
            <i className="bi bi-person"></i>
            <p className="mt-1">Manage Log</p>
          </Link>
        ) : (
          <></>
        )}
      </li>
      <li className="sidebar-item">
        {listPath.includes("/bad-word/list") ? (
          <Link to="/manage_bad_word" className="sidebar-link d-flex">
            <i className="bi bi-person"></i>
            <p className="mt-1">Manage Bad Word</p>
          </Link>
        ) : (
          <></>
        )}
      </li>
    </ul>
  );
};

export default Sidebar;
