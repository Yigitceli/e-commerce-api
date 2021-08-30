const cartRouter = require('express').Router();
const db = require('../db.js');


cartRouter.use('/:cartId', async (req, res, next) => {
    try {
        const cart = await db.one(`SELECT * FROM cart WHERE cart_id=${req.params.cartId}`);
        req.cart = cart;
        req.cartId = cart.cart_id;
        next();
        
    } catch (error) {
        next(error);
        
    }
});

cartRouter.get('/:cartId', async (req, res, next) => {
    try {
        res.status(200).send(req.cart);
        
    } catch (error) {
        next(error);
        
    }
});


cartRouter.post('/', async (req, res, next) => {
    try {
        await db.none('INSERT INTO cart(user_id, created) VALUES($1, $2)', [req.user.user_id, new Date()]);
        res.send(200);
        
    } catch (error) {
        next(error);

        
    }
});

cartRouter.post('/:cartId', async (req, res, next) => {
    try {
        await db.none(`INSERT INTO cart_item(product_id, cart_id, created) VALUES(${req.body.productId}, ${req.cartId}, ${new Date()})`);
        res.send(202);
    } catch (error) {
        next(error);
    }
});

cartRouter.put('/:cartId/:itemId', async(req, res, next) => {
    try {
        await db.none(`UPDATE cart_item SET product_id=${req.body.productId} WHERE cart_id=${req.cartId} AND cart_item_id=${req.params.itemId}`);
        res.send(202);
        
        
    } catch (error) {
        next(error);
        
    }
})


module.exports = cartRouter;