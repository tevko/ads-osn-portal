import React from "react";
import useFetch from "../hooks/useFetch";
import Tables from "./Tables";

export default function ProductionSchedule() {
  const { data, error, loading } = useFetch(
    `${window.API_BASE_URL}/production-schedule`
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Tables
      title="Production Schedule"
      columns={[
        {
          field: "SIDE1",
          headerName: "Side",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "DESC1",
          headerName: "Description",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "QTY1",
          headerName: "Quantity",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "COMMENT1",
          headerName: "Comment",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "LINENUM",
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
      ]}
      rows={data.map((obj) => ({ ...obj, id: obj.LINENUM + obj.DESC1 }))}
    />
  );
}
