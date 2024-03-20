import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";
import React from "react";

const Manage = () => {
  const fetchdata = {
    PieChart: [
      ["Business", 11],
      ["Design", 2],
      ["IT", 2],
    ],
    BarChart: [
      ["Copper", 8.94, "#b87333"], // RGB value
      ["Silver", 10.49, "silver"], // English color name
      ["Gold", 19.3, "gold"],
      ["Platinum", 18.2, "color: #e5e4e2"], // CSS-style declaration
    ],
    LineChart: [
      [1, 37.8, 80.8, 41.8],
      [2, 40, 69.5, 32.4],
      [3, 25.4, 57, 25.7],
      [4, 11.7, 18.8, 10.5],
      [5, 11.9, 17.6, 10.4],
      [6, 8.8, 13.6, 7.7],
      [7, 7.6, 12.3, 9.6],
      [8, 12.3, 29.2, 10.6],
      [9, 16.9, 42.9, 14.8],
      [10, 12.8, 30.9, 11.6],
      [11, 5.3, 7.9, 4.7],
      [12, 6.6, 8.4, 5.2],
    ],
  };

  const pieChart = fetchdata.PieChart;

  //Pie Chart % đóng góp
  const data = [["Department", "Number of contributions"], ...pieChart];

  const options = {
    title: "Pie chart",
  };

  //Column Chart (Số lượng đóng góp theo khoa or các tháng)
  const data2 = [
    ["Element", "null", { role: "style" }],
    // ["Copper", 8.94, "#b87333"], // RGB value
    // ["Silver", 10.49, "silver"], // English color name
    // ["Gold", 19.3, "gold"],
    // ["Platinum", 18.2, "color: #e5e4e2"], // CSS-style declaration
  ];
  const data4 = [
    ["Copper", 8.94, "#b87333"], // RGB value
    ["Silver", 10.49, "silver"], // English color name
    ["Gold", 19.3, "gold"],
    ["Platinum", 18.2, "color: #e5e4e2"], // CSS-style declaration
  ];

  const data5 = [...data2, ...data4];

  //Line Chart
  // Top 10 topic được đóng góp nhiều nhất.
  // Top 10 topic được comment nhiều nhất.
  // Top 10 học sinh có nhiều đóng góp nhất.
  const data3 = [
    [
      "Day",
      "Guardians of the Galaxy",
      "The Avengers",
      "Transformers: Age of Extinction",
    ],
    [1, 37.8, 80.8, 41.8],
    [2, 40, 69.5, 32.4],
    [3, 25.4, 57, 25.7],
    [4, 11.7, 18.8, 10.5],
    [5, 11.9, 17.6, 10.4],
    [6, 8.8, 13.6, 7.7],
    [7, 7.6, 12.3, 9.6],
    [8, 12.3, 29.2, 10.6],
    [9, 16.9, 42.9, 14.8],
    [10, 12.8, 30.9, 11.6],
    [11, 5.3, 7.9, 4.7],
    [12, 6.6, 8.4, 5.2],
  ];

  const options3 = {
    chart: {
      title: "Box Office Earnings in First Two Weeks of Opening",
      subtitle: "in millions of dollars (USD)",
    },
  };

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
          data={data5}
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
