var express = require('express');
var router = express.Router();

var task = require('../models/index.js');

router.get('/', function(req, res) {
    
    task.Items.findAll({
        include: [{model: task.Lists}]
       }).then(function(data){
     
         var hbsObject = { Items: data };
         res.render('index', hbsObject);
     
       })
});

router.post('/api/checked/:id', function(req, res) {
    models.Items.findOne( {where: {id: req.params.id} } )
    .then(function(checkedItem){
        checkedItem.update({
        task_active: false,
        })
    .then(function(){
        res.redirect('/')
    })
    });
});

router.put('/api/delete/:id', function(req, res) {
    models.Items.findOne( {where: {id: req.params.id} } )
    .then(function(deleteItem){
        deleteItem.destroy()
    .then(function(){
            res.redirect('/')
        })
    })
});

module.exports = router;