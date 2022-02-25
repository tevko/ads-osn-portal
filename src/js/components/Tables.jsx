import react from "react";
import MaterialTable from "material-table";
import columnsOne from "./data/Column";
import tableOne from "./data/Rows";

export default function Example() {
  return (
    <div className="table_one">
      <MaterialTable
        columns={columnsOne}
        data={tableOne}
        options={{
          searchFieldVariant: "outlined",
          filtering: "true",
          exportButton: true,
          exportallData: true,
          rowStyle: (data, index) =>
            index % 2 === 0 ? { background: "#EEFBFB" } : null,
        }}
        title="Open Purchase Orders"
      />
    </div>
  );
}

//remember different people see different things when they log on
//expand pages
//have previews and possible graphs on home page
