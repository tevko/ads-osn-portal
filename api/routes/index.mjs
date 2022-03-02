export default (app) => {
  app.get("/api/purchase-orders", (req, res) => {
    return res.json({ message: "data for purchase from the API!" });
  });
  app.get("/api/receipts", (req, res) => {
    return res.json({ message: "data for receipts from the API!" });
  });
  app.get("/api/invoices", (req, res) => {
    return res.json({ message: "data for invoices from the API!" });
  });
  app.get("/api/transfers", (req, res) => {
    return res.json({ message: "data for transfers from the API!" });
  });
};
