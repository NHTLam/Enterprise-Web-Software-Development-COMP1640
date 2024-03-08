import React from "react";
import Layout from "./layouts/Layout";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Slide from "./components/Slide";
import NavbarC from "./components/NavbarC";
import Home from "./pages/Home";
import PostInfor from "./components/PostInfor"
import PostSubmit from "./forms/PostSubmit/PostSubmit";
const App = () => {
  const onFileChange = (files) =>{
    console.log(files)
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Slide />
              <NavbarC/>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/login"
          element={
            <div>
              <h1>Login Page</h1>
            </div>
          }
        />

        <Route
          path="/submit_post"
          element={
            <Layout>
              <PostInfor/>
              <PostSubmit
                onFileChange={(files) => onFileChange(files)}
              />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};
export default App;
