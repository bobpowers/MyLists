// Import dependencies.
var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport   = require('passport')
var session    = require('express-session')


//Select Env Varibles
var env = require('dotenv').load();

// Initialize app.
var app = express();
var db = require("./models");
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, 'public')));

var PORT = process.env.PORT || 3000;

// Set handlebars as view engine.
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// For Passport
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Method override.
app.use(methodOverride('_method'));

// Import routes and give the server access to them.
var routes = require('./controllers/mylists_controller.js');
app.use('/', routes);

var auth_routes = require('./controllers/authcontroller.js');
app.use('/', auth_routes);

//load passport strategies
require('./config/passport/passport.js')(passport, db.user);



// Start listening.
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
