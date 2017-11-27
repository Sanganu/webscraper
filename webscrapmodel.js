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
      }
      comments: String,
      createdDate: {
        type : Date,
        default:Date.now
      },
      lastUpdate: {
        type: Date

      }

});

newsSchema.methods.getnews = function(){

        var this.topic = {
          var headline = this.headline,
          var description = this.description,
          var comment = this.comment
        };
        return this.topic;
}

newsSchema.methods.lastupdatedDate = function() {
     this.lastUpdate = Date.now();
     return this.lastUpdate;
}

var newscomment = mongoose.model("newscomment",newsSchema);
module.exports = newscomment;
