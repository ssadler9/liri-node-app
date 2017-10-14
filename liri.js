// make it so liri.js can take in one of the following commands:
// spotify-this-song
// movie-this
// do-what-it-says

var input = '';
// grabs mutliple strings from the command line
for (var i = 3; i < process.argv.length; i++) {
    input += " " + process.argv[i];
}
var command = process.argv[2];
// console.log(input);

var keys = require('./keys.js');
var Twitter = require('twitter');
var client = new Twitter(keys);
var request = require('request');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var spotifyKeys = require('./spotify_keys');
var spotify = new Spotify(spotifyKeys);



function getTweets() {
    
    // making the last 20 tweets display in node
    var params = { screen_name: 'sam16809499', count: 20 };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {

            var data = [];
            for (var i = 0; i < tweets.length; i++) {
                data.push({
                    'Tweets: ': tweets[i].text,
                })
            }    
                // my-tweets
                console.log(data);
            
        }
    });
};


function spotifyThis() {
    // spotify code to display artists, song name, preview link, album

    spotify.search({ type: 'track', query: input }, function(error, data) {
        if (error) {
            console.log('Error occurred: ' + error);
            // console.log(data.tracks.items[0].artists[0].name);
            
            return;
        }

        // Do something with 'data' 
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].preview_url);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].album.name);
        // console.log(data);
    });
};


function getMovie() {
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=40e9cece";

    request(queryUrl, function(error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            var movie = JSON.parse(body);
            console.log('Title: ' + movie.Title);
            console.log("Release Year: " + movie.Year);
            console.log("IMDB Rating: " + movie.imdbRating);
        if (movie.Rating){    
            console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
        } else {
            console.log("Rotten Tomatoes Ratings Unavailable");
        }   
            console.log('Country: ' + movie.Country);
            console.log('Language: ' + movie.Language);
            console.log('Plot: ' + movie.Plot);
            console.log('Actors: ' + movie.Actors);
        }
    });
};


function randomTxt(){
    fs.readFile('random.txt', 'utf8', function (error, data){
        if (!error) {            
            var split = data.split(',');
            console.log(split);
            command = split[0];
            input = split[1];
            switch (command) {
                    case 'my-tweets':
                        getTweets();
                        break;
                    case 'spotify-this-song':
                        spotifyThis();
                        break;
                    case 'movie-this':
                        getMovie();
                        break;
                    case 'do-what-it-says':
                        randomTxt();
                        break;    
                    }
        }

    });
};


// switch cases for my-tweets, spotify-this-song, movie-this, do-what-it-says

switch (command) {
    case 'my-tweets':
        getTweets();
        break;
    case 'spotify-this-song':
        spotifyThis();
        break;
    case 'movie-this':
        getMovie();
        break;
    case 'do-what-it-says':
        randomTxt();
        break;    
}










