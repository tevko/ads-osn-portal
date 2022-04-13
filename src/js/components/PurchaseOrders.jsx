import React from "react";
import useFetch from "../hooks/useFetch";
import Tables from "./Tables";

export default function PurchaseOrders() {
  const { data, error, loading } = useFetch(
    `${window.API_BASE_URL}/purchase-orders`
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Tables
      title="Purchase Orders"
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
          field: "DATE",
          headerName: "Date",
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
          field: "LOCATION",
          headerName: "Location",
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
          field: "OQORDERED",
          headerName: "Quantity Ordered",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "OQRECEIVED",
          headerName: "Quantity Received",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "OQCANCELED",
          headerName: "Quantity Canceled",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "OQOUTSTAND",
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
      ]}
      rows={data.map((obj) => ({ ...obj, id: obj.PONUMBER + obj.RCPNUMBER }))}
    />
  );
}
