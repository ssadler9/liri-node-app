// make it so liri.js can take in one of the following commands:

// spotify-this-song
// movie-this
// do-what-it-says

var keys = require('./keys.js');
var Twitter = require('twitter');
var request = require('request');
var fs = require('fs');
var spotify = require('node-spotify-api');

var client = new Twitter(keys);
// making the last 20 tweets display in node
var params = { screen_name: 'sam16809499', count: 20 };
client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                var data = [];
                for (var i = 0; i < tweets.length; i++) {
                    data.push({
                            'Tweets: ': tweets[i].text,
                        })
                    // my-tweets
                        console.log(data);
                    }
            }
        });
// spotify code to display artists, song name, preview link, album
var spotify = new spotify({
  id: '94ba0b139cec4db58ce7a7d7729099a8',
  secret: '15a44d138fe445c5b1590b268b34f486'
});

spotify.search({ type: 'track', query: 'crash into me' }, function(error, data) {
    if ( error ) {
        console.log('Error occurred: ' + error);
        return;
    }
var getArtistNames = function(artist) {
  console.log(artist.name);
};
    // Do something with 'data' 
    console.log(data);
});

// omdb api to display movie information in command line
// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 2; i < nodeArgs.length; i++) {

  if (i > 2 && i < nodeArgs.length) {

    movieName = movieName + "+" + nodeArgs[i];

  }

  else {

    movieName += nodeArgs[i];

  }
}
// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log('Title: ' + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log('Country: ' + JSON.parse(body).Country);
    console.log('Language: ' + JSON.parse(body).Language);
    console.log('Plot: ' + JSON.parse(body).Plot);
    console.log('Actors: ' + JSON.parse(body).Actors);
  }
});
