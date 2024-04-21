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
          ...options,
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
    setInput(searchValue);
  };

  return (
    <div className="admin_page">
      <Typography variant="h4" className="new_user_heading" color="#fff">
        Search for Purchase Order
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Input
          type="text"
          placeholder="Enter PO Number"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch} disabled={loading}>Search</Button>
      </Box>
      {!loading && !error && (
        <Tables title="Purchase Order:" rows={data} />
      )}
      {!loading && (error || data?.length === 0) && (
        <Typography variant="h5" style={{ color: "#FFF" }}>
          Purchase Order Not Found
        </Typography>
      )}
    </div>
  );
}
