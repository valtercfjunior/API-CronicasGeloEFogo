const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://mobix-challenge-root:o21gnz2MqdIzFDk4@cluster0.f1qanum.mongodb.net/?retryWrites=true&w=majority')

mongoose.Promise = global.Promise

module.exports = mongoose   