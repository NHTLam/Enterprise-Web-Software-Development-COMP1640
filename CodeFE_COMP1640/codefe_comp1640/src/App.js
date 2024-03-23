import React from "react";
import Layout from "./layouts/Layout";
import LayoutAdmin from "./layouts/LayoutAdmin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Slide from "./components/Slide";
import NavbarC from "./components/NavbarC";
import Home from "./pages/Home";
import Login from "./components/Login";
import StAddPost from "./pages/StAddPost";
import StEditPost from "./pages/StEditPost";
import MarketingC from "./pages/MarketingC";
import Me from "./pages/Me/Me";
import Manage from "./pages/Manage";
import Account from "./components/Manage/Account";
import EditAccount from "./components/Manage/EditAccount";
import Feedback from "./components/Manage/Feedback";
import ManagerRole from "./components/Manage/ManagerRole";
import PostHistory from "./pages/PostHistory";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* STUDENT ROUTES */}
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
          path="/history"
          element={
            <Layout>
              <PostHistory/>
            </Layout>
          }
        />

        <Route
          path="/st_edit_post/:id"
          element={
            <Layout>
              <StEditPost />
            </Layout>
          }
        />

        <Route
          path="/me"
          element={
            <Layout>
              <Me />
            </Layout>
          }
        />

        {/* Marketing Conidator ROUTES */}
        <Route
          path="/mk_manage_topic"
          element={
            <Layout>
              <MarketingC />
            </Layout>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/ad_manage"
          element={
            <LayoutAdmin>
              <Manage />
            </LayoutAdmin>
          }
        />
        <Route
          path="/ad_manage/account"
          element={
            <LayoutAdmin>
              <Account />
            </LayoutAdmin>
          }
        />

        <Route
          path="/ad_manage/feedback"
          element={
            <LayoutAdmin>
              <Feedback />
            </LayoutAdmin>
          }
        />

        <Route
          path="/edit_account/:id"
          element={
            <LayoutAdmin>
              <EditAccount />
            </LayoutAdmin>
          }
        />

        <Route
          path="/manager_role"
          element={
            <LayoutAdmin>
              <ManagerRole />
            </LayoutAdmin>
          }
        />
      </Routes>
    </Router>
  );
};
export default App;
