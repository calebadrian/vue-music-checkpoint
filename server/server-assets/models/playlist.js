var mongoose = require("mongoose")
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var SchemaName = 'Playlist'

var schema = new Schema({
    name: {type: String},
    songs: [{}]
})

module.exports = mongoose.model(SchemaName, schema)