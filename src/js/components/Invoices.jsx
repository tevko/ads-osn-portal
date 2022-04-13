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
          field: "VENDNAME",
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
          field: "OQORDERED",
          headerName: "Quantity Ordered",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "ORDERUNIT",
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
        /* add lot number */
        {
          field: "RQOUTSTAND",
          headerName: "Quantity Outstanding",
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
          field: "RECQTY",
          headerName: "Receipt Quantity",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "RECUNITCOST",
          headerName: "Receipt Unit Cost",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "RECEXTEND",
          headerName: "Receipt Extended",
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
          field: "QTYTRANS",
          headerName: "Quantity Transferred",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "TRANSUNIT",
          headerName: "Transferred Unit",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "Expr1",
          headerName: "Expr1",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "INVNUMBER",
          headerName: "Invoice Number",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "INVUNITCOST",
          headerName: "Invoice Unit Cost",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "INVEXT",
          headerName: "Invoice Extended",
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
