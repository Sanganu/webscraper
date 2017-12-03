var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const cheerio = require("cheerio");
const request = require("request");

var movie = new Schema({

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
      }
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

var movies = mongoose.model("movie",movie);

movies.methods.getallmoviews = function(){
  request("https://www.nytimes.com/section/movies",(error,response,html) =>
  {

          return topic;

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
                                 myappdb.news
                                   .countAndFind({'title':'vtitle','author' : 'vauthor'})
                                   .exec(function(err,records,countrecord){
                                     console.log("Record found");
                                     if ( countrecord === 0)
                                     {

                                         var newmovie = new movies {
                                                     title: vtitle ,
                                                     summary: vsummary,
                                                     url: vlink,
                                                     timereviewed:vtime,
                                                     author:vauthor
                                                  };
                                              newmovie.save(function(err)
                                               {
                                                 if(err) console.log('Error on saving new movie details');
                                                 else console.log('Saved New movie details');
                                               });
                                     }
                                   })
                                   .catch(function(err)
                                     {
                                       console.log("Error --",err);
                                     });

                                 //var url = alink.at  tr('href');
                                  console.log(alink);

                                 console.log("============");
                              }); // end div element loop

                    } //end of if

  }); // end of request url

}

movies.methods.lastupdatedDate = function() {
     this.lastUpdate = Date.now();
     return this.lastUpdate;
}


module.exports = news;
