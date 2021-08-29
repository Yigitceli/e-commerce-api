const express =             require('express');
const indexRouter =         express.Router();
const userRouter =          require('./users.js');
const productsRouter =      require('./products.js');

indexRouter.get('/', function (req, res) {
    res.render('./pages/index');
});
indexRouter.use('/users', userRouter);
indexRouter.use('/products/', productsRouter);


module.exports = indexRouter;