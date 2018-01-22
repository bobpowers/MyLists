var express = require('express');
var auth_router = express.Router();
var task = require('../models/index.js');
var passport   = require('passport')




auth_router.get('/signup', function(req, res) {
    //handle with passport
    res.render('signup')
});

auth_router.get('/signin', function(req, res) {
    //handle with passport
    res.render('signin')
});

auth_router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',

        failureRedirect: '/signup'
    }

));

module.exports = auth_router;
