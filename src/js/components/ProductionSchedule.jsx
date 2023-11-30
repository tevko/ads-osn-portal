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
          field: "FormattedDate",
          headerName: "Date",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "SIDE3",
          headerName: "Side 3",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "DESC3",
          headerName: "Description 3",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "QTY3",
          headerName: "Quantity 3",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "COMMENT3",
          headerName: "Comment",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "SIDE2",
          headerName: "Side 2",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "DESC2",
          headerName: "Description",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "QTY2",
          headerName: "Quantity 2",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "COMMENT2",
          headerName: "Comment",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "SIDE1",
          headerName: "Side 1",
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
          headerName: "Quantity 1",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "COMMENT1",
          headerName: "Comment",
          flex: 1,
          minWidth: 150,
        },
      ]}
      rows={data.map((obj) => ({ ...obj, id: obj.LINENUM + obj.DESC1 }))}
    />
  );
}
