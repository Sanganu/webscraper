# webscraper
Web Scraper Application using MongoDB

This Application Scrapes Movie Review Details
from the website https://www.nytimes.com/section/movies and adds records to MongoDB making sure there is no duplicate entries. Unique Key constraint on the Title field.

The User can add rating to the review. The Number of Ratings and the average rating are displayed.

Embedded reltionship approach is used for schema design.

Mongoose, Cheerio, Request npm packages used.

Deployed on heroku: https://arcane-fortress-23407.herokuapp.com/
