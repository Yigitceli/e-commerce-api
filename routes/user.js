const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../local.js');


router.get('/register', (req, res ,next) => {
    res.render('pages/register');
});

router.get('/login', (req, res ,next) => {
    res.render('pages/login');
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    res.send(200);
})


module.exports = router;