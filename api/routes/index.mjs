import {
  getData,
  createUser,
  getAllUsers,
  deleteUser,
} from "../services/index.mjs";

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
  app.get("/users", async (req, res) => {
    const users = await getAllUsers(req.headers.authorization);
    return res.status(200).json(users);
  });
  app.post("/create-user", async (req, res) => {
    const response = await createUser(req.body, req.headers.authorization);
    return res.status(response.error ? 500 : 200).json(response);
  });
  app.delete("/delete-user/:id", async (req, res) => {
    const response = await deleteUser(req.params.id, req.headers.authorization);
    return res.status(response.error ? 500 : 200).json(response);
  });
  app.get("/user-types", async (req, res) => {
    const data = await getData({
      scope: "user-types",
      queryParam: req.query,
      pool: app.locals.db,
      auth: req.headers.authorization,
    });
    return res.status(data.error ? 500 : 200).json(data);
  });
  app.get("/dashboard", async (req, res) => {
    const data = await Promise.all([
      getData({
        scope: "po-dashboard",
        queryParam: req.query,
        pool: app.locals.db,
        auth: req.headers.authorization,
      }),
      getData({
        scope: "receipt-dashboard",
        queryParam: req.query,
        pool: app.locals.db,
        auth: req.headers.authorization,
      }),
      getData({
        scope: "transfer-dashboard",
        queryParam: req.query,
        pool: app.locals.db,
        auth: req.headers.authorization,
      }),
      getData({
        scope: "invoice-dashboard",
        queryParam: req.query,
        pool: app.locals.db,
        auth: req.headers.authorization,
      }),
    ]);
    const [po, receipt, transfer, invoice] = data;
    return res.status(200).json({
      po,
      receipt,
      transfer,
      invoice,
    });
  });
};
