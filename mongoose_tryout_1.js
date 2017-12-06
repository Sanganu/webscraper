const mongoose = require("mongoose");
//const Schema = mongoose.Schema;
const cheerio = require("cheerio");
const request = require("request");
//const express = require('express');
//const countAndFind = require("mongoose-count-and-find");

          var monschema = new mongoose.Schema({

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
                    timereviewed: {
                      type: Date
                    },
                    lastUpdate: {
                      type: Date
                    },
                    comments: [
                      {
                        type: String,

                      }
                    ]
              });

              let thmovie = mongoose.model('thmovie',monschema);

              let db = mongoose.connection;
              db.on('error', console.error.bind(console, 'connection error:'));
              db.once('open', function() {
                 console.log("Mongoose connected");

              });

              var arrayofnewmovies = [];

              request("https://www.nytimes.com/section/movies",(error,response,html) =>
              {
                            // Request web page if no error get all movie details
                              if (!error && response.statusCode == 200)
                               {
                                       var $ = cheerio.load(html);

                                      $('div.story-body').each(function(i,element)
                                          {
                                                 console.log("========11111==============");
                                                 var vtitle = $(element).text().trim();
                                                 var vlink = $(element).find('a').attr('href').trim()
                                                 var vsummary = $(element).find('p.summary').text().trim();
                                                 var vauthor = $(element).find('span.author').text().trim();
                                                 var vtime = $(element).find('time').text().trim();

                                                 // Check for Scrapped news - if it doesn't exist in database add to Schema
/*
                                                 thmovie.findOne({title : vtitle},function(err,data) {
                                                     if (err) throw err;
                                                     if(data === null)
                                                     {
                                                        //console.log("=========22222=============");

                                                       console.log("New Movie details");
                                                     }
                                                      else {
                                                         console.log("Details alredy exist");
                                                      }
                                                 }); */
insertrecord();
                                                 function insertrecord()
                                                 {
                                                           console.log("========3333==============");
                                                            var datatmovie = new thmovie ({
                                                                          title: vtitle ,
                                                                          summary: vsummary,
                                                                          url: vlink,
                                                                          author:vauthor,
                                                                          timereviewed:vtime,

                                                                       });
                                                            console.log("Record to insert",datatmovie);
                                                             datatmovie.save(function(err){
                                                                if(err) throw err;
                                                                console.log('Saved]]]]');
                                                             });
                                                            // updatecomment(vtitle);
                                                  } //end of insertrecord
/*
                                                  function updatecomment(vtitle)
                                                  {
                                                            thmovie.findOneAndUpdate(
                                                               {title : vtitle},
                                                               {$push:{"comments":"my comment"}},
                                                               function(err)
                                                               {
                                                                     if(err) console.log("errrrrr");
                                                                     else{
                                                                       console.log("comment added");
                                                                     }
                                                               }); //end findOneAndUpdate

                                                    } //end update comments/add comments */

                                           }); // end div
                                  } // end of if
                                  mongoose.disconnect();
                    });  // end of request

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mongoosetest', {
        useMongoClient: true
});//end of mongoose connect


/*
trialmovieschema.methods.displaymovies = function()
{
     movies.find({}).sort('createdDate').exec(function(data,err)
      {
        if(error) console.log("Error:...",error);
        else {
          console.log("All Records",data);
          return res.json(data);
        }
      });

}
trialmovieschema.methods.lastupdatedDate  function() {
     this.lastUpdate = Date.now();
     return this.lastUpdate;
}


*/
