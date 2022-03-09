import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

//import { Typography } from "@mui/material";

export default function Tables() {
  const [pageSize, setPageSize] = React.useState(10);

  const [columnsData, setColumnsData] = useState(columnsOne);
  const [rowsData, setRowsData] = useState(rowsOne);

  return (
    <>
      {/* <Typography variant="h5" style={{ color: "#383D41" }}>
        {gridTitle}
      </Typography> */}
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          autoheight
          rows={rowsData}
          columns={columnsData}
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
