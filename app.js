var MongoClient = require('mongodb').MongoClient;
mongoURL = 'mongodb://localhost:27017/cards';
MongoClient.connect(mongoURL, function(err, db){
  if(!err){
    db.collection('user').find().toArray(function(err, data){
      console.log(data);
    })
  } else {
    console.log(err);
  }
})
