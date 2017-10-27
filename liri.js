var keys = require("./keys.js");
var Twitter = require("twitter");
var spotifyKeys = require("./spotifyKeys.js");
var Spotify = require('node-spotify-api');

//Args for liri commands
var command = process.argv[2];
var title = process.argv[3];

//Command logic FUNCTIONS
if (command === "my-tweets") {
    printTweets();
}

if (command === "spotify-this-song") {
    findSong();
}

if (command === "movie-this") {
    movieSearch();
}

// TWITTER
function printTweets() {

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
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
                console.log("====================")
            }
        } else {
            console.log("Whoops, there seems to be an error.")
        }

    });
};
return;

//SPOTIFY
function findSong() {
    var spotify = new Spotify({
        id: spotifyKeys.id,
        secret: spotifyKeys.secret
    });

    spotify.search({ type: 'track', query: title }, function (err, data) {
        if (!err) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                console.log("Artist:", data.tracks.items[i].artists[0].name);
                console.log("Song Name: ", data.tracks.items[i].name);
                console.log("Preview url: ", data.tracks.items[i].preview_url);
                console.log("Album Name: ", data.tracks.items[i].album.name);
                console.log("====================")
            }
        } else {
            return console.log('Error occurred: ' + err);
        }
    });
};
return;

//OMDB
function movieSearch() {
    var request = require("request");

    // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + title + "&apikey=40e9cece", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            //Console logs for parse data from OMDB
            // console.log(JSON.parse(body));
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("====================")
        }
    });
};
return;