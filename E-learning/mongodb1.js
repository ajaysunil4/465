var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/YourUdemy";
MongoClient.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},
function(err,db){
if(err)throw err;
console.log("Database Created");
db.close();
});