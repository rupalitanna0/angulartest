var http = require('http');
var express = require('express')
var app = express();

http.createServer(app).listen(3000);
//app.use(express.bodyParser());
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
