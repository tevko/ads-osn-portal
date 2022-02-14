import express from "express";
import routes from "./routes/index.mjs";

const app = express();

app.use(express.json());

app.use(routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
