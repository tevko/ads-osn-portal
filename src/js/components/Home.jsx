import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Graph from "./Graph";
import Data from "./data/Data";
import ChartData from "./data/ChartData";
import Chart from "./Chart";
import { Typography } from "@mui/material";

export default function Home() {
  const { data } = useFetch(`${window.API_BASE_URL}/dashboard`);
  console.log(data);

  return (
    <div className="dash_page">
      <Typography variant="h5" color="#fff">
        Relevant Data
      </Typography>
      <div className="pie_charts">
        {/*  This is the one I'm trying to map right now <Chart data={data.map((obj) => (  ))} /> */}
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

/* rows={data.map((obj) => ({ ...obj, id: obj.PONUMBER + obj.RCPNUMBER }))} */
