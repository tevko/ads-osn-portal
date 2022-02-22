export default (app) => {
  app.get("/purchase-orders", (req, res) => {
    return res.json({ message: "data for purchase from the API!" });
  });
  app.get("/receipts", (req, res) => {
    return res.json({ message: "data for receipts from the API!" });
  });
  app.get("/invoices", (req, res) => {
    return res.json({ message: "data for invoices from the API!" });
  });
  app.get("/transfers", (req, res) => {
    return res.json({ message: "data for transfers from the API!" });
  });
};
