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
          field: "LOCATION",
          headerName: "Location",
          flex: 1,
          minWidth: 150,
        },
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
          field: "VENDOR",
          headerName: "Vendor Code",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "NAME",
          headerName: "Vendor Name",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "ITEM",
          headerName: "Item Number",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "DESCRIPTION",
          headerName: "Item Description",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "QTYORD",
          headerName: "Quantity Ordered",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "QTYREC",
          headerName: "Quantity Received",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "QTYOS",
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
          field: "LOTNUM",
          headerName: "Lot Number",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "LOTQTY",
          headerName: "Lot Quantity",
          flex: 1,
          minWidth: 150,
        },
      ]}
      rows={data.map((obj) => ({ ...obj, id: obj.PONUMBER + obj.RCPNUMBER }))}
    />
  );
}
