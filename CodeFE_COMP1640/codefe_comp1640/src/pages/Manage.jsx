import { Link, useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import * as Toast from "../components/Toast";
const token = localStorage.getItem("token");
const API_BASE = process.env.REACT_APP_API_KEY;

const Manage = () => {
  const navigate = useNavigate();
  const [listDashBoard, setlistDashBoard] = useState({
    pieChartSimplifys: [],
    barChartSimplifys: [],
    lineChartSimplifys: [],
  });
  // TypeError: pieChart is not iterable
  const pieChart = listDashBoard.pieChartSimplifys;
  const barChart = listDashBoard.barChartSimplifys;
  const lineChart = listDashBoard.lineChartSimplifys;

  // // //Pie Chart % đóng góp
  const data = [["Department", "Number of contributions"], ...pieChart];

  const options = {
    title: "Pie chart",
  };

  //Column Chart (Số lượng đóng góp theo khoa or các tháng)
  const data2 = [["Element", "topic", { role: "style" }], ...barChart];

  //Line Chart
  // Top 10 topic được đóng góp nhiều nhất.
  // Top 10 topic được comment nhiều nhất.
  // Top 10 học sinh có nhiều đóng góp nhất.
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

  const options3 = {
    chart: {
      title: "Number of topics reported each month",
    },
  };

  useEffect(() => {
    const dashBoard = async () => {
      try {
        const res = await axios.post(`${API_BASE}/dashboard/get-data`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 403){
          console.log("No Permission!");
          Toast.toastErorr("You do not have permission to perform this action");
          setTimeout(()=>{
            navigate("/");
          },1000)  
        }
        setlistDashBoard({
          pieChartSimplifys: res.data.pieChartSimplifys,
          barChartSimplifys: res.data.barChartSimplifys,
          lineChartSimplifys: res.data.lineChartSimplifys,
        });
        console.table("List of dashboard:", JSON.stringify(res.data));
      } catch (err) {
        console.log("Failed to list account! " + err);
      }
    };
    dashBoard();
  }, []);

  return (
    <div className="container">
      <h1 className="fw-bold">Dashboard</h1>
      <div className="row w-100 bg-light mb-3">
        <h3>Pie Chart</h3>
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      </div>
      <div className="row w-100 bg-dark mb-3">
        <h3>Column Chart</h3>
        <Chart
          chartType="ColumnChart"
          width={"100%"}
          height={"400px"}
          data={data2}
        />
      </div>
      <div className="row w-100 bg-light">
        <h3>Line Chart</h3>
        <Chart
          chartType="Line"
          width="100%"
          height="400px"
          data={data3}
          options={options3}
        />
      </div>
    </div>
  );
};

export default Manage;
