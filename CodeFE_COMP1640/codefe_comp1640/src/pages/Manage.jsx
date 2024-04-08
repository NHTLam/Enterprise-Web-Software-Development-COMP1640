import { Link, useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import * as Toast from "../components/Toast";
const API_BASE = process.env.REACT_APP_API_KEY;

const Manage = () => {
  const navigate = useNavigate();
  const [listDashBoard, setlistDashBoard] = useState({
    pieChartSimplifys: [],
    barChartSimplifys: [],
    lineChartSimplifys: [],
  });
  const pieChart = listDashBoard.pieChartSimplifys;
  const barChart = listDashBoard.barChartSimplifys;
  const lineChart = listDashBoard.lineChartSimplifys;

  //Pie Chart % đóng góp
  const data = [["Department", "Number of contributions"], ...pieChart];

  const options = {
    title: "Pie chart",
  };

  //Column Chart (Số lượng đóng góp theo khoa or các tháng)
  const data2 = [["Element", "topic", { role: "style" }], ...barChart];

  //Line Chart
  const data3 = [
    [
      "Month",
      "Business and Economics",
      "Engineering",
      "Arts and Humanities",
      "Law",
      "Science",
    ],
    ...lineChart,
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const dashBoard = async () => {
      try {
        const res = await axios.post(`${API_BASE}/dashboard/get-data`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setlistDashBoard({
          pieChartSimplifys: res.data.pieChartSimplifys,
          barChartSimplifys: res.data.barChartSimplifys,
          lineChartSimplifys: res.data.lineChartSimplifys,
        });
        console.table("List of dashboard:", JSON.stringify(res.data));
      } catch (err) {
        console.log("Failed to list account! " + err);
        Toast.toastErorr("You do not have permission to perform this action");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    };
    dashBoard();
  }, []);

  return (
    <div className="container">
      <h2 className="fw-bold">Dashboard</h2>
      <div className="mt-2">
        <div className="row mt-2">
          {/* row */}
          <div className="col-12 col-md-4 ">
            <div className="card border-0 bg-light">
              <div className="card-body py-4">
                <h5 className="mb-2 fw-bold">Total Account</h5>
                <div className="d-flex">
                  <p className="mb-2 fw-bold">50</p>
                  <i class="bi bi-person ms-2"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card border-0 bg-light">
              <div className="card-body py-4">
                <h5 className="mb-2 fw-bold">Total topic</h5>
                <div className="d-flex">
                  <p className="mb-2 fw-bold">50</p>
                  <i class="bi bi-card-text ms-2"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 ">
            <div className="card border-0 bg-light">
              <div className="card-body py-4">
                <h5 className="mb-2 fw-bold">Total Role</h5>
                <div className="d-flex">
                  <p className="mb-2 fw-bold">50</p>
                  <i class="bi bi-person-lines-fill ms-2"></i>
                </div>
              </div>
            </div>
          </div>
          {/* row */}
        </div>
        <hr />
        <div className="container">
          <div className="row bg-light">
            <h4>Percentage contribution of each department</h4>
            <div>
              <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
              />
            </div>
          </div>
          <hr />
          <div className="row bg-light">
            <h4>Number of contributions of each department</h4>
            <div>
              <Chart
                chartType="ColumnChart"
                width={"100%"}
                height={"400px"}
                data={data2}
              />
            </div>
          </div>
          <hr />
          <div className="row bg-light">
            <h4>Number of faculty evaluations per month</h4>
            <div>
              <Chart
                chartType="Line"
                width="100%"
                height="400px"
                data={data3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manage;
