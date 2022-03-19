import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columnsTwo = [
  {
    field: "poNumber",
    headerName: "PO Number",
    flex: 1,
  },
  {
    field: "transferNum",
    headerName: "Transfer Number",
    flex: 1,
  },
  {
    field: "itemNumber",
    headerName: "Item Number",
    flex: 1,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
  },
  {
    field: "quantTrans",
    headerName: "Quantity Transferred",
    flex: 1,
  },
  {
    field: "uom",
    headerName: "UOM",
    flex: 1,
  },
  {
    field: "lotNumber",
    headerName: "Lot Number",
    flex: 1,
  },
];

const rowsTwo = [
  {
    id: 1,
    poNumber: "00005465",
    transferNum: "000123",
    itemNumber: "test-5465",
    description: "Himalayan mountain salt",
    quantTrans: "9500",
    uom: "g",
    lotNumber: "ABC00012345",
  },
  {
    id: 2,
    poNumber: "00007891",
    transferNum: "000781",
    itemNumber: "test-8790",
    description: "packaging",
    quantTrans: "500",
    uom: "EA",
    lotNumber: "ABC00012346",
  },
  {
    id: 3,
    poNumber: "00004517",
    transferNum: "000283",
    itemNumber: "test-9581",
    description: "Potatoes",
    quantTrans: "589",
    uom: "lbs",
    lotNumber: "ABC00012347",
  },
  {
    id: 4,
    poNumber: "00009264",
    transferNum: "000537",
    itemNumber: "test-3254",
    description: "BBQ Seasons",
    quantTrans: "98810",
    uom: "g",
    lotNumber: "ABC00012348",
  },
  {
    id: 5,
    poNumber: "00007925",
    transferNum: "000975",
    itemNumber: "test-1257",
    description: "Vegetable Oil",
    quantTrans: "375",
    uom: "Lt",
    lotNumber: "ABC00012349",
  },
  {
    id: 6,
    poNumber: "00001595",
    transferNum: "000541",
    itemNumber: "test-5558",
    description: "Sour cream seasoning",
    quantTrans: "8415",
    uom: "g",
    lotNumber: "ABC00012350",
  },
  {
    id: 7,
    poNumber: "00001852",
    transferNum: "000481",
    itemNumber: "test-9841",
    description: "Garlic Powder",
    quantTrans: "8190",
    uom: "g",
    lotNumber: "ABC00012351",
  },
  {
    id: 8,
    poNumber: "00005181",
    transferNum: "0003325",
    itemNumber: "test-7781",
    description: "Paper bags",
    quantTrans: "9181",
    uom: "EA",
    lotNumber: "ABC00012352",
  },
  {
    id: 9,
    poNumber: "00004158",
    transferNum: "000369",
    itemNumber: "test-1595",
    description: "Olive Oil",
    quantTrans: "230",
    uom: "Lt",
    lotNumber: "ABC00012353",
  },
  {
    id: 10,
    poNumber: "00005465",
    transferNum: "000123",
    itemNumber: "test-5465",
    description: "Onions",
    quantTrans: "51",
    uom: "lbs",
    lotNumber: "ABC00012354",
  },
];

export default function Home() {
  const [pageSize, setPageSize] = React.useState(10);
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        autoheight
        rows={rowsTwo}
        columns={columnsTwo}
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
  );
}
