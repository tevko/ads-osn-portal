import React from "react";
import useFetch from "../hooks/useFetch";
import Tables from "./Tables";

export default function Receipts() {
  const { data, error, loading } = useFetch(`${window.API_BASE_URL}/receipts`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Tables
      title="Receipts"
      columns={[
        {
          field: "PONUMBER",
          headerName: "PO Number",
          flex: 1,
        },
        {
          field: "RCPNUMBER",
          headerName: "Receipt Number",
          flex: 1,
        },
        {
          field: "DATE",
          headerName: "Date",
          flex: 1,
        },
        {
          field: "VDCODE",
          headerName: "Vendor Code",
          flex: 1,
        },
        {
          field: "VDNAME",
          headerName: "Vendor Name",
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
          field: "OQORDERED",
          headerName: "Quantity Ordered",
          flex: 1,
        },
        {
          field: "RQRECEIVED",
          headerName: "Quantity Received",
          flex: 1,
        },
        {
          field: "RQOUTSTAND",
          headerName: "Quantity Outstanding",
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
          field: "LOTNUMF",
          headerName: "Lot Number",
          flex: 1,
        },
        {
          field: "QTY",
          headerName: "Quantity",
          flex: 1,
        },
      ]}
      rows={data.map((obj) => ({ ...obj, id: obj.PONUMBER + obj.RCPNUMBER }))}
    />
  );
}
