import getData from "../services/index.mjs";

export default (app) => {
  app.get("/purchase-orders", async (req, res) => {
    const data = await getData({
      scope: "purchase-orders",
      queryParam: req.query,
      pool: app.locals.db,
      auth: req.headers.authorization,
    });
    return res.status(data.error ? 500 : 200).json(data);
  });
  app.get("/receipts", async (req, res) => {
    const data = await getData({
      scope: "receipts",
      queryParam: req.query,
      pool: app.locals.db,
      auth: req.headers.authorization,
    });
    return res.status(data.error ? 500 : 200).json(data);
  });
  app.get("/invoices", async (req, res) => {
    const data = await getData({
      scope: "invoices",
      queryParam: req.query,
      pool: app.locals.db,
      auth: req.headers.authorization,
    });
    return res.status(data.error ? 500 : 200).json(data);
  });
  app.get("/transfers", async (req, res) => {
    const data = await getData({
      scope: "transfers",
      queryParam: req.query,
      pool: app.locals.db,
      auth: req.headers.authorization,
    });
    return res.status(data.error ? 500 : 200).json(data);
  });
};
