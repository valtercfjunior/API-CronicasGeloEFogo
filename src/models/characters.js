const mongoose = require("../database");

const CharacterSchema = new mongoose.Schema({
	name: {
		type: String,
		require: false/* ,
		unique: true */
	},
	gender: {
		type: String,
		require: false,
		
	},
	culture: {
		type: String,
		require: false
	},
	born:{
		type: String,
		require: false
	}, 
	titles:{
		type: Array,
		require: false
	}, 
	aliases:{
		type: Array,
		require: false
	},
	povBooks:{
		type: Array,
		require: false
	} 
})

const Character = mongoose.model('Character', CharacterSchema)

module.exports = Character