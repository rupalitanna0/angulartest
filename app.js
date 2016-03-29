var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// SESSIONS
var session = require('express-session');
var bcrypt = require('bcrypt');
var MongoStore = require('connect-mongo')(session)

var authenticateUser = function(username, password, callback) {
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
app.use(express.static(__dirname + '/node_modules'));
app.listen(process.env.PORT || 3000);
