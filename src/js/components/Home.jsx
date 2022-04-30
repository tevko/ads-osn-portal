import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Graph from "./Graph";
import Data from "./data/Data";
import { Typography } from "@mui/material";

export default function Home() {
  const { po, receipt, transfer, invoice } = useFetch(
    `${window.API_BASE_URL}/dashboard`
  );
  console.log(po, receipt, transfer, invoice);

  return (
    <div className="dash_page">
      <Typography variant="h5" color="#fff">
        Totals
      </Typography>
      <div className="bar_chart">
        <Graph data={Data} />
      </div>
    </div>
  );
}

/* rows={data.map((obj) => ({ ...obj, id: obj.PONUMBER + obj.RCPNUMBER }))} */
