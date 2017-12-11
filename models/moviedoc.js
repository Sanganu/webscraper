var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var movieSchema = new Schema({

          title: {
            type: String,
            required: true,
            unique: true
          },
          summary: {
            type: String,
            required: true
          },
          url: {
            type: String
          },
          createdDate: {
            type : Date,
            default:Date.now
          },
          author: {
            type: String
          },
          rating: [
          {
            type:String
          }
        ]
});

var mvcom = mongoose.model("moviesring", movieSchema);
module.exports = mvcom;
