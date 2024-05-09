import React, { useState, useEffect } from "react";
import { Button, Typography, Input, Box, Autocomplete, TextField } from "@mui/material";
import useFetch from "../hooks/useFetch";
import Tables from "./Tables";

export default function POSearch() {
  const [input, setInput] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState(null);
  const [pos, setPos] = useState(null);
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

  useEffect(() => {
    async function fetchData() {
      try {
        const r = await fetch(`${window.API_BASE_URL}/pos`, {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_A_C_T_")}`,
          },
        });
        const pos = await r.json();
        setPOs(pos);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={pos}
          sx={{ width: 300 }}
          onChange={(e) => setSearchValue(e.target.value)}
          renderInput={(params) => <TextField {...params} label="Search PO Number" />}
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
              field: "RCPTDATE",
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
              field: "UNIT",
              headerName: "Order Unit",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "EXTRCPT",
              headerName: "EXTRCPT",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "LOTNUM",
              headerName: "LOTNUM",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "LOTQTY",
              headerName: "LOTQTY",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "RCPUNIT",
              headerName: "RCPUNIT",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "VENDOR",
              headerName: "VENDOR",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "TRANSDATE",
              headerName: "TRANSDATE",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "INVOICED",
              headerName: "INVOICED",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "QTY TRANSFERRED",
              headerName: "QTY TRANSFERRED",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "TRANSFER TO",
              headerName: "TRANSFER TO",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "TRANSFER FROM",
              headerName: "TRANSFER FROM",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "PYMTAMNT",
              headerName: "PYMTAMNT",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "DOCNBR",
              headerName: "DOCNBR",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "INVEXT",
              headerName: "INVEXT",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "TOTALTRANSCOST",
              headerName: "TOTALTRANSCOST",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "INVNUMBER",
              headerName: "INVNUMBER",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "QTYTRANS",
              headerName: "QTYTRANS",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "TRANSFERNO",
              headerName: "TRANSFERNO",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "QTYORD",
              headerName: "Quantity Ordered",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "QTYREC",
              headerName: "Quantity Received",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "QTYCXL",
              headerName: "Quantity Cancelled",
              flex: 1,
              minWidth: 150,
            },
            {
              field: "QTY OS",
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
