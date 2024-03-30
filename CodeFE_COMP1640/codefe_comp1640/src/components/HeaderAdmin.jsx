import React from "react";
import { Link } from "react-router-dom";
import "./style1.css";
import "./script.js";

const HeaderAdmin = () => {
  return (
    <div className="wrapper">
      <aside id="sidebar p-0">
        <div className="d-flex">
          <button className="toggle-btn" type="button">
            <i className="lni lni-grid-alt"></i>
          </button>
          <div className="sidebar-logo">
            <Link to="/">Gr-News</Link>
          </div>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <Link to="/ad_manage" className="sidebar-link">
              <i className="bi bi-bar-chart-fill"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/ad_manage/account" className="sidebar-link">
              <i className="bi bi-person"></i>
              <span>Manage Account</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/mk-manage-topic" className="sidebar-link">
              <i className="bi bi-card-text"></i>
              <span>Manager Contribution / Topic</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/manager_role" className="sidebar-link">
              <i className="bi bi-person-lines-fill"></i>
              <span>Manager Role</span>
            </Link>
          </li>
        </ul>
      </aside>
      <div className="main">
        <nav className="navbar navbar-expand px-4 py-3">
          <form action="#" className="d-none d-sm-inline-block"></form>
          <div className="navbar-collapse collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a
                  href="#"
                  data-bs-toggle="dropdown"
                  className="nav-icon pe-md-0"
                >
                  <img
                    src="/assets/account.jpg"
                    className="avatar img-fluid"
                    alt=""
                  />
                </a>
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
        {/* <main className="content px-3 py-4">
            <div className="container-fluid">
                <div className="mb-3">
                    <h3 className="fw-bold fs-4 mb-3">Admin Dashboard</h3>
                    <div className="row">
                        <div className="col-12 col-md-4 ">
                            <div className="card border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold">
                                        Memebers Progress
                                    </h5>
                                    <p className="mb-2 fw-bold">
                                        $72,540
                                    </p>
                                    <div className="mb-0">
                                        <span className="badge text-success me-2">
                                            +9.0%
                                        </span>
                                        <span className=" fw-bold">
                                            Since Last Month
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 ">
                            <div className="card  border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold">
                                        Memebers Progress
                                    </h5>
                                    <p className="mb-2 fw-bold">
                                        $72,540
                                    </p>
                                    <div className="mb-0">
                                        <span className="badge text-success me-2">
                                            +9.0%
                                        </span>
                                        <span className="fw-bold">
                                            Since Last Month
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 ">
                            <div className="card border-0">
                                <div className="card-body py-4">
                                    <h5 className="mb-2 fw-bold">
                                        Memebers Progress
                                    </h5>
                                    <p className="mb-2 fw-bold">
                                        $72,540
                                    </p>
                                    <div className="mb-0">
                                        <span className="badge text-success me-2">
                                            +9.0%
                                        </span>
                                        <span className="fw-bold">
                                            Since Last Month
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 className="fw-bold fs-4 my-3">Avg. Agent Earnings
                    </h3>
                    <div className="row">
                        <div className="col-12">
                            <table className="table table-striped">
                                <thead>
                                    <tr className="highlight">
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td colspan="2">Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main> */}
        <footer className="footer">
          <div className="container-fluid">
            <div className="row text-body-secondary">
              <div className="col-6 text-start ">
                <Link className="text-body-secondary" to="/">
                  <strong>Gr-News</strong>
                </Link>
              </div>
              <div className="col-6 text-end text-body-secondary d-none d-md-block">
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <Link className="text-body-secondary" to="#">
                      Contact
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="text-body-secondary" to="#">
                      About Us
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link className="text-body-secondary" to="#">
                      Terms & Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>

    // <div className="container-fluid bg-secondary">
    //   <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
    //     <a
    //       href="/"
    //       className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
    //     >
    //       <h2>Gr-News</h2>
    //     </a>
    //     <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
    //       <li>
    //         <Link to="/ad_manage" className="nav-link px-2 link-dark">
    //           Home
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/mk_manage_topic" className="nav-link px-2 link-dark">
    //           Manager Contribution / Topic
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/ad_manage/account" className="nav-link px-2 link-dark">
    //           Account
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="/manager_role" className="nav-link px-2 link-dark">
    //           Manager Role
    //         </Link>
    //       </li>
    //       <li>
    //         <Link to="#" className="nav-link px-2 link-dark">
    //           Profile admin
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  );
};

export default HeaderAdmin;
