import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Graph from "./Graph";
import { Typography } from "@mui/material";

export default function Home() {
  const { data, loading } = useFetch(`${window.API_BASE_URL}/dashboard`);

  if (data.po && data.receipt && data.transfer && data.invoice) {
    data.po.total = data.po.length;
    data.po.id = "Purchase Orders";
    data.receipt.total = data.receipt.length;
    data.receipt.id = "Receipts";
    data.transfer.total = data.transfer.length;
    data.transfer.id = "Transfers";
    data.invoice.total = data.invoice.length;
    data.invoice.id = "Invoices";
  }

  return loading ? (
    "...loading"
  ) : (
    <div className="dash_page">
      <Typography variant="h5" color="#fff">
        Totals
      </Typography>
      <div className="bar_chart">
        <Graph data={[data.po, data.receipt, data.transfer, data.invoice]} />
      </div>
    </div>
  );
}

/* rows={data.map((obj) => ({ ...obj, id: obj.PONUMBER + obj.RCPNUMBER }))} */
