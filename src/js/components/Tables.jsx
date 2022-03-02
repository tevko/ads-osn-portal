import * as React from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import columnsOne from "./data/Column";
import tableOne from "./data/Rows";

export default function Tables() {
  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGridPro
          rows={tableOne}
          columns={columnsOne}
          pageSize={5}
          disableExtendRowFullWidth={false}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </>
  );
}

//add download as csv
//add colummn resize

//remember different people see different things when they log on
//expand pages
//have previews and possible graphs on home page

/*  <div className="table_one">
      <DataGrid
        columns={columnsOne}
        rows={tableOne}
        autoHeight={true}
        options={{
          searchFieldVariant: "outlined",
          exportButton: true,
          exportallData: true,
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
          },
          grouping: true,
          columnsButton: true,
          paging: true,
          pageSizeOptions: [, 5, 10, 20, 50, 100, 10000],
          rowStyle: (data, index) =>
            index % 2 === 0 ? { background: "#E8F6FD" } : null,
        }}
        title="Open Purchase Orders"
      />
    </div> */
