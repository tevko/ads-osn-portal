import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

export default function Tables({
  title,
  rows = [],
  columns = [],
  getRowId = (row) => row.id,
}) {
  const [pageSize, setPageSize] = React.useState(10);
  return (
    <>
      <Typography variant="h5" style={{ color: "#FFF" }}>
        {title}
      </Typography>
      <div style={{ minHeight: 600, width: "100%", height: "80vh" }}>
        <DataGrid
          autoheight={false}
          getRowId={getRowId}
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
