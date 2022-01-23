var express = require('express');
var path = require('path'); 
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var app = express();
var new_db = "mongodb://localhost:27017/YourUdemy";
app.get('/a',function(req,res){
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/index.html');
}).listen(3000);

console.log("Server listening at : 3000");
app.use('/', express.static(__dirname + '/'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
	extended: true
}));
var getHash = ( pass , phone ) => {
				
				var hmac = crypto.createHmac('sha512', phone);
				
				//passing the data to be hashed
				data = hmac.update(pass);
				//Creating the hmac in the required format
				gen_hmac= data.digest('hex');
				//Printing the output on the console
				console.log("hmac : " + gen_hmac);
				return gen_hmac;
}
app.post('/sign_up' ,function(req,res){
	var name = req.body.name;
	var email= req.body.email;
	var pass = req.body.password;
		var phone = req.body.phone;
	var password = getHash( pass , phone ); 				

	
	var data = {
		"email":email,
		"name":name,
		"password": password, 
		"phone" : phone
	}
	
	mongo.connect(new_db , function(error , db){
		if (error)	throw error;
		var dbo = db.db("YourUdemy");
		console.log("connected to database successfully");
		dbo.collection("details").insertOne(data, (err , collection) => {
			if(err) throw err;
			console.log("Record inserted successfully");
			console.log(collection);
		});
	});
	
	console.log("DATA is " + JSON.stringify(data) );
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/home.html');  

});