import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const response = await axios.post(
        "https://0894-2405-4802-1d0e-f8f0-f97e-3de2-2c81-98a7.ngrok-free.app/app-user/login",
        {
          email,
          password,
        }
      );
      const user = response.data;
      if (response.status === 200) {
        console.log("Login successful", user);
        navigate("/");
      } else if (response.status === 400) {
        console.log("Wrong email or password");
      }
    } catch (err) {
      console.log("Error " + err);
    }
  };

  // background-image: url(https://eskipaper.com/images/tumblr-wallpaper-8.jpg);
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
