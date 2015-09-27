var config = require ('./config'),
	mongoose = require('mongoose');
	
module.exports = function(){

	var db = mongoose.connect(config.db);

	console.log("Connecting to database...");	

	require('../app/models/financials.server.model');
	
	return db;
};
