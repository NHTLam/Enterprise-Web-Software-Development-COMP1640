import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import * as Toast from "../components/Toast";
const API_BASE = process.env.REACT_APP_API_KEY;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailError("Please enter your email address");
    } else {
      setEmailError("");
    }
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setPasswordError("Please enter your password");
    } else {
      setPasswordError("");
    }
  };

  const handleClickLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE}/app-user/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        const token = response.data;
        localStorage.setItem("token", token);
        navigate("/");
      }
    } catch (err) {
      Toast.toastErorr("Wrong email or password");
      console.log("Error " + err);
    }
  };

  return (
    <section className="vh-100 bg-custom">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-light text-black rounded-2">
              <div className="card-body p-5">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 class="fw-bold mb-2 text-uppercase text-center">Login</h2>
                  <p class="text-black-50 mb-5 text-center">
                    Please enter your login and password!
                  </p>
                  {/* Hiển thị nhập */}
                  <div className="mb-4">
                    <label className="form-label">Email</label>
                    <input
                      className="input-group form-control-lg"
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleChangeEmail}
                    />
                    {emailError && <p className="text-danger">{emailError}</p>}
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Password</label>
                    <input
                      className="input-group form-control-lg"
                      type="password"
                      id="password"
                      value={password}
                      onChange={handleChangePassword}
                    />
                    {passwordError && (
                      <p className="text-danger">{passwordError}</p>
                    )}
                  </div>
                  <div
                    className="btn btn-primary btn-lg px-5 d-grid"
                    type="submit"
                    onClick={handleClickLogin}
                  >
                    Login
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
