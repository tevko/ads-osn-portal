import sql from "mssql";

const getTableName = (scope) => {
  // table names will probably need to be changed
  switch (scope) {
    case "purchase-orders":
      return "[ZZZTST].[dbo].[View_PORTAL_1_POVIEW]";
    case "receipts":
      return "[ZZZTST].[dbo].[View_PORTAL__2_PORECEIPTS]";
    case "invoices":
      return "[ZZZTST].[dbo].[View_4_POTRANS_INVOICE_STATUS]";
    case "transfers":
      return "[ZZZTST].[dbo].[View_PORTAL__3_POTRANSFERS]";
    default:
      return null;
  }
};

//builds a query for SQL given a scope and a query param
const buildQuery = (scope, queryParam) => {
  let query = `SELECT * FROM ${getTableName(scope)}`;
  if (queryParam.id) {
    //query += ` WHERE VDCODE = '${queryParam.id}'`;
  }
  // more clauses will be added here including pagination
  return query;
};

// returns data from SQL Server
export default async ({ scope, queryParam, pool }) => {
  try {
    const result = await pool.query(buildQuery(scope, queryParam));
    return result.recordset;
  } catch (error) {
    console.log(error);
    return { error: "There was a problem getting data" };
  }
};
