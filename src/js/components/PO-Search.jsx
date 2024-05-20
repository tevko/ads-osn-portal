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
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const { data: poData } = useFetch(`${window.API_BASE_URL}/purchase-orders`);
  const { data: receiptData } = useFetch(`${window.API_BASE_URL}/receipts`);
  const { data: transferData } = useFetch(`${window.API_BASE_URL}/transfers`);
  const { data: invoiceData } = useFetch(`${window.API_BASE_URL}/invoices`);

  useEffect(() => {
    if (input.length) {
      setLoading(true);
      setData({
        po: poData.filter(p => p.PONUMBER === input),
        rp: receiptData.filter(p => p.PONUMBER === input),
        tr: transferData.filter(p => p.PONUMBER === input),
        in: invoiceData.filter(p => p.PONUMBER === input)
      });
      setLoading(false);
    }
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
        setPos(pos.map(p => p.PONUMBER.trim()));
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
          onChange={(e) => setSearchValue(e.target.innerText)}
          renderInput={(params) => <TextField {...params} label="Search PO Number" />}
        />
        <Button variant="contained" onClick={handleSearch} disabled={loading} sx={{ ml: 3}}>Search</Button>
      </Box>
      {!loading && (
        <>
          <Tables
            title="Purchase Orders"
            columns={[
              {
                field: "VENDOR",
                headerName: "Vendor Code",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "NAME",
                headerName: "Vendor Name",
                flex: 1,
                minWidth: 150,
              },
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
                field: "UNIT",
                headerName: "Order Unit",
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
                headerName: "Quantity Canceled",
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
            ]}
            rows={data.po.map((obj) => ({ ...obj, id: obj.PONUMBER + obj.RCPNUMBER }))}
          />
          <Tables
            title="Receipts"
            columns={[
              {
                field: "LOCATION",
                headerName: "Location",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "PONUMBER",
                headerName: "PO Number",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "RCPUNIT",
                headerName: "UOM",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "RCPNUMBER",
                headerName: "Receipt Number",
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
                field: "VENDOR",
                headerName: "Vendor Code",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "NAME",
                headerName: "Vendor Name",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "ITEM",
                headerName: "Item Number",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "DESCRIPTION",
                headerName: "Item Description",
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
                field: "QTREC",
                headerName: "Quantity Received",
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
                field: "LOTNUM",
                headerName: "Lot Number",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "LOTQTY",
                headerName: "Lot Quantity",
                flex: 1,
                minWidth: 150,
              },
            ]}
            rows={data.rp.map((obj) => ({ ...obj, id: obj.PONUMBER + obj.RCPNUMBER }))}
          />
          <Tables
            title="Stock Transferred to Pulley"
            columns={[
              {
                field: "DOCNUM",
                headerName: "Document Number",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "TRANSDATE",
                headerName: "Transfer Date",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "UNIT",
                headerName: "UOM",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "VENDOR",
                headerName: "Vendor Code",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "NAME",
                headerName: "Vendor Name",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "ITEM",
                headerName: "Item Number",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "DESCRIPTION",
                headerName: "Item Description",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "TRANSFER FROM",
                headerName: "From Location",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "TRANSFER TO",
                headerName: "To Location",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "QTY TRANSFERRED",
                headerName: "Quantity",
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
                field: "TOTAL COST",
                headerName: "Total Cost",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "PONUMBER",
                headerName: "PO Number",
                flex: 1,
                minWidth: 150,
              },
            ]}
            rows={data.tr.map((obj) => ({ ...obj, id: obj.ITEMNO + obj.DOCNUM }))}
          />
          <Tables
            title="Invoices"
            columns={[
              {
                field: "VENDOR",
                headerName: "Vendor Code",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "NAME",
                headerName: "Vendor Name",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "UNIT",
                headerName: "UOM",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "PONUMBER",
                headerName: "PO Number",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "PODATE",
                headerName: "PO Date",
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
                field: "QTYORD",
                headerName: "Quantity Ordered",
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
                field: "LOTNUM",
                headerName: "Lot Number",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "QTYTRANS",
                headerName: "Quantity Transferred",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "TOTALTRANSCOST",
                headerName: "Total Transfer Cost",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "INVNUMBER",
                headerName: "Invoice Number",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "INVEXT",
                headerName: "Receipt Extended",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "DOCNBR",
                headerName: "Document Number",
                flex: 1,
                minWidth: 150,
              },
              {
                field: "PYMTAMNT",
                headerName: "Payment Amount",
                flex: 1,
                minWidth: 150,
              },
            ]}
            rows={data.in.map((obj) => ({ ...obj, id: obj.PONUMBER + obj.ITEMDESC }))}
          />
        </>
      )}
      {!loading && (error || data?.length === 0) && hasSearched && (
        <Typography variant="h5" style={{ color: "#FFF" }}>
          Purchase Order Not Found
        </Typography>
      )}
    </div>
  );
}
