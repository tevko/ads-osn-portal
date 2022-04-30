import sql from "mssql";
import fetch from "node-fetch";

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
      return "[ZZZTST].[dbo].[View_PORTAL__3_POTRANSFERS_NEW]";
    case "user-types":
      return "[ZZZTST].[dbo].[View_PORTAL_VENDORS]";
    case "po-dashboard":
      return "[ZZZTST].[dbo].[View_PORTAL_DASHBOARD_ADMIN_POVIEW]";
    case "receipt-dashboard":
      return "[ZZZTST].[dbo].[View_PORTAL_DASHBOARD_ADMIN_PORECEIPTS]";
    case "transfer-dashboard":
      return "[ZZZTST].[dbo].[View_PORTAL_DASHBOARD_ADMIN_POTRANSFERS]";
    case "invoice-dashboard":
      return "[ZZZTST].[dbo].[View_PORTAL_DASHBOARD_ADMIN_INVOICESTATUS]";
    default:
      return null;
  }
};

//builds a query for SQL given a scope and a query param
const buildQuery = (scope, queryParam, role) => {
  let query = `SELECT * FROM ${getTableName(scope)}`;
  if (role !== "Admin" && scope !== "user-types") {
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

  console.log({ msg: "the query is", query });

  return query;
};

// returns data from SQL Server
export const getData = async ({ scope, queryParam, pool, auth }) => {
  try {
    const { role } = await getRoleFromJwt(auth);
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
      email
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

export const changeUserPassword = async (id, password, auth) => {
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
        password,
      }),
    }
  );
  const user = await userCall.json();
  return user;
};
