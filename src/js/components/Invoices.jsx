import React from "react";
import useFetch from "../hooks/useFetch";
import Tables from "./Tables";

export default function Invoices() {
  const { data, error, loading } = useFetch(
    `${window.API_BASE_URL}/invoices?id=BUN01`
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <Tables
      title="Purchase Orders"
      rows={
        ({
          field: "PONUMBER",
          headerName: "PO Number",
          flex: 1,
        },
        {
          field: "DATE",
          headerName: "Date",
          flex: 1,
        },
        {
          field: "VDCODE",
          headerName: "Vendor",
          flex: 1,
        },
        {
          field: "INVNUMBER",
          headerName: "Invoice Number",
          flex: 1,
        },
        {
          field: "ITEMNO",
          headerName: "Item Number",
          flex: 1,
        },
        {
          field: "ITEMDESC",
          headerName: "Item Description",
          flex: 1,
        },
        {
          field: "UNITCOST",
          headerName: "Unit Cost",
          flex: 1,
        },
        {
          field: "EXTENDED",
          headerName: "Extended",
          flex: 1,
        },
        {
          field: "RCPNUMBER",
          headerName: "Receipt Number",
          flex: 1,
        },
        {
          field: "LINK",
          headerName: "Link",
          flex: 1,
        })
      }
      columns={data.map((obj) => ({ ...obj, id: obj.PONUMBER }))}
    />
  );
}
