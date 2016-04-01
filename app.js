var http = require('http');
var express = require('express')
var app = express();
var bodyParser = require('body-parser');//for params
// SESSIONS
var session = require('express-session');
var bcrypt = require('bcrypt');
var MongoStore = require('connect-mongo')(session);

var authenticateUser = function(username, password, callback) { //for sessions and login
  db.collection('users').findOne({username: username}, function(err, data) {
    if (err) {throw err;}
    bcrypt.compare(password, data.password_digest, function(err, passwordsMatch) {
      if (passwordsMatch) {
        callback(data);
      } else {
        ///
        callback(false);
      }
    })
  });
};

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));//for frontend library should be downloaded through bower

app.set('view engine', 'ejs');//for views

app.use(bodyParser());

var db;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/invitations';
MongoClient.connect(mongoUrl, function(err, database) {
  if (err) { throw err;}
  db = database;
  process.on('exit', db.close);
});

app.use(session({
  secret: process.env.SESSION_SECRET
}))

app.get('/', function(req, res){
  res.send('index');
});
app.get('/home', function(req, res){
  res.end('index' + req.params.name);
});
app.post('/home', function(req, res){
  res.end('this is a post' + req.body.name) 
})
app.get('/newuser', function(req, res){
  res.end('newuser');
});
app.get('/login', function(req, res){
  res.end('login');
});
app.get('/signup', function(req, res){
  res.end('register');
});
app.get('/signup', function(req, res){
  res.end('register');
});
console.log("going through port 3000")



app.listen(process.env.PORT || 3000);
