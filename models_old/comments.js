 const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var commentschema = new Schema({
    username: String,
     opinion: String,
     rating: Number,
     CreatedOn: {
       type: Date,
       default: Date.now
     },
     lastUpdate: Date,

});

var comments = mongoose.model("comments",commentschema);

/* Since getting all records already exist not a customm functio this is not needed
commentschema.methods.getallcomments = function()
{

}*/

commentschema.methods.lastupdatedDate = function() {
     this.lastUpdate = Date.now();
     return this.lastUpdate;
}


commentschema.methods.addusercomments = function(recorddet) {
          var id = recorddet.id;
          var commentrecord = new comments ({
               username : recorddet.username,
               opinion : recorddet.commentstr,
               rating : recorddet.rating });
          comments.save(function(err,comm)
          {
             if (err)
             {
               console.log("Error in aving comments ",err);
             }
             else {
               console.log('Comments saved');
               res.send(comm);
             }
          });

}


module.exports = comments;
