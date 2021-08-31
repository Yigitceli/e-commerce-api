const orderRouter = require("express").Router();
const db = require("../db.js");

orderRouter.get("/", async (req, res, next) => {
  try {
    const orders = await db.query("SELECT * FROM orders");
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

orderRouter.get("/:orderId", async (req, res) => {
  try {
    const order = await db.one("SELECT * FROM orders WHERE order_id=$1", [
      req.params.orderId,
    ]);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

module.exports = orderRouter;
