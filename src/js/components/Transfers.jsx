import React from "react";
import useFetch from "../hooks/useFetch";
import Tables from "./Tables";

export default function Transfers() {
  const { data, error, loading } = useFetch(`${window.API_BASE_URL}/transfers`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Tables
      title="Stock Transferred to Pulley"
      columns={[
        {
          field: "DOCNUM",
          headerName: "Document Number",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "TRANSDATE",
          headerName: "Transfer Date",
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
          field: "TRANSFER FROM",
          headerName: "From Location",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "TRANSFER TO",
          headerName: "To Location",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "QTY TRANSFERRED",
          headerName: "Quantity",
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
          field: "TOTAL COST",
          headerName: "Total Cost",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "PONUMBER",
          headerName: "PO Number",
          flex: 1,
          minWidth: 150,
        },
      ]}
      rows={data.map((obj) => ({ ...obj, id: obj.ITEMNO + obj.DOCNUM }))}
    />
  );
}
