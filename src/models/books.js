const mongoose = require("../database");

const BookSchema = new mongoose.Schema({
	name: {
		type: String,
		require: false,
	},
	isbn: {
		type: String,
		require: false/* ,
		unique:true */
	},
	cover: {
		type: String,
		require: false
	},
	numberOfPages: {
		type: Number,
		require: false
	},
	povCharacters:{
		type: Array,
		require: false
	} 

	
});

const Book = mongoose.model('Book', BookSchema)

module.exports = Book
