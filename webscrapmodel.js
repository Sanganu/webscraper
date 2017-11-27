var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var newsSchema = new Schema({
  id: {
        type: Number,
        required: true,
      },
      headline: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      url: {
        type: String
      },
      comments: {
        type: String
      },
      createdDate: {
        type : Date,
        default:Date.now
      },
      lastUpdate: {
        type: Date

      }

});

newsSchema.methods.getnews = function(){

        var topic = {
           headline : this.headline,
           description : this.description,
           comment : this.comment
        };
        return topic;
}

newsSchema.methods.lastupdatedDate = function() {
     this.lastUpdate = Date.ow();
     return this.lastUpdate;
}

var newscomment = mongoose.model("newscomment",newsSchema);
module.exports = newscomment;
