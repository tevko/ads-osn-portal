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
          minWidth: 150,
        },
        {
          field: "RCPNUMBER",
          headerName: "Receipt Number",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "DATE",
          headerName: "Date",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "VDCODE",
          headerName: "Vendor Code",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "VDNAME",
          headerName: "Vendor Name",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "ITEMNO",
          headerName: "Item Number",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "ITEMDESC",
          headerName: "Item Description",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "OQORDERED",
          headerName: "Quantity Ordered",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "RQRECEIVED",
          headerName: "Quantity Received",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "RQOUTSTAND",
          headerName: "Quantity Outstanding",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "UNITCOST",
          headerName: "Unit Cost",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "EXTENDED",
          headerName: "Extended",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "LOTNUMF",
          headerName: "Lot Number",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "QTY",
          headerName: "Quantity",
          flex: 1,
          minWidth: 150,
        },
      ]}
      rows={data.map((obj) => ({ ...obj, id: obj.PONUMBER + obj.RCPNUMBER }))}
    />
  );
}
