var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const request = require("request");


var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

//var PORT = 3000;

// Initialize Express
var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

mongoose.Promise = Promise;


if(process.env.MONGODB_URI) {
     mongoose.connect(process.env.MONGODB_URI, {
       useMongoClient: true
     });
}
else {
     mongoose.connect("mongodb://localhost/embwebscrapper", {
       useMongoClient: true
     });
     console.log("mongoose connected");
}

//Initialize array
var resultset = [];

let dbconnect = mongoose.connection;
dbconnect.on('error',console.error.bind(console,'connection error:'));
dbconnect.once('open',function() {
    console.log('Connction open -');
    console.log('Check for new Movie Review and update the database');
    createrecords();
});


// Routes

// Route for all movies
app.get("/review", function(req, res) {
 console.log("Check review");
 db.mvcom
   .find({})
   .then(function(dbmovie) {
     res.json(dbmovie);
   })
   .catch(function(err) {
     res.json(err);
   });
});

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/review/:id", function(req, res) {
         db.mvcom
           .findOne({ _id: req.params.id })
           .then(function(result) {
             res.json(result);
           })
           .catch(function(err) {
             res.json(err);
           });
}); // End

// Route for saving/updating an Article's associated Note
app.post("/review/:id", function(req, res) {
      var vcomment = req.body.data;
       db.mvcom.findAndModify({
         query:{_id:req.params.id},
         update:{
           $push:{comments:{vcomment}}
         }
       }).then(function(result) {
         res.json(result);
       }) .catch(function(err) {
           console.log("Unable to find and modifyecords");
            res.json(err);
       });
});

function createrecords()
{
         request("https://www.nytimes.com/section/movies",(error,response,html) =>
         {
                 var $ = cheerio.load(html);
                 var allmovies = [];
                 $('div.story-body').each(function(i, element) {

                         var result = {};
                          result = {
                             title : $(element).text().trim(),
                             url : $(element).find('a').attr('href').trim(),
                             summary : $(element).find('p.summary').text().trim(),
                             author : $(element).find('span.author').text().trim()
                           };
                           allmovies.push(result);
                           //console.log("allmovies",allmovies.length);
                 }); // end div loop
                 var insertdone = true;
                 var i = 0
                 //console.log("Allmovies",allmovies.length);
                 while ( (i < allmovies.length) && (insertdone = true))
                 {
                   insertdone = false;
                   addmovie(allmovies[i]);
                   i++;
                   //console.log("The i",i)
                 }
           }); // end of cheerio request on webpage
} // End of function to create records


   function addmovie(newone)
   {

      db.mvcom
       .create(newone)
       .then(function(dbmovie) {
         insertdone = true;
       })
       .catch(function(err) {
          var vrmsg  = (err.errmsg).substr(0,6);
          if( vrmsg === 'E11000')
             {
               console.log("Movie details already exist");
             }
          else
           console.log("Error on saving",err);
       });
   }  //End of function to add just the new movies to the database

app.delete("/review/:id",function(req,res){
  console.log("Removing Movie Details");
  db.mvcom
    .remove({_id:req.params.id})
    .then(function(result){
      console.log("Delete Movie Details:",result);
      res.status(200).end();
    })
    .catch(function(err){
      console.log("Error in Deleting Movie details",err);
      res.status(404).end();
    });
});

app.put("/rating/:id",function(req,res){
          var vrati = (req.body.rati);
          console.log("Update route",vrati);
          db.mvcom
            .update(
              {_id:req.params.id},
              {$push:{rating:vrati}}
            ).then(function(result,err){
              if(err) {
                console.log("Errrrrrrrr",err);
                res.json(err);
              }
              else {
                console.log("the result",result);
                res.json(result);
              }
            });
});  //Add ratings(update Movies - array of rating)

// Start the server
app.listen(PORT, function() {
 console.log("App running on port " + PORT + "!");
});
