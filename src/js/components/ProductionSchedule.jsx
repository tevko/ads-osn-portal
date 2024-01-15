import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Tables from "./Tables";

export default function ProductionSchedule() {
  const { data, error, loading } = useFetch(
    `${window.API_BASE_URL}/production-schedule`
  );
  const [filter, toggleFilter] = useState(false);
  const [values, setValues] = useState([]);
  
  const addHighlightClass = (params, str) => params && params.value !== null && params.value !== undefined && params.value.toString().trim() && str;
  
  useEffect(() => {
    if (data && !loading) {
      const d = data.map((obj) => ({ ...obj, id: obj.LINENUM + obj.DESC1 }));
      const td = new Date();
      if (filter) {
        setValues(d.filter(o => {
          const currDatePlusSeven = new Date();
          currDatePlusSeven.setDate(currDatePlusSeven.getDate() + 7);
          const objDate = new Date(o.DATE);
          return objDate <= currDatePlusSeven && (objDate >= td || (objDate.getDay() === td.getDay() && objDate.getMonth() === td.getMonth() && objDate.getFullYear() === td.getFullYear()));
        }));
      } else {
        setValues(d);
      }
    }
  }, [filter]);

  useEffect(() => {
    if (data && !loading) setValues(data.map((obj) => ({ ...obj, id: obj.LINENUM + obj.DESC1 })))
  }, [loading, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <button onClick={() => toggleFilter(d => !d)}>{filter ? "Show all Data" : "Show Next 7 Days"}</button>
      <Tables
        title="Production Schedule"
        columns={[
          {
            field: "DATE",
            headerName: "Date",
            flex: 1,
            minWidth: 150,
          },
          {
            field: "SIDE3",
            headerName: "Side",
            flex: 1,
            minWidth: 150,
            cellClassName: (params) => addHighlightClass(params, 'highlight-1'),
          },
          {
            field: "SHIFT3",
            headerName: "Shift",
            flex: 1,
            minWidth: 150,
            cellClassName: (params) => addHighlightClass(params, 'highlight-1'),
          },
          {
            field: "ITEM3",
            headerName: "Item",
            flex: 1,
            minWidth: 150,
            cellClassName: (params) => addHighlightClass(params, 'highlight-1'),
          },
          {
            field: "DESC3",
            headerName: "Description",
            flex: 1,
            minWidth: 150,
            cellClassName: (params) => addHighlightClass(params, 'highlight-1'),
          },
          {
            field: "QTY3",
            headerName: "Quantity",
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
            field: "SIDE2",
            headerName: "Side",
            flex: 1,
            minWidth: 150,
            cellClassName: (params) => addHighlightClass(params, 'highlight-2'),
          },
          {
            field: "SHIFT2",
            headerName: "Shift",
            flex: 1,
            minWidth: 150,
            cellClassName: (params) => addHighlightClass(params, 'highlight-2'),
          },
          {
            field: "ITEM2",
            headerName: "Item",
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
            headerName: "Quantity",
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
            field: "SIDE1",
            headerName: "Side",
            flex: 1,
            minWidth: 150,
            cellClassName: (params) => addHighlightClass(params, 'highlight-3'),
          },
          {
            field: "SHIFT1",
            headerName: "Shift",
            flex: 1,
            minWidth: 150,
            cellClassName: (params) => addHighlightClass(params, 'highlight-3'),
          },
          {
            field: "ITEM1",
            headerName: "Item",
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
            headerName: "Quantity",
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
        rows={values}
      />
    </>
  );
}
