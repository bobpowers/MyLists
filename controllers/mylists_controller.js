var express = require('express');
var router = express.Router();
var passport = require("passport");
var task = require('../models/index.js');

router.get('/:listname', isLoggedIn, function(req, res) {
    //shows lists page with list content depending on what is passed with :listname
    var listname = req.params.listname;

    task.Lists.findOne({where: {list_title: listname, user_fk: req.session.passport.user}}).then(function(test) {
        task.Items.findAll({where: {user_fk: req.session.passport.user, list_fk: test.id}, order: [['task_importance', 'DESC']]}).then(function(quickList){
            console.log(quickList)
            res.render('lists', {quickList})
        })
        })
    });

router.post('/quickadd3', function(req, res) {
    var listnamePOS = (req.headers.referer);
    console.log(listnamePOS)
    var removeletters = listnamePOS.substr(28);
    var removespaces = removeletters.replace("%20", " ");
    console.log(removeletters);
    task.Lists.findOne({where: {list_title: removespaces, user_fk: req.session.passport.user}}).then(function(quickadd) {
        console.log("----------------------------------")
        console.log(req.body)
        console.log(quickadd.id)
        console.log("----------------------------------")
        let quickhit = {
            listed_item: req.body.quickaddmodal,
            user_fk: req.session.passport.user,
            task_active: 1,
            task_importance: 0,
            list_fk: quickadd.id
            }
            
        task.Items.create(quickhit, {include: task.Lists}).then(task => {
            res.redirect(req.get('referer'));
        })
    })

})


router.delete('/list/item/:id', function(req, res) {
    console.log(req.params)
    task.Items.destroy({where: {id: req.params.id}}).then(task => {
        res.end();
    })
})

router.put('/list/item/:id/:importance', function(req, res) {
    task.Items.findOne({where: {id: req.params.id}}).then(function(test) {
        test.update({
            task_importance: req.params.importance
        }).then(task => {
            res.end();
        })
    })
})

router.put('/list/item/active/:id/:active', function(req, res) {
    task.Items.findOne({where: {id: req.params.id}}).then(function(test) {
        test.update({
            task_active: req.params.active
        }).then(task => {
            res.end();
        })
    })
})

router.post('/addList', function(req, res) {
    console.log(req.body)
        let quickhit = {
            list_title: req.body.addlistmodal,
            user_fk: req.session.passport.user,
            }
            
        task.Lists.create(quickhit).then(task => {
            res.redirect(req.get('referer'));
        })
    })

    function createlistRow(listData) {
        console.log("yay");
        var container = $("#listnameContainer");
        var link = $("<div>");
            link.append("<a href='lists/" + listData + "'><i class='fa fa-angle-double-right'></i> " + listData + "</a>")
            link.append("<br><hr class='hr'><br>")
            container.append(link);
    }

    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
    
            return next();
    
        res.redirect('/signup');
    
    }
    
module.exports = router;