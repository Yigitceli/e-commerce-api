const productsRouter = require("express").Router();
const db = require("../db.js");

productsRouter.use("/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await db.one("SELECT * FROM product WHERE product_id=$1", [
      productId,
    ]);
    req.product = product;
    req.productId = productId;
    next();
  } catch (err) {
    res.send(err);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    res.send(req.product);
  } catch (err) {
    res.send(404);
  }
});

productsRouter.get("/", async (req, res, next) => {
  try {
   

    if(req.query.category && req.query.price){
        const products = await db.query("SELECT DISTINCT * FROM product  JOIN category_product ON category_product.product_id = product.product_id JOIN category ON category_product.category_id = category.category_id WHERE category_name = $1 AND price = $2",[req.query.category, req.query.price]);
        res.json(products);
    }else if(req.query.price){
        const products = await db.query("SELECT * FROM product WHERE price=$1",[req.query.price]);
        res.json(products);
    
    }else if(req.query.category){
        const products = await db.query("SELECT DISTINCT * FROM product  JOIN category_product ON category_product.product_id = product.product_id JOIN category ON category_product.category_id = category.category_id WHERE category_name = $1",[req.query.category]);
        res.json(products);
    }else{
        const products = await db.query("SELECT * FROM product");
        res.json(products);
        
    }    
    
    
  } catch (err) {
    res.send(err);
  }
});

module.exports = productsRouter;
