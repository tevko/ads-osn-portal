import * as React from "react";
import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import columnsOne from "./data/Column";
import rowsOne from "./data/Rows";

export default function Tables() {
  const [pageSize, setPageSize] = React.useState(25);
  const [rows, setRows] = useState(rowsOne);
  const [columns, setColumns] = useState(columnsOne);

  return (
    <>
      <Typography variant="h5" style={{ color: "#383D41" }}>
        Open Purchase Orders
      </Typography>
      <div style={{ height: 680, width: "100%" }}>
        <DataGrid
          autoheight
          rows={rows}
          columns={columns}
          disableExtendRowFullWidth={false}
          checkboxSelection
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[25, 50, 100]}
          pagination
          scroll
        />
      </div>
    </>
  );
}
