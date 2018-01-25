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

router.post('/quickadd2', function(req, res) {
    console.log(req.body)
    // task.Lists.findOne({where: {list_title: "default", user_fk: req.session.passport.user}}).then(function(quickadd) {
    //     console.log("----------------------------------")
    //     console.log(req.body)
    //     console.log(quickadd.id)
    //     console.log("----------------------------------")
    //     let quickhit = {
    //         listed_item: req.body.quickaddmodal,
    //         user_fk: req.session.passport.user,
    //         task_active: 1,
    //         task_importance: 0,
    //         list_fk: quickadd.id
    //         }
            
    //     task.Items.create(quickhit, {include: task.Lists}).then(task => {
    //         res.redirect('/');
    //     })
    // })

})




    
    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
    
            return next();
    
        res.redirect('/signup');
    
    }
    
module.exports = router;