import sql from "mssql";

const getTableName = (scope) => {
  // table names will probably need to be changed
  switch (scope) {
    case "purchase-orders":
      return "PurchaseOrders";
    case "receipts":
      return "Receipts";
    case "invoices":
      return "Invoices";
    case "transfers":
      return "Transfers";
    default:
      return null;
  }
};

//builds a query for SQL given a scope and a query param
const buildQuery = (scope, queryParam) => {
  let query = `SELECT * FROM ${getTableName(scope)}`;
  if (queryParam.id) {
    query += ` WHERE id = ${queryParam.id}`;
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
