import React from "react";
import Graph from "./Graph";
import Data from "./data/Data";
import ChartData from "./data/ChartData";
import Chart from "./Chart";
import { Typography } from "@mui/material";

export default function Home() {
  return (
    <div className="dash_page">
      <Typography variant="h4" color="#fff">
        Relevant Data
      </Typography>
      <div className="pie_charts">
        <Chart data={ChartData} />
        <Chart data={ChartData} />
      </div>
      <Typography variant="h4" color="#fff">
        More Data
      </Typography>
      <div className="bar_chart">
        <Graph data={Data} />
      </div>
    </div>
  );
}
