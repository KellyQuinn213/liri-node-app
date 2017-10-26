//Command for liri commands
//example: my-tweet, spotify-this-song, movie-this, do-what-it-says
var command = process.argv[2];

//command logic
if (command === "my-tweet") {
    for (i = 0; i < tweets.length; i++) {
        console.log(tweets.created_at)
        console.log(tweets.entities.text)
    }
};

//TWITTER
var keys = require("./keys.js");
var Twitter = require("twitter");

var client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
});

var params = {
    screen_name: '@Frida_Katlo',
    count: 20
};

client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
        console.log(tweets);
        console.log(response);
    } else {
        console.log("Whoops, there seems to be an error.")
    }
});

//SPOTIFY
