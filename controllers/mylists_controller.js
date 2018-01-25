var express = require('express');
var router = express.Router();
var passport = require("passport");
var task = require('../models/index.js');

router.get('/:listname', isLoggedIn, function(req, res) {
    //shows lists page with list content depending on what is passed with :listname
    var listname = req.params.listname;
    task.Lists.findOne({where: {list_title: listname, user_fk: req.session.passport.user}}).then(function(test) {
        task.Items.findAll({where: {user_fk: req.session.passport.user, list_fk: test.id}, order: [['task_importance', 'DESC']]}).then(function(quickList){
            return res.render('lists', {quickList})
        })
        })
    });




    
    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
    
            return next();
    
        res.redirect('/signup');
    
    }
    
module.exports = router;