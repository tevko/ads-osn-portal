import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import columnsOne from "./data/Column";
import tableOne from "./data/Rows";

export default function Tables() {
  const [pageSize, setPageSize] = React.useState(5);
  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
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
        />
      </div>
    </>
  );
}

//data grid filters show without hovering
//add tool bar
//style tables
//add download as csv
//add colummn resize

//remember different people see different things when they log on
//expand pages
//have previews and possible graphs on home page
