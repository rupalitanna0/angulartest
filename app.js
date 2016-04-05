var http = require('http');
var express = require('express')
var app = express();
var bodyParser = require('body-parser');//for params
// SESSIONS
var session = require('express-session');
var bcrypt = require('bcrypt');
var MongoStore = require('connect-mongo/es5')(session);


var authenticateUser = function(username, password, callback) { //for sessions and login
  db.collection('users').findOne({username: username}, function(err, data) {
    if (err) {throw err;}
    bcrypt.compare(password, data.password_digest, function(err, passwordsMatch) {
      if (passwordsMatch) {
        callback(data);
        res.render('userprofile');
      } else {
        ///
        callback(false);
        console.log("nope try again");
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
app.get('/', function(req, res) { 
  res.render('index', { title: 'The index page!' }) 
});
// app.get('/', function(req, res){
//   res.send('index');
// });
app.get('/', function(req, res){
  res.render('index');
});

app.post('/login', function(req, res) {
  thisUser = req.body;
  authenticateUser(thisUser.username, thisUser.password, function(user){
    if(user){
      req.session.name = user.username;
      req.session.userId = user._id;
    }
    res.json(user);
  })
});

app.post('/signup', function(req, res) {
  // req.session.name = req.body.userInfo.username;
  thisUser = req.body;
  bcrypt.hash(thisUser.password, 8, function(err, hash){
    if(err){throw err;}
    db.collection('user').insert({password_digest: hash, username: thisUser.username, points: 5}, function(err, data){
      req.session.name = thisUser.username;
      req.session.userId = thisUser._id;
      res.json(thisUser);
    })
  })
});

app.get('/logout', function(req, res) {
  req.session.name = null;
  req.session.userId = null;
  res.json(req.session.name);
})


console.log("going through port 3000")



app.listen(process.env.PORT || 3000);
