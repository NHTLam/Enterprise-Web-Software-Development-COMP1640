import React from "react";
import Layout from "./layouts/Layout";
import LayoutAdmin from "./layouts/LayoutAdmin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home";
import Login from "./components/Login";
import StAddPost from "./pages/StAddPost";
import StEditPost from "./pages/StEditPost";
import MarketingC from "./pages/MarketingC/MarketingC";
import Me from "./pages/Me/Me";
import Manage from "./pages/Manage";
import Account from "./components/Manage/Account";
import EditAccount from "./components/Manage/EditAccount";
import Feedback from "./components/Manage/Feedback";
import ManagerRole from "./components/Manage/ManagerRole";
import PostHistory from "./pages/PostHistory";
import MarketingCFeedb from "./pages/MarketingC/MarketingCFeedb";
import DetailContribution from "./components/DetailContribution";
import Department from "./pages/Department";
import ManageTopic from "./pages/ManagerC/ManageTopic";
import CheckLog from "./pages/Log/CheckLog";
import CreateTopic from "./pages/MarketingC/CreateTopic";
import BadWord from "./pages/BadWord/BadWord";
import ViewHistory from "./components/ViewHistory";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route
          path="/me"
          element={
            <Layout>
              <Me />
            </Layout>
          }
        />

        {/* STUDENT ROUTES */}
        <Route
          path="/topic/view/:topicId" //need id of topic here
          element={
            <Layout>
              <StAddPost />
            </Layout>
          }
        />
        <Route
          path="/contribute/view/edit/:id"
          element={
            <Layout>
              <StEditPost />
            </Layout>
          }
        />

        <Route
          path="/history"
          element={
            <Layout>
              <PostHistory />
            </Layout>
          }
        />

        <Route
          path="/history/view/:id"
          element={
            <Layout>
              <ViewHistory />
            </Layout>
          }
        />

        <Route
          path="/department/:departmentId"
          element={
            <Layout>
              <Department />
            </Layout>
          }
        />
        <Route
          path="/contribution/detail/:contributionId"
          element={
            <Layout>
              <DetailContribution />
            </Layout>
          }
        />

        {/* Marketing Conidator ROUTES */}
        <Route
          path="/mk-manage-topic"
          element={
            <LayoutAdmin>
              <MarketingC />
            </LayoutAdmin>
          }
        />
        <Route
          path="/mk-manage-topic/create"
          element={
            <LayoutAdmin>
              <CreateTopic />
            </LayoutAdmin>
          }
        />

        {/* <Route
          path="/contribution/view/:id"
          element={
            <Layout>
              <MarketingCFeedb />
            </Layout>
          }
        />  */}

        {/* <Route path="/contribute/view/:id" element={<MarketingCFeedb />} /> */}

        {/* MANAGER ROUTES */}

        <Route
          path="/contribute/view/:id"
          element={
            <LayoutAdmin>
              <MarketingCFeedb />
            </LayoutAdmin>
          }
        />
        <Route
          path="/manager_manage"
          element={
            <LayoutAdmin>
              <ManageTopic />
            </LayoutAdmin>
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

        <Route
          path="/check_log"
          element={
            <LayoutAdmin>
              <CheckLog />
            </LayoutAdmin>
          }
        />

        <Route
          path="/manage_bad_word"
          element={
            <LayoutAdmin>
              <BadWord />
            </LayoutAdmin>
          }
        />
      </Routes>
    </Router>
  );
};
export default App;
