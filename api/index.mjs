import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import routes from "./routes/index.mjs";

// const checkJwt = auth({
//   audience: 'YOUR_API_IDENTIFIER',
//   issuerBaseURL: `https://YOUR_DOMAIN/`,
// });

const app = express();

// app.use(checkJwt);

app.use(express.json());

routes(app);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
