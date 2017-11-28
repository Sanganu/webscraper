var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var news = new Schema({
  id: {
        type: Number,
        required: true,
      },
      headline: {
        type: String,
        required: true,
        unique: true
      },
      description: {
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
      lastUpdate: {
        type: Date

      },
      commentid: [
        {
          type: Schema.Types.ObjectId,
          ref: "newscomment"
        }
      ]


});

news.methods.getnews = function(){

        var topic = {
           headline : this.headline,
           description : this.description,
           comment : this.comment
        };
        return topic;
}

news.methods.lastupdatedDate = function() {
     this.lastUpdate = Date.ow();
     return this.lastUpdate;
}

var news = mongoose.model("news",news);
module.exports = news;
