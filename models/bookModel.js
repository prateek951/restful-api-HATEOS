var mongoose = require('mongoose');

//Create the schema
var Schema = mongoose.Schema({
	title : {
		type : String
	},
	author : {
		type : String
	},
	genre : {
		type : String
	},
	read : {
		type : Boolean,
		default : false
	}
});

//Create the model
module.exports = mongoose.model('Book',bookModel);
