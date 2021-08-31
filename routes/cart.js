const cartRouter = require("express").Router();

const db = require("../db.js");

cartRouter.use("/:cartId", async (req, res, next) => {
  try {
    const cart = await db.one(
      `SELECT * FROM cart WHERE cart_id=${req.params.cartId}`
    );
    req.cart = cart;
    req.cartId = cart.cart_id;
    next();
  } catch (error) {
    const message = "There is no cart with that id";
    const err = new Error(message);
    err.status = 404;
    next(err);
  }
});

cartRouter.get("/:cartId", async (req, res, next) => {
  try {
    res.status(200).send(req.cart);
  } catch (error) {
    next(error);
  }
});

cartRouter.post("/", async (req, res, next) => {
  try {
    await db.none("INSERT INTO cart(user_id, created) VALUES($1, $2)", [
      req.user.user_id,
      new Date(),
    ]);
    res.send(200);
  } catch (error) {
    next(error);
  }
});

cartRouter.post("/:cartId", async (req, res, next) => {
  try {
    await db.none(
      `INSERT INTO cart_item(product_id, cart_id, created) VALUES($1, $2, $3)`,
      [req.body.productId, req.cartId, new Date()]
    );
    res.send(202);
  } catch (error) {
    next(error);
  }
});

cartRouter.put("/:cartId/:itemId", async (req, res, next) => {
  try {
    await db.none(
      `UPDATE cart_item SET product_id=${req.body.productId} WHERE cart_id=${req.cartId} AND cart_item_id=${req.params.itemId}`
    );
    res.send(202);
  } catch (error) {
    next(error);
  }
});
cartRouter.delete("/:cartId/:itemId", async (req, res, next) => {
  try {
    await db.none(
      "DELETE FROM cart_item WHERE cart_item_id=$1 AND cart_id=$2",
      [req.params.itemId, req.cartId]
    );
    res.send(200);
  } catch (error) {
    next(error);
  }
});
cartRouter.post("/:cartId/checkout", async (req, res, next) => {
  try {
    const id = req.user;
    const { cartId, paymentInfo } = req.body;
    const cartItems = await db.query(
      "SELECT * FROM cart_items WHERE cart_id=$1",
      [req.cartId]
    );
    const total = cartItems.reduce((total, item) => {
      return (total += Number(item.price));
    }, 0);

    
    const orderId = await db.none(
      "INSERT INTO orders(created, status, user_id, address_id, total, cart_id)VALUES($1, $2, $3, $4, $5, $6) RETURNING order_id",
      [new Date(), "pending", id, 1, total, req.cartId]
    );

    await db.none('UPDATE orders SET status=$1 WHERE order_id=$2',['COMPLETE', orderId]);

  } catch (error) {}
});

module.exports = cartRouter;
