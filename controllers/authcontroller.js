var express = require('express');
var auth_router = express.Router();
var task = require('../models/index.js');
var passport   = require('passport')

auth_router.get('/', function(req, res) {
    res.redirect('/index')
});

auth_router.get('/signup', function(req, res) {
    //handle with passport
    res.render('signup')
});

auth_router.get('/signin', function(req, res) {
    //handle with passport
    res.render('signin')
});

auth_router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/index',

        failureRedirect: '/signup'
    }

));

auth_router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/index',

    failureRedirect: '/signin'
}

));

auth_router.get('/index', isLoggedIn, function(req, res) {
    //handle with passport
    console.log(req.isAuthenticated());
    res.render('index');
});

auth_router.get('/logout', function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/index');
 
    });
});

function isLoggedIn(req, res, next) {
 
    if (req.isAuthenticated())

        return next();

    res.redirect('/signup');

}

module.exports = auth_router;
