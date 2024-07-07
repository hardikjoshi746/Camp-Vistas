const { storeReturnTo} = require('../middleware')
const express = require('express');
const router = express.Router();
const User = require('../models/user')
const users = require('../controllers/users')
const catchAsync = require('../util/catchAsync');
const passport = require('passport');
const user = require('../models/user');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),users.login);
    // use the storeReturnTo middleware to save the returnTo value from session to res.locals

router.get('/logout', users.logout); 

module.exports = router