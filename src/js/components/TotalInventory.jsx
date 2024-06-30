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
          field: "VENDNO",
          headerName: "Vendor Number",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "VENDOR NAME",
          headerName: "Vendor Name",
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
          field: "DESCRIPTION",
          headerName: "Description",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "LOTNUMBER",
          headerName: "Lot Number",
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
          field: "LOCATION",
          headerName: "Location",
          flex: 1,
          minWidth: 150,
        },
        {
          field: "QUANTITY",
          headerName: "Quantity",
          flex: 1,
          minWidth: 150,
        },
      ]}
      rows={data.map((obj) => ({ ...obj, id: obj.VENDNO + obj.ITEMNO }))}
    />
  );
}
