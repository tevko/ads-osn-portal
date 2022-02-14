export default (app) => {
  app.get("/purchase-orders", (req, res) => {
    return res.json({ message: "route for purchase orders" });
  });
  app.get("/receipts", (req, res) => {
    return res.json({ message: "route for receipts" });
  });
  app.get("/invoices", (req, res) => {
    return res.json({ message: "route for invoices" });
  });
  app.get("/transfers", (req, res) => {
    return res.json({ message: "route for transfers" });
  });
};
