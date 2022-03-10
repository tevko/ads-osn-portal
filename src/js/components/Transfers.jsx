import React from "react";
import useFetch from "../hooks/useFetch";
import Tables from "./Tables";
import columnsTwo from "./data/ColumnTwo";
import rowsTwo from "./data/RowsTwo";

export default function Transfers() {
  const { data, error, loading } = useFetch(`${window.API_BASE_URL}/transfers`);
  if (loading) return <p>Loading...</p>;
  if (data)
    return (
      <Tables
        dataColumns={columnsTwo}
        dataRows={rowsTwo}
        gridTitle="Stock Transferred to Pulley"
      />
    );
  if (error) return <p>Error: {error.message}</p>;
  return <p>{data.message}</p>;
}
