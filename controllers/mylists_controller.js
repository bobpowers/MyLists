var express = require('express');
var router = express.Router();

var task = require('../models/index.js');

router.get('/', function(req, res) {
    
    // Sequelize Query to get all burgers from database (and join them to their devourers, if applicable)
    task.Lists.findAll({
        include: [{model: task.Users}]
       }).then(function(data){
     
         // Pass the returned data into a Handlebars object and then render it
         var hbsObject = { Lists: data };
         // console.log(data);
         res.render('index', hbsObject);
     
       })
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