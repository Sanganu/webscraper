var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const cheerio = require("cheerio");
const request = require("request");

var movies = new Schema({

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

news.methods.getallmoviews = function(){
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
                                 myappdb.news.find({})
                                 //var url = alink.attr('href');
                                  console.log(alink);

                                 console.log("============");

                                 var movie = {
                                    title: vtitle ,
                                    summary: vsummary,
                                    url: vlink,
                                    timereviewed:vtime,
                                    author:vauthor
                                 };
                              }); // end div element loop

                    } //end of if

  }); // end of request url

}

news.methods.lastupdatedDate = function() {
     this.lastUpdate = Date.ow();
     return this.lastUpdate;
}

var news = mongoose.model("news",news);
module.exports = news;
