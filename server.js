const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");  // Something logs info about whats working and not on console.
const mongoose = require("mongoose"); // Mongodb ORM
const cheerio = require("cheerio");
const request = require("request");
const Promise = require("bluebird"); // new Promise for mongoose
const mymodel = require("./webscrapper.js");
const PORT = process.env.PORT || 3000;

const app = express();
var myappdb = require("./models");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static("public"));




mongoose.Promise = Promise;
// connect to specific database in Mongodb
mongoose.connect('mongodb://localhost/nytimeswebscrapper',{
  useMongoClient: true
}); // connect to db

let db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once("open",function()
{
  console.log("Mongoose connection successful.");
}); //once connected

app.get("/",function(req,res)
{
  res.send(index.html);
}); //end of get
app.get("/all",function(req,res)
{
  db.
});
app.get("/news",function(req,res)
{
  myappdb.news
    .find({})
    .then(function(dbnews)
        {
            res.json(dbnews);
        })
    .catch(function(err)
       {
           res.json(err);
       })    ;
});

app.get("/newscomments",function(req,res)
{
  myappdb.newscomments
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
    var newscomment = new mymodel(req.body);
    newscomment.getnews();
    newscomment.lastupdatedDate();
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
});
