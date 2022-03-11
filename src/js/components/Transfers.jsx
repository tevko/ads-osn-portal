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
        },
        {
          field: "VDCODE",
          headerName: "Vendor Code",
          flex: 1,
        },
        {
          field: "VDNAME",
          headerName: "Vendor Name",
          flex: 1,
        },
        {
          field: "ITEMNO",
          headerName: "Item Number",
          flex: 1,
        },
        {
          field: "ITEMDESC",
          headerName: "Item Description",
          flex: 1,
        },
        {
          field: "FROMLOC",
          headerName: "From Location",
          flex: 1,
        },
        {
          field: "TOLOC",
          headerName: "To Location",
          flex: 1,
        },
        {
          field: "QUANTITY",
          headerName: "Quantity",
          flex: 1,
        },
        {
          field: "LOTNUMF",
          headerName: "Lot Number",
          flex: 1,
        },
        {
          field: "UNITCOST",
          headerName: "Unit Cost",
          flex: 1,
        },
      ]}
      rows={data.map((obj) => ({ ...obj, id: obj.ITEMNO + obj.DOCNUM }))}
    />
  );
}
