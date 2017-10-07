var keys = require('./keys');

var params = {screen_name: 'sam16809499'};
twitterKeys.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});