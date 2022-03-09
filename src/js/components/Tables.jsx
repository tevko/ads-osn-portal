import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

export default function Tables({ gridTitle, rows, columns }) {
  const [pageSize, setPageSize] = React.useState(10);

  return (
    <>
      <Typography variant="h5" style={{ color: "#383D41" }}>
        {gridTitle}
      </Typography>
      <div style={{ height: 600, width: "100%" }}>
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
          rowsPerPageOptions={[10, 15, 20]}
          pagination
          scroll
        />
      </div>
    </>
  );
}

//need resizable columns -- dataGridPro -- monthly fee
//style table
//add homepage dashboard UI
