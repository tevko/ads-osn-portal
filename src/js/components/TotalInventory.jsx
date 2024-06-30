import React from "react";
import useFetch from "../hooks/useFetch";
import Tables from "./Tables";

export default function TotalInventory() {
  const { data, error, loading } = useFetch(
    `${window.API_BASE_URL}/total-inventory`
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Tables
      title="Total Inventory"
      columns={[
        {
          field: "DESC",
          headerName: "Description",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "ITEMNUM",
          headerName: "Item Number",
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
          field: "LOTNUM",
          headerName: "Lot Number",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "QTYAVAIL",
          headerName: "Quantity Available",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "STOCKDATE",
          headerName: "Stock Date",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "VENDNAME",
          headerName: "Vendor Name",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "VENDORID",
          headerName: "Vendor ID",
          flex: 1,
          minWidth: 150,
        },
      ]}
      rows={data.map((obj) => ({ ...obj, id: obj.VENDNO + obj.ITEMNO }))}
    />
  );
}
