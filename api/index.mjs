import "dotenv/config";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import sql from "mssql";
import cors from "cors";

import routes from "./routes/index.mjs";

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: "localhost\\MZF-SQL2",
  parseJSON: true,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // true for azure
    trustServerCertificate: true,
  },
};

const appPool = new sql.ConnectionPool(config);

// const checkJwt = auth({
//   audience: 'YOUR_API_IDENTIFIER',
//   issuerBaseURL: `https://YOUR_DOMAIN/`,
// });

// https://auth0.com/docs/quickstart/backend/nodejs/01-authorization

// need to extract user ID from JWT

const app = express();

app.use(cors({ credentials: true, origin: true }));

// app.use(checkJwt);

app.use(express.json());

routes(app);

appPool
  .connect()
  .then((pool) => {
    console.log("Connected to SQL Server");
    app.locals.db = pool;
    const PORT = 3000;

    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error connecting to SQL Server: ${err}`);
  });
