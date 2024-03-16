import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

  return (
    <div className="container border border-2 w-25 d-flex justify-content-center align-content-center">
      <h2 style={{ textAlign: "center" }}>LOGIN</h2>
      <form className="">
        <input
          type="text"
          className="rounded-2 form-control mb-2"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          className="rounded-2 form-control mb-2"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div className="d-grid align-content-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClickLogin}
          >
            LOGIN
          </button>
        </div>
        <p className="small fw-bold mt-2 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="link-danger">
            SIGN UP
          </Link>
        </p>
        <hr></hr>
        <div className="d-flex justify-content-center">
          <button className="btn btn-success" type="button">
            SIGN IN WITH GOOGLE
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
