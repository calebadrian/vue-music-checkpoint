var mongoose = require("mongoose")
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var SchemaName = 'Track'

var schema = new Schema({
    artworkUrl100: {type: String},
    trackName: {type: String, required: true},
    trackId:{type: Number, required: true},
    artistName: {type: String, required: true},
    collectionName: {type: String},
    trackPrice: {type: Number},
    previewUrl: {type: String}
})

module.exports = mongoose.model(SchemaName, schema)