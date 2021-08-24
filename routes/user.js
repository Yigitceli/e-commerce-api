const express = require('express');
const router = express.Router();

router.get('/register', (req, res ,next) => {
    res.render('pages/register');
});

router.get('/login', (req, res ,next) => {
    res.render('pages/login');
});

module.exports = router;