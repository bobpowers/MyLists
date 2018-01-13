var express = require('express');
var router = express.Router();

var burger = require('../models/burger.js');

router.get('/', function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        res.render('index', hbsObject);
    });
});


router.post('/', function(req, res) {
    var name = req.body.name;
    burger.post(name, function() {
        res.redirect('/');
    });
});

router.put('/:id', function(req, res) {
    var property = req.body.devoured;
    var selector = req.params.id;

    burger.update(
        property, selector, function() {
            res.redirect('/');
        });
});

module.exports = router;