const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var comments = new Schema({
     opinion: String,
     rating: Number
});

var comments = mongoose.model("comments",comments);

module.exports = comments;
