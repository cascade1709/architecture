const config = require('./config');
const MongoClient = require('mongodb').MongoClient;
const url = config.mongo.url;

let mongoConn = null;

MongoClient.connect(url, function(err, db) {
  if (err) 
  	throw err;
  mongoConn = db.db("emacsdigi");
  console.log("Database Connected");
});


module.exports.insert = function(data) {
	mongoConn.collection("emacsdigi").insertOne(data, function(err, res) {
		if (err) throw err;
		console.log("data inserted");
	});
};

