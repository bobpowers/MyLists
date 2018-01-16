var express = require('express');
var router = express.Router();

var task = require('../models/index.js');

router.get('/', function(req, res) {
    res.render("index")
    // task.all(function(data) {
    //     var hbsObject = {
    //         tasks: data
    //     };
    //     res.render('index', hbsObject);
    // });
});


router.post('/', function(req, res) {
    // var name = req.body.name;
    // task.post(name, function() {
    //     res.redirect('/');
    // });
});

router.put('/:id', function(req, res) {
    // var property = req.body.devoured;
    // var selector = req.params.id;

    // task.update(
    //     property, selector, function() {
    //         res.redirect('/');
    //     });
});

module.exports = router;