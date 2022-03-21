import React from "react";
import Graph from "./Graph";
import Data from "./data/Data";
import ChartData from "./data/ChartData";
import Chart from "./Chart";

export default function Home() {
  return (
    <div className="dash_page">
      <h1>Most Relevant Data</h1>
      <div className="pie_charts">
        <Chart data={ChartData} />
        <Chart data={ChartData} />
      </div>
      <h1>More Data</h1>
      <div className="bar_chart">
        <Graph data={Data} />
      </div>
    </div>
  );
}
