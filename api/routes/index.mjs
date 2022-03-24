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
  // get current users from auth0
  // app.get("/users", async (req, res) => {
  //   const auth0 = app.locals.auth0;
  //   const data = await auth0.getUser({
  //     access_token: req.headers.authorization,

  // });
  // create user in auth0
  // app.post("/users", async (req, res) => {
  // get auth0 management API
  // const auth0 = app.locals.auth0;
  // create user in auth0
  // const data = await auth0.users.create({
  //   connection: "Username-Password-Authentication",
  //   email: req.body.email,
  //   password: req.body.password,
  //   user_metadata: {
  //     role: req.body.role,
  //   },
  // });
  // });
  // get available user types based on DB data
  app.get("/user-types", async (req, res) => {
    const data = await getData({
      scope: "user-types",
      queryParam: req.query,
      pool: app.locals.db,
      auth: req.headers.authorization,
    });
    return res.status(data.error ? 500 : 200).json(data);
  });
};
