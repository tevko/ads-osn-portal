import sql from "mssql";
import { getRoleFromJwt } from "./jwtValidator.mjs";

const getTableName = (scope) => {
  // table names will probably need to be changed
  switch (scope) {
    case "purchase-orders":
      return "[ZZZTST].[dbo].[View_PORTAL_1_POVIEW]";
    case "receipts":
      return "[ZZZTST].[dbo].[View_PORTAL__2_PORECEIPTS]";
    case "invoices":
      return "[ZZZTST].[dbo].[View_PORTAL_View_4_POTRANS_INVOICE_STATUS]";
    case "transfers":
      return "[ZZZTST].[dbo].[View_PORTAL__3_POTRANSFERS]";
    default:
      return null;
  }
};

//builds a query for SQL given a scope and a query param
const buildQuery = (scope, queryParam, role) => {
  console.log(role);
  let query = `SELECT * FROM ${getTableName(scope)}`;
  if (role !== "admin") {
    //query += ` WHERE VDCODE = '${role}'`;
    switch (scope) {
      case "purchase-orders":
        query += ` WHERE VENDNAME = '${role}'`;
        break;
      case "receipts":
        query += ` WHERE VDNAME = '${role}'`;
        break;
      case "invoices":
        query += ` WHERE VENDNAME = '${role}'`;
        break;
      case "transfers":
        query += ` WHERE VDNAME = '${role}'`;
        break;
      default:
        break;
    }
  }

  return query;
};

// returns data from SQL Server
export default async ({ scope, queryParam, pool, auth }) => {
  try {
    const { role } = await getRoleFromJwt(auth);
    const result = await pool.query(buildQuery(scope, queryParam, role));
    return result.recordset;
  } catch (error) {
    console.log(error);
    return { error: "There was a problem getting data" };
  }
};
