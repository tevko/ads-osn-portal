const columnsOne = [
  {
    title: "Customer",
    cellStyle: {
      backgroundColor: "#039be5",
      color: "#FFF",
    },
    headerStyle: {
      backgroundColor: "#039be5",
    },
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
    filtering: true,
    filterPlaceholder: "Filter Date",
  },
];

export default columnsOne;
