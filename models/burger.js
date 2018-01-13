var orm = require('../config/orm.js');

module.exports = {

    all: function(callback) {
        orm.all('burgers', 'id', 'DESC', function(data) {
            callback(data);
        });
    },

    post: function(input, callback) {
        var columns = '(burger_name, devoured)';
        var values = '\'' + input + '\', false';
        orm.create('burgers', columns, values, function (data) {
            callback(data);
        });
    },

    update: function(property, selector, callback) {
        var update = 'devoured = ' + property;
        var condition = 'id = ' + selector;
        orm.update('burgers', update, condition, function(data) {
            callback(data);
        });
    }
};