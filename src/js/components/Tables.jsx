import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import columnsOne from "./data/Column";
import tableOne from "./data/Rows";

export default function Tables() {
  const [pageSize, setPageSize] = React.useState(25);
  return (
    <>
      <div style={{ height: 680, width: "100%" }}>
        <DataGrid
          autoheight
          rows={tableOne}
          columns={columnsOne}
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
