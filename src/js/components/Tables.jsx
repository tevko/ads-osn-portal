import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import columnsOne from "./data/Column";
import tableOne from "./data/Rows";

export default function Tables({ title, rows, columns }) {
  const [pageSize, setPageSize] = React.useState(25);
  return (
    <>
      <Typography variant="h5" style={{ color: "#383D41" }}>
        {title}
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
