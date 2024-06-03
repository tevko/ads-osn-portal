import sql from "mssql";
import fetch from "node-fetch";
import atob from "atob";

import { getRoleFromJwt } from "./jwtValidator.mjs";

const getTableName = (scope) => {
  // table names will probably need to be changed
  switch (scope) {
    case "purchase-orders":
      return "[PSSCOM].[dbo].[View_PORTAL_1_POVIEW]";
    case "receipts":
      return "[PSSCOM].[dbo].[View_PORTAL__2_PORECEIPTS]";
    case "invoices":
      return "[PSSCOM].[dbo].[View_PORTAL_View_4_POTRANS_INVOICE_STATUS]" ;
    case "allergens":
      return "[PSSCOM].[dbo].[View_ALLERGENS]";
    case "transfers":
      return "[PSSCOM].[dbo].[View_PORTAL__3_POTRANSFERS_NEW]";
    case "user-types":
      return "[PSSCOM].[dbo].[View_PORTAL_VENDORS]";
    case "po-dashboard":
      return "[PSSCOM].[dbo].[View_PORTAL_DASHBOARD_ADMIN_POVIEW]";
    case "receipt-dashboard":
      return "[PSSCOM].[dbo].[View_PORTAL_DASHBOARD_ADMIN_PORECEIPTS]";
    case "transfer-dashboard":
      return "[PSSCOM].[dbo].[View_PORTAL_DASHBOARD_ADMIN_POTRANSFERS]";
    case "invoice-dashboard":
      return "[PSSCOM].[dbo].[View_PORTAL_DASHBOARD_ADMIN_INVOICESTATUS]";
    case "vmi-inventory":
      return "[PSSCOM].[dbo].[View_PORTAL_5_QTYINVMI]";
    case "production-schedule":
      return "[PSSCOM].[dbo].[FRCST_MAIN]";
    default:
      return null;
  }
};

function validateRolePO(role, po) {
  // Regular expressions for validation
  const roleRegex = /^[a-zA-Z0-9 .&,\-_]*$/; // Allow common company name symbols
  const poRegex = /^PO[a-zA-Z0-9]+$/; // Only alphanumeric after "PO"

  // Validate role
  if (!roleRegex.test(role)) {
    return false;
  }

  if (po) {
    // Validate PO number
    return poRegex.test(po);
  }
  return true;
}

const POSearchQuery = (role, po) => {
  if (validateRolePO(role, po)) {
    return role === "Admin" ? `SELECT * FROM [PSSCOM].[dbo].[View_PORTAL_PO_SEARCH] WHERE PONUMBER = '${po}'` : `SELECT h.PONUMBER, h.DATE, l.ITEMNO, l.ITEMDESC, l.LOCATION, l.ORDERUNIT, l.OQORDERED, l.OQRECEIVED, l.OQCANCELED, l.OQOUTSTAND, l.UNITCOST, l.EXTENDED, c.RCPNUMBER
  FROM [PSSCOM].[dbo].[POPORH1] h
  INNER JOIN [PSSCOM].[dbo].[POPORL] l ON h.PORHSEQ = l.PORHSEQ
  INNER JOIN [PSSCOM].[dbo].[PORCPH1] c ON h.PONUMBER = c.PONUMBER
  WHERE h.PONUMBER = '${po}' AND h.VDNAME = '${role}';`
  }
};

const POSQuery = (role) => {
  if (validateRolePO(role)) {
    return role === "Admin" ? `SELECT PONUMBER FROM [PSSCOM].[dbo].[View_PORTAL_1_POVIEW]` : `SELECT PONUMBER FROM [PSSCOM].[dbo].[View_PORTAL_1_POVIEW] WHERE VENDOR = '${role}'`
  }
};

//builds a query for SQL given a scope and a query param
const buildQuery = (scope, queryParam, role) => {
  let query = `SELECT * FROM ${getTableName(scope)}`;
  if (scope === "po-search") query = POSearchQuery(role, queryParam.ponumber);
  if (scope === "pos") query = POSQuery(role);
  if (role !== "Admin" && scope !== "user-types") {
    switch (scope) {
      case "purchase-orders":
        query += ` WHERE NAME = '${role}'`;
        break;
      case "receipts":
        query += ` WHERE NAME = '${role}'`;
        break;
      case "invoices":
        query += ` WHERE NAME = '${role}'`;
        break;
      case "transfers":
        query += ` WHERE NAME = '${role}'`;
        break;
      case "vmi-inventory":
        query += ` WHERE [VENDOR NAME] = '${role}'`;
      default:
        break;
    }
  }

  console.log({ msg: "the query is", query });

  return query;
};

// returns data from SQL Server
export const getData = async ({ scope, queryParam, pool, auth }) => {
  try {
    const { role } = await getRoleFromJwt(auth);
    if (role[0] !== "Admin") {
      if (role[0] === "prod_schedule_viewer" && scope !== "production-schedule" || (scope === "production-schedule" && role[0] !== "prod_schedule_viewer")) {
        return { error: "Unauthorized" }
      }
    }
    const result = await pool.query(buildQuery(scope, queryParam, role[0]));
    return result.recordset;
  } catch (error) {
    console.log(error);
    return { error: "There was a problem getting data" };
  }
};

export const createUser = async (body, auth) => {
  const { role } = await getRoleFromJwt(auth);
  if (role[0] !== "Admin") {
    return { status: 401, error: "Permission denied." };
  }
  const details = body;
  const tokenCall = await fetch(
    `https://dev-u68d-m8y.us.auth0.com/oauth/token`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        client_id: "82IZBvXseWGlLdlskzJOLqFgkYTXKOWb",
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: "https://dev-u68d-m8y.us.auth0.com/api/v2/",
        grant_type: "client_credentials",
      }),
    }
  );
  const { access_token } = await tokenCall.json();
  const userCall = await fetch(
    `https://dev-u68d-m8y.us.auth0.com/api/v2/users`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        connection: "Username-Password-Authentication",
        email: details.email,
        password: details.password,
        app_metadata: {
          authorization: {
            groups: [],
            roles: [details.userRole],
            permissions: [],
          },
        },
      }),
    }
  );
  const user = await userCall.json();
  return user;
};

export const getAllUsers = async (auth) => {
  const { role } = await getRoleFromJwt(auth);
  if (role[0] !== "Admin") {
    return { status: 401, error: "Permission denied." };
  }
  const tokenCall = await fetch(
    `https://dev-u68d-m8y.us.auth0.com/oauth/token`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        client_id: "82IZBvXseWGlLdlskzJOLqFgkYTXKOWb",
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: "https://dev-u68d-m8y.us.auth0.com/api/v2/",
        grant_type: "client_credentials",
      }),
    }
  );
  const { access_token } = await tokenCall.json();
  const usersData = await fetch(
    `https://dev-u68d-m8y.us.auth0.com/api/v2/users`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const users = await usersData.json();
  return users;
};

export const getUser = async (auth, email) => {
  const { role } = await getRoleFromJwt(auth);
  const tokenCall = await fetch(
    `https://dev-u68d-m8y.us.auth0.com/oauth/token`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        client_id: "82IZBvXseWGlLdlskzJOLqFgkYTXKOWb",
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: "https://dev-u68d-m8y.us.auth0.com/api/v2/",
        grant_type: "client_credentials",
      }),
    }
  );
  const { access_token } = await tokenCall.json();
  const usersData = await fetch(
    `https://dev-u68d-m8y.us.auth0.com/api/v2/users-by-email?email=${encodeURIComponent(
      atob(email)
    )}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const users = await usersData.json();
  if (
    users.find((user) => user.app_metadata?.authorization?.roles[0] === role[0])
  ) {
    return users;
  } else {
    return { status: 401, error: "Permission denied." };
  }
};

export const deleteUser = async (id, auth) => {
  const { role } = await getRoleFromJwt(auth);
  if (role[0] !== "Admin") {
    return { status: 401, error: "Permission denied." };
  }
  const tokenCall = await fetch(
    `https://dev-u68d-m8y.us.auth0.com/oauth/token`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        client_id: "82IZBvXseWGlLdlskzJOLqFgkYTXKOWb",
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: "https://dev-u68d-m8y.us.auth0.com/api/v2/",
        grant_type: "client_credentials",
      }),
    }
  );
  const { access_token } = await tokenCall.json();
  const userCall = await fetch(
    `https://dev-u68d-m8y.us.auth0.com/api/v2/users/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return {
    status: userCall.status,
    error:
      userCall.status > 204
        ? "There was an error deleting this user, please try again."
        : null,
  };
};

export const changeUserEmail = async (id, email, auth) => {
  const { role } = await getRoleFromJwt(auth);
  if (role[0] !== "Admin") {
    return { status: 401, error: "Permission denied." };
  }
  const tokenCall = await fetch(
    `https://dev-u68d-m8y.us.auth0.com/oauth/token`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        client_id: "82IZBvXseWGlLdlskzJOLqFgkYTXKOWb",
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: "https://dev-u68d-m8y.us.auth0.com/api/v2/",
        grant_type: "client_credentials",
      }),
    }
  );
  const { access_token } = await tokenCall.json();
  const userCall = await fetch(
    `https://dev-u68d-m8y.us.auth0.com/api/v2/users/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    }
  );
  const user = await userCall.json();
  return user;
};

export const changeUserPassword = async (id, password, auth, email) => {
  const [requestingUser] = email ? await getUser(auth, email) : [undefined];
  const { role } = await getRoleFromJwt(auth);
  if (
    role[0] !== "Admin" &&
    requestingUser &&
    requestingUser.app_metadata.authorization.roles[0] !== role[0]
  ) {
    // user must be admin OR requesting to change their own password
    return { status: 401, error: "Permission denied." };
  }
  const tokenCall = await fetch(
    `https://dev-u68d-m8y.us.auth0.com/oauth/token`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        client_id: "82IZBvXseWGlLdlskzJOLqFgkYTXKOWb",
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: "https://dev-u68d-m8y.us.auth0.com/api/v2/",
        grant_type: "client_credentials",
      }),
    }
  );
  const { access_token } = await tokenCall.json();
  const userCall = await fetch(
    `https://dev-u68d-m8y.us.auth0.com/api/v2/users/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    }
  );
  const user = await userCall.json();
  return user;
};
