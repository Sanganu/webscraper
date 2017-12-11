const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cheerio = require("cheerio");
const request = require("request");

var movieschema = new Schema({

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
      commentid: [
        {
          type: Schema.Types.ObjectId,
          ref: "newscomment"
        }
      ] /*
      comments:[{
        author: String,
        description: String,
        createdDate: {
          type: Date,
          Default:Date.now
        }
      }] */
      /* Trying to understand - do we need a seperate schema for comments or just have an array of it the master*/
      /* Instead of storing an array of child records ir, storing master id in child option - which is better? */

});

var movies = mongoose.model("movies",movieschema);


movieschema.methods.getallmovies = function(){
  request("https://www.nytimes.com/section/movies",(error,response,html) =>
  {


                  // Request web page if no error get all movie details
                  if (!error && response.statusCode == 200)
                   {
                          // console.log(html);
                           var $ = cheerio.load(html);

                          $('div.story-body').each(function(i,element)
                              {
                                 console.log("======================");

                                 var vtitle = console.log($(element).text());
                                 var vlink = $(element).find('a').attr('href');
                                 var vsummary = $(element).find('p.summary').text();
                                 var vauthor = $(element).find('span.author').text();
                                 var vtime = $(element).find(time).attr(datetime);
                                 // Check for Scrapped news - if it doesn't exist in database add to Schema

                                 movies
                                   .countAndFind({'title':'vtitle','author' : 'vauthor'})
                                   .exec(function(err,records,countrecord){

                                         console.log("Check movie details stored in database or not");
                                         if ( countrecord === 0)
                                         {
                                            console.log("New movie details");
                                             var newmovie = new movies ({
                                                         title: vtitle ,
                                                         summary: vsummary,
                                                         url: vlink,
                                                         timereviewed:vtime,
                                                         author:vauthor
                                                      });
                                              newmovie.save(function(err,data)
                                                   {
                                                     if(err) console.log('Error on saving new movie details');
                                                     else console.log('Saved New movie details',data);
                                                   });
                                         }
                                         else {
                                           console.log("Movie details already exist");
                                         }
                                   });

                                 //var url = alink.at  tr('href');
                                  console.log(alink);

                                 console.log("============");
                              }); // end div element loop

                    } //end of if

    }); // end of request url

} //end of getallmoviews

movieschema.methods.displaymovies = function()
{
     movies.find({}).sort('createdDate').exec(function(data,err)
      {
        if(error) console.log("Error:...",error);
        else {
          console.log("All Records",data);
          return res.json(data);
        }
      })

}
movieschema.methods.lastupdatedDate = function() {
     this.lastUpdate = Date.now();
     return this.lastUpdate;
}


module.exports = movies;
