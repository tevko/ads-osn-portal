import React from "react";
import useFetch from "../hooks/useFetch";
import Tables from "./Tables";

export default function ProductionSchedule() {
  const { data, error, loading } = useFetch(
    `${window.API_BASE_URL}/production-schedule`
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const addHighlightClass = (params, str) => params && params.value !== null && params.value !== undefined && params.value.toString().trim() && str;

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
          field: "SHIFT3",
          headerName: "Shift 3",
          flex: 1,
          minWidth: 150,
          cellClassName: (params) => addHighlightClass(params, 'highlight-1'),
        },
        {
          field: "SIDE3",
          headerName: "Side 3",
          flex: 1,
          minWidth: 150,
          cellClassName: (params) => addHighlightClass(params, 'highlight-1'),
        },
        {
          field: "DESC3",
          headerName: "Description 3",
          flex: 1,
          minWidth: 150,
          cellClassName: (params) => addHighlightClass(params, 'highlight-1'),
        },
        {
          field: "QTY3",
          headerName: "Quantity 3",
          flex: 1,
          minWidth: 150,
          cellClassName: (params) => addHighlightClass(params, 'highlight-1'),
        },
        {
          field: "COMMENT3",
          headerName: "Comment",
          flex: 1,
          minWidth: 150,
          cellClassName: (params) => addHighlightClass(params, 'highlight-1'),
        },
        {
          field: "SHIFT2",
          headerName: "Shift 2",
          flex: 1,
          minWidth: 150,
          cellClassName: (params) => addHighlightClass(params, 'highlight-2'),
        },
        {
          field: "SIDE2",
          headerName: "Side 2",
          flex: 1,
          minWidth: 150,
          cellClassName: (params) => addHighlightClass(params, 'highlight-2'),
        },
        {
          field: "DESC2",
          headerName: "Description",
          flex: 1,
          minWidth: 150,
          cellClassName: (params) => addHighlightClass(params, 'highlight-2'),
        },
        {
          field: "QTY2",
          headerName: "Quantity 2",
          flex: 1,
          minWidth: 150,
          cellClassName: (params) => addHighlightClass(params, 'highlight-2'),
        },
        {
          field: "COMMENT2",
          headerName: "Comment",
          flex: 1,
          minWidth: 150,
          cellClassName: (params) => addHighlightClass(params, 'highlight-2'),
        },
        {
          field: "SHIFT1",
          headerName: "Shift 1",
          flex: 1,
          minWidth: 150,
          cellClassName: (params) => addHighlightClass(params, 'highlight-3'),
        },
        {
          field: "SIDE1",
          headerName: "Side 1",
          flex: 1,
          minWidth: 150,
          cellClassName: (params) => addHighlightClass(params, 'highlight-3'),
        },
        {
          field: "DESC1",
          headerName: "Description",
          flex: 1,
          minWidth: 150,
          cellClassName: (params) => addHighlightClass(params, 'highlight-3'),
        },
        {
          field: "QTY1",
          headerName: "Quantity 1",
          flex: 1,
          minWidth: 150,
          cellClassName: (params) => addHighlightClass(params, 'highlight-3'),
        },
        {
          field: "COMMENT1",
          headerName: "Comment",
          flex: 1,
          minWidth: 150,
          cellClassName: (params) => addHighlightClass(params, 'highlight-3'),
        },
      ]}
      rows={data.map((obj) => ({ ...obj, id: obj.LINENUM + obj.DESC1 }))}
    />
  );
}
