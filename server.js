const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");  // Something logs info about whats working and not on console.
const mongoose = require("mongoose"); // Mongodb ORM

const PORT = process.env.PORT || 3000;

const app = express();
const myappdb = require("./models/webscrapper");
//var myappdb = require("./webscrapper");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static("public"));




mongoose.Promise = Promise;
// connect to specific database in Mongodb
mongoose.connect('mongodb://localhost/movieswebscrapper',{
  useMongoClient: true
}); // connect to db

let db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once("open",function()
{
  console.log("Mongoose connection successful and Open.");
}); //once connected


app.get("/",function(req,res)
{
   //myappdb.movies.getallmovies();
   //myappdb.movies.displaymovies();

  myappdb.movies
    .find({})
    .exec(function(err,dbmovies)
        {
            if(err)
            {
              console.log('Error in getting all movie details',err);
            }
            else {
                res.json(dbmovies);
            }

        })

});
/* Passing with parameters along url

app.post("/addcomment/:username/:comments/:rating",function(req,res)
{
  var commentrecord = {
    username: req.params.username,
    commentstr : req.params.comments,
    rating: req.params.rating
  }
  myapp.comments.addusercomments(commentrecord);
});

*/

/* This will do with request body */
app.post("/addcomment",function(req,res)
{
      var commentrecord = {
        username: req.body.username,
        commentstr : req.body.comments,
        rating: req.body.rating
      }
      myapp.comments.addusercomments(commentrecord);

});

app.get("/comments",function(req,res)
{
  myappdb.comments
    .find({})
    .then(function(dbnewscom)
        {
            res.json(dbnewscom);
        })
    .catch(function(err)
       {
           res.json(err);
       });
});

app.post("/submit",function(req,res)
{
    var comment = new mymodel(req.body);

    newscomment.save(function(error,doc){
        if (error)
         {
           console.log("Error on saving record to mongo db !!!",error)
           res.send(error);
         }
         else {
           res.send(doc);
         }
    });  // save to db
}); // end of Post

app.listen(PORT,function()
{
  console.log('Application listening on port 3000!');
}); //app listen
