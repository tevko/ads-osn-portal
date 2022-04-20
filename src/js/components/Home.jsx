import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Graph from "./Graph";
import Data from "./data/Data";
import { Typography } from "@mui/material";

export default function Home() {
  const { data } = useFetch(`${window.API_BASE_URL}/dashboard`);
  console.log(data);

  return (
    <div className="dash_page">
      <Typography variant="h5" color="#fff">
        Totals
      </Typography>
      <div className="bar_chart">
        <Graph
          data={data.map((obj) => ({
            ...obj,
            id: obj.invoice,
            value: obj.length,
          }))}
        />
      </div>
    </div>
  );
}

/* rows={data.map((obj) => ({ ...obj, id: obj.PONUMBER + obj.RCPNUMBER }))} */
