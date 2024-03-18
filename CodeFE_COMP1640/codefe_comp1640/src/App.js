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

        <Route
          path="/mk_manage_topic"
          element={
            <Layout>
              <MarketingC />
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
        <Route path="/ad_manage" element={
          <LayoutAdmin>
            <Manage />
          </LayoutAdmin>} />
        <Route
          path="/ad_manage/account"
          element={
            <LayoutAdmin>
              <Account />
            </LayoutAdmin>
          }
        />

<Route
          path="/ad_manage/account/:account_id"
          element={
            <LayoutAdmin>
              <EditAccount />
            </LayoutAdmin>
          }
        />
      </Routes>
    </Router>
  );
};
export default App;
