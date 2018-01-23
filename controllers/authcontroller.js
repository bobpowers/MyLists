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
        successRedirect: '/firsttime',

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
    task.Items.findAll({where: {userId: req.session.passport.user}}).then(function(quickList){
        return res.render('index', {quickList})
    })
});

auth_router.get('/logout', function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/index');
 
    });
});

auth_router.get('/firsttime', function(req, res) {
    task.Lists.create({userId: req.session.passport.user, list_title: "default"}).then(task => {
        res.redirect('/index');
    });

});

auth_router.post('/quickadd', function(req, res) {
    console.log(req)
    let quickhit = {
        listed_item: req.body.quickaddtop,
        userId: req.session.passport.user,
        task_active: 1,
        task_importance: 0,
        Lists: {list_title: "default", userId: req.session.passport.user, id: {where: {list_title: "default"}}}
        }
        
      console.log(quickhit)
    task.Items.create(quickhit, {include: task.Lists}).then(task => {
        res.redirect('/');
    })
})

function isLoggedIn(req, res, next) {
 
    if (req.isAuthenticated())

        return next();

    res.redirect('/signup');

}

module.exports = auth_router;
