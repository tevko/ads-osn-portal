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
    </div>
  );
}

//remember different people see different things when they log on
//expand pages
//have previews and possible graphs on home page
