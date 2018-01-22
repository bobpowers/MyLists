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
        successRedirect: '/',

        failureRedirect: '/signup'
    }

));

auth_router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/',

    failureRedirect: '/signin'
}

));

auth_router.get('/', isLoggedIn, function(req, res) {
    //handle with passport
    res.render('/');
});

function isLoggedIn(req, res, next) {
 
    if (req.isAuthenticated())

        return next();

    res.redirect('/signin');

}

module.exports = auth_router;
