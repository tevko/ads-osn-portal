import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import columnsOne from "./data/Column";
import tableOne from "./data/Rows";

export default function Tables() {
  const [pageSize, setPageSize] = React.useState(10);
  return (
    <>
      <div style={{ height: 680, width: "100%" }}>
        <DataGrid
          autoheight
          rows={tableOne}
          columns={columnsOne}
          pageSize={5}
          disableExtendRowFullWidth={false}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          scroll
        />
      </div>
    </>
  );
}
