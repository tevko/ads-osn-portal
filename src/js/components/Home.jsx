import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Graph from "./Graph";
import { Typography } from "@mui/material";

export default function Home() {
  const { po, receipt, transfer, invoice, loading } = useFetch(
    `${window.API_BASE_URL}/dashboard`
  );

  if (po && receipt && transfer && invoice) {
    po.total = po.length;
    po.id = "Purchase Orders";
    receipt.total = receipt.length;
    receipt.id = "Receipts";
    transfer.total = transfer.length;
    transfer.id = "Transfers";
    invoice.total = invoice.length;
    invoice.id = "Invoices";
  }

  return loading ? (
    "...loading"
  ) : (
    <div className="dash_page">
      <Typography variant="h5" color="#fff">
        Totals
      </Typography>
      <div className="bar_chart">
        <Graph data={[po, receipt, transfer, invoice]} />
      </div>
    </div>
  );
}

/* rows={data.map((obj) => ({ ...obj, id: obj.PONUMBER + obj.RCPNUMBER }))} */
