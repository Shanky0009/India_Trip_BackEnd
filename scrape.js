var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

  url = 'http://www.imdb.com/title/tt2948356/';

    request(url, function(error, response, html){

        if(!error){
            var $ = cheerio.load(html);

            var title, release, rating;
            var json = { title : "", rating : "", release : ""};

            $('.title_wrapper').filter(function()
            {

            	var data = $(this);

            	title = data.children().first().text();
                console.log(title)
            	
                json.title = title;
                
            }) 

            $('.ratingValue').filter(function()
            {

                var data = $(this);

                
                rating=data.children().first().text();
                console.log(rating)
                json.rating = rating;
                
            }) 

            $('.subtext').filter(function()
            {

                var data = $(this);

                
                release=data.children().last().text();
                console.log(release)
                json.release = release;
                
            }) 
        }


        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

			    console.log('File successfully written! - Check your project directory for the output.json file');	

		})

		res.send('Check your console!')
      })  
})

app.listen('3000')

console.log('Magic happens on port 3000');