import React from "react";
import useFetch from "../hooks/useFetch";
import Tables from "./Tables";
import columnsOne from "./data/Column";
import rowsOne from "./data/Rows";

export default function PurchaseOrders() {
  const { data, error, loading } = useFetch(
    `${window.API_BASE_URL}/purchase-orders`
  );
  if (loading) return <p>Loading...</p>;
  if (data)
    return (
      <Tables
        columnsData={columnsOne}
        rowsData={rowsOne}
        gridTitle="Open Purchase Orders"
      />
    );
  if (error) return <p>Error: {error.message}</p>;
  return <p>{data.message}</p>;
}
