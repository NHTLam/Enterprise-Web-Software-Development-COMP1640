import React from "react";
import Layout from "./layouts/Layout";
import LayoutAdmin from "./layouts/LayoutAdmin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Slide from "./components/Slide";
import NavbarC from "./components/NavbarC";
import Home from "./pages/Home";
import Login from "./components/Login";
import StAddPost from "./pages/StAddPost";
import StEditPost from "./pages/StEditPost";
import Manage from "./pages/Manage";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Slide />
              <NavbarC />
              <Home />
            </Layout>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route
          path="/st_submit_post"
          element={
            <Layout>
              <StAddPost />
            </Layout>
          }
        />

        <Route
          path="/st_edit_post"
          element={
            <Layout>
              <StEditPost />
            </Layout>
          }
        />

        <Route path="/ad_manage" element={<Manage />} />
        <Route
          path="/ad_manage/account"
          element={
            <LayoutAdmin>
              <Manage />
            </LayoutAdmin>
          }
        />
      </Routes>
    </Router>
  );
};
export default App;
