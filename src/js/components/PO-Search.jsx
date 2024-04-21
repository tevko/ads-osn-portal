import React, { useState, useEffect } from "react";
import { Button, Typography, Input } from "@mui/material";
import useFetch from "../hooks/useFetch";
import Tables from "./Tables";

export default function POSearch() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState({ loading: true });

  useEffect(() => {
    if (input.length) {
      const { data, error, loading } = useFetch(`${window.API_BASE_URL}/po-search?ponumber=${input}`);
      setResults({ data, error, loading });
    }
  }, [input]);

  const handleSearch = () => {
    setInput(input);
  };

  return (
    <div className="admin_page">
      <Typography variant="h4" className="new_user_heading" color="#fff">
        Search for Purchase Order
      </Typography>
      <Input
        type="text"
        placeholder="Enter PO Number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch} disabled={results.loading}>Search</Button>
      {!results.loading && !results.error && (
        <Tables title="Purchase Order:" rows={results.data} />
      )}
      {!results.loading && (results.error || results.data?.length === 0) (
        <Typography variant="h5" style={{ color: "#FFF" }}>
          Purchase Order Not Found
        </Typography>
      )}
    </div>
  );
}
