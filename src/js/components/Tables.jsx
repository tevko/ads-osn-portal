import react from "react";
import MaterialTable from "material-table";

export default function Example() {
  const tableOne = [
    {
      customer: "Paul",
      poNumber: "688",
      itemNumber: "321",
      description: "Probably chips",
      quantity: "6841",
      uom: "EA",
      date: new Date(2022, 12, 1),
    },
    {
      customer: "Steve",
      poNumber: "324",
      itemNumber: "846",
      description: "Plasty bags",
      quantity: "10000000",
      uom: "EA",
      date: new Date(2022, 5, 7),
    },
    {
      customer: "Jim",
      poNumber: "813",
      itemNumber: "321",
      description: "Different Item",
      quantity: "5854",
      uom: "EA",
      date: new Date(2022, 8, 19),
    },
    {
      customer: "Vanessa",
      poNumber: "835",
      itemNumber: "234",
      description: "ingredients",
      quantity: "6168",
      uom: "EA",
      date: new Date(2022, 11, 1),
    },
    {
      customer: "Steve",
      poNumber: "835",
      itemNumber: "234",
      description: "supplies",
      quantity: "6168",
      uom: "EA",
      date: new Date(2022, 4, 11),
    },
    {
      customer: "Leah",
      poNumber: "835",
      itemNumber: "234",
      description: "shovels",
      quantity: "6168",
      uom: "EA",
      date: new Date(2023, 1, 1),
    },
  ];

  const columnsOne = [
    {
      title: "Customer",
      field: "customer",
      filterPlaceholder: "Filter Customer",
    },
    { title: "Po Number", field: "poNumber", filterPlaceholder: "Filter PO" },
    {
      title: "Item Number",
      field: "itemNumber",
      filterPlaceholder: "Filter Item",
    },
    {
      title: "Description",
      field: "description",
      filterPlaceholder: "Filter Description",
    },
    {
      title: "Quantity",
      field: "quantity",
      filterPlaceholder: "Filter Quantity",
    },
    { title: "Unit of Measure", field: "uom", filterPlaceholder: "Filter UOM" },
    {
      title: "Due Date",
      field: "date",
      type: "date",
      filterPlaceholder: "Filter Date",
    },
  ];

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
        }}
        title="Open Purchase Orders"
      />
    </div>
  );
}

//remember different people see different things when they log on
