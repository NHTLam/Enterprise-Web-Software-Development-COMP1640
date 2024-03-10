import React from "react";
import Layout from "./layouts/Layout";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Slide from "./components/Slide";
import Navbar from "./components/NavbarC";
import Container from "./components/Container";
import Login from "./components/Login";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Slide />
              <Navbar />
              <Container />
            </Layout>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route
          path="/manage post"
          element={
            <div>
              <h1>Login Page</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};
export default App;
