import React from "react";
import useFetch from "../hooks/useFetch";
import Tables from "./Tables";

export default function Invoices() {
  const { data, error, loading } = useFetch(`${window.API_BASE_URL}/invoices`);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Tables
      title="Invoices"
      columns={[
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
          field: "PONUMBER",
          headerName: "PO Number",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "PODATE",
          headerName: "PO Date",
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
          field: "QTYORD",
          headerName: "Quantity Ordered",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "UNIT",
          headerName: "Order Unit",
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
          field: "QTYTRANS",
          headerName: "Quantity Transferred",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "TOTALTRANSCOST",
          headerName: "Total Transfer Cost",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "INVNUMBER",
          headerName: "Inventory Number",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "INVEXT",
          headerName: "Receipt Extended",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "DOCNBR",
          headerName: "Document Number",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "PYMTAMNT",
          headerName: "Payment Amount",
          flex: 1,
          minWidth: 150,
        },
      ]}
      rows={data.map((obj) => ({ ...obj, id: obj.PONUMBER + obj.ITEMDESC }))}
    />
  );
}
