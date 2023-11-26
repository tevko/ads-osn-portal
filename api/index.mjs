import "dotenv/config";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import sql from "mssql";
import cors from "cors";
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import bodyParser from "body-parser";

import routes from "./routes/index.mjs";

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: "MZF-SQL2",
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

const config2 = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: "ZZZTST",
  server: "MZF-SQL2",
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
const appPool2 = new sql.ConnectionPool(config2);

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-u68d-m8y.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://mzfweb2.adssglobal.net/api/",
  issuer: "https://dev-u68d-m8y.us.auth0.com/",
  algorithms: ["RS256"],
});

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

  // healthcheck endpoint
  app.get("/healthcheck", async (req, res) => {
    return res.status(200).json({ success: "true" });
  });

app.use(jwtCheck);

app.use(cors({ credentials: true, origin: true }));

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
  .then(() => {
    appPool2.connect().then((pool2) => {
      app.locals.db2 = pool2;
      console.log("Test DB Also connected")
    })
  })
  .catch((err) => {
    console.log(`Error connecting to SQL Server: ${err}`);
  });
