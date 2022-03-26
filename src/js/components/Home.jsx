import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Graph from "./Graph";
import Data from "./data/Data";
import ChartData from "./data/ChartData";
import Chart from "./Chart";
import { Typography } from "@mui/material";

export default function Home() {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    const { data } = useFetch(`${window.API_BASE_URL}/dashboard`);
    if (data) {
      console.log(data);
      setDashboardData(data);
    }
  }, []);

  return (
    <div className="dash_page">
      <Typography variant="h5" color="#fff">
        Relevant Data
      </Typography>
      <div className="pie_charts">
        <Chart data={ChartData} />
        <Chart data={ChartData} />
      </div>
      <Typography variant="h5" color="#fff">
        More Data
      </Typography>
      <div className="bar_chart">
        <Graph data={Data} />
      </div>
    </div>
  );
}
