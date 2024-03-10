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
import StAddPost from "./pages/StAddPost"
const App = () => {
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
          path="/st_submit_post"
          element={
            <Layout>
              <StAddPost/>
            </Layout>
          }
        />
        <Route
          path="/st_edit_post"
          element={
            <Layout>
              <StAddPost/>
            </Layout>
          }
        />
      </Routes>     
    </Router>
  );
};
export default App;
