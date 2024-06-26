import {
  getData,
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  changeUserEmail,
  changeUserPassword,
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
  app.get("/production-schedule", async (req, res) => {
    const data = await getData({
      scope: "production-schedule",
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
  app.get("/allergens", async (req, res) => {
    const data = await getData({
      scope: "allergens",
      queryParam: req.query,
      pool: app.locals.db,
      auth: req.headers.authorization,
    });
    return res.status(data.error ? 500 : 200).json(data);
  });
  app.get("/vmi-inventory", async (req, res) => {
    const data = await getData({
      scope: "vmi-inventory",
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
  app.get("/total-inventory", async (req, res) => {
    const data = await getData({
      scope: "total-inventory",
      queryParam: req.query,
      pool: app.locals.db,
      auth: req.headers.authorization,
    });
    return res.status(data.error ? 500 : 200).json(data);
  });
  app.get("/po-search", async (req, res) => {
    const data = await getData({
      scope: "po-search",
      queryParam: req.query,
      pool: app.locals.db,
      auth: req.headers.authorization,
    });
    return res.status(data.error ? 500 : 200).json(data);
  });
  app.get("/pos", async (req, res) => {
    const data = await getData({
      scope: "pos",
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
  app.put("/update-user-email/:id", async (req, res) => {
    if (!req.body.email || !req.params.id) {
      return res.status(400).json({ error: "Missing params" });
    }
    const response = await changeUserEmail(
      req.params.id,
      req.body.email,
      req.headers.authorization
    );
    return res.status(response.error ? 500 : 200).json(response);
  });
  // put change password
  app.put("/update-user-password/:id/:email", async (req, res) => {
    if (!req.body.password || !req.params.id) {
      return res.status(400).json({ error: "Missing params" });
    }
    const response = await changeUserPassword(
      req.params.id,
      req.body.password,
      req.headers.authorization,
      req.params.email
    );
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
  app.get("/user/:email", async (req, res) => {
    // get full url with email and log to console
    console.log(req.url);
    if (!req.params.email) {
      return res.status(400).json({ error: "Missing params" });
    }
    const user = await getUser(req.headers.authorization, req.params.email);
    return res.status(200).json(user);
  });
};
