// Load Node modules
var express = require('express');
const ejs = require('ejs');
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./config/db");
const user = require("./routes/user");
// Initiate Mongo Server
InitiateMongoServer();
// Initialise Express
var app = express();
// Render static files
app.use(express.static('public'));
// Middleware
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Set the view engine to ejs
app.set('view engine', 'ejs');
// PORT
const PORT = process.env.PORT || 8080;

const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');
  
app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session())


// Auth 
app.get('/auth' , passport.authenticate('google', { scope:
  [ 'email', 'profile' ]
}));

// Auth Callback
app.get( '/auth/callback',
  passport.authenticate( 'google', {
      successRedirect: '/dashboard',
      failureRedirect: '/auth/callback/failure'
}));

// Success 
app.get('/auth/callback/success' , (req , res) => {
  if(!req.user)
      res.redirect('/auth/callback/failure');
  res.send("Welcome " + req.user.email);
});

// failure
app.get('/auth/callback/failure' , (req , res) => {
  res.send("Error");
});

// Port website will run on
app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
  });

// *** GET Routes - display pages ***
// Root Route
app.get('/', function (req, res) {
    res.render('pages/index');
});

app.get('/login', function (req, res) {
  res.render('pages/loginpage');
});

app.get('/registration', function (req, res) {
  res.render('pages/registration');
});

app.get('/dashboard', function (req, res) {
  res.render('pages/dashboard');
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);

app.get('/learn/2022/responsive-web-design/', function (req, res){
  res.send("<h1>Learn responsive web design</h1>")
});

app.get('/learn/javascript-algorithms-and-data-structures/', function (req, res){
  res.send("<h1>Learn algorithm and data structure</h1>")
});

app.get('/learn/front-end-development-libraries/', function (req, res){
  res.send("<h1>Learn Front end development</h1>")
});

app.get('/learn/data-visualization/', function (req, res){
  res.send("<h1>Learn Data Visualization</h1>")
});

app.get('/learn/relational-database/', function (req, res){
  res.send("<h1>Learn Relational Database</h1>")
});

app.get('/learn/quality-assurance/', function (req, res){
  res.send("<h1>Learn Quality Assurance</h1>")
});

app.get('/learn/back-end-development-and-apis/', function (req, res){
  res.send("<h1>Learn BackEnd Development And APIS</h1>")
});

app.get('/learn/scientific-computing-with-python/', function (req, res){
  res.send("<h1>Learn Scientific Computing</h1>")
});

app.get('/learn/data-analysis-with-python/', function (req, res){
  res.send("<h1>Learn Data Analysis With Python</h1>")
});