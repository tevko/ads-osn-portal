import React, { useState, useEffect } from "react";
import { Button, Typography, Input, Box } from "@mui/material";
import useFetch from "../hooks/useFetch";
import Tables from "./Tables";

export default function POSearch() {
  const [input, setInput] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // fetch with authorization header
        const result = await fetch(`${window.API_BASE_URL}/po-search?ponumber=${input}`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_A_C_T_")}`,
          },
        });
        const json = await result.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [input]);

  const handleSearch = () => {
    setHasSearched(true);
    setInput(searchValue);
  };

  return (
    <div className="admin_page">
      <Typography variant="h4" className="new_user_heading" color="#fff">
        Search for Purchase Order
      </Typography>
      <Box sx={{ display: "flex", mt: 3, mb: 3 }}>
        <Input
          type="text"
          placeholder="Enter PO Number"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch} disabled={loading} sx={{ ml: 3}}>Search</Button>
      </Box>
      {!loading && !error && data?.length > 0 && (
        <Tables
          title="Purchase Order:"
          rows={data.map(o => ({ ...o, id: o.PONUMBER }))}
          columns={[
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
              headerName: "Quantity Cancelled",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "OQOUTSTANDD",
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
            {
              field: "RCPNUMBER",
              headerName: "RCP Number",
              flex: 1,
              minWidth: 150,
            },
          ]}
        />
      )}
      {!loading && (error || data?.length === 0) && hasSearched && (
        <Typography variant="h5" style={{ color: "#FFF" }}>
          Purchase Order Not Found
        </Typography>
      )}
    </div>
  );
}
