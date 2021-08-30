const express =             require('express');
const indexRouter =         express.Router();
const userRouter =          require('./users.js');
const productsRouter =      require('./products.js');
const cartRouter =          require('./cart.js');

indexRouter.get('/', function (req, res) {
    res.render('./pages/index');
});
indexRouter.use('/users', userRouter);
indexRouter.use('/products/', productsRouter);
indexRouter.use('/cart', cartRouter);

indexRouter.use((err, req, res ,next) => {
    const status = err.status;
    const message = err.message;
    res.status(status).send(message);
})



module.exports = indexRouter;