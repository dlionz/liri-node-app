var request = require('request');
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require("fs");

var searchItem = process.argv[3];

var client = new Twitter({
  consumer_key: 'NZecOzIXgDLnQcz3QO8wckula',
  consumer_secret: 'VA2GjVSsvidaKLWGRRCyZytnKsu75o4REJkM2UjC7P89oRFgP1',
  access_token_key: '825859617288761346-RxxRh0bpXPQ9kTwe4rEvHkMIcMHcE43',
  access_token_secret: '6YYRU6sr3LGxriodnJ19xKBp2l1lpQvSKT7x0Wytry462',
});


//spotify api call
var spotify = new Spotify({
  id: "56d25c1d37c540b583cb5b582e1d0c2e",
  secret: "55dc756b0a1a49c2a5040e45b39346cf"
});

//switch for running specified function
switch (process.argv[2]) {
  case "spotify-this-song":
    spotifyNode();
    break;
  case "my-tweets":
    twitterNode();
    break;
  case "movie-this":
    movieNode();
    break;
  case "do-what-it-says":
    doThisNode();
    break;

    // default:
    //     code block
}

function spotifyNode() {

  //if song search is empty
  if (!searchItem) {
    spotify.request("https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc")
      .then(function(data) {
        console.log("----------------");
        console.log("");
        console.log("");
        //writes album
        console.log('Artist: ' + data.album.artists[0].name);
        //writes song
        console.log('Song Name: ' + data.name);
        //writes link
        console.log('Preview Link: ' + data.preview_url);
        //writes album
        console.log('Album Name: ' + data.album.name);
        console.log("");
        console.log("");
        console.log("----------------");
      })
      .catch(function(err) {
        console.error('Error occurred: ' + err);
      });
  }
  //if song search is not empty
  else {
    spotify.search({
      type: 'track',
      query: searchItem,
      limit: 1
    }, function(err, data) {
      //return the results of the song serached.
      console.log("----------------");
      console.log("");
      console.log("");
      //writes album
      console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
      //writes song
      console.log('Song Name: ' + data.tracks.items[0].name);
      //writes link
      console.log('Preview Link: ' + data.tracks.items[0].preview_url);
      //writes album
      console.log('Album Name: ' + data.tracks.items[0].album.name);
      console.log("");
      console.log("");
      console.log("----------------");

      if (err) {
        return console.log('Error occurred: ' + err);
      }

    });
  }
}

//twitter function
function twitterNode() {

  //write out some tweets
  client.get('search/tweets', {
    id: 825859617288761346,
    q: 'web development'
  }, function(err, data, resp) {
    for (i = 0; i < data.statuses.length; i++)
      console.log(data.statuses[i].text);
  });

}

//movie search function
function movieNode(){
  //api key 7fc00fef
  // var API_KEY = "7fc00fef";
  //
  // request("http://www.omdbapi.com/?t=" + searchItem + "&y=&plot=short&apikey=" + API_KEY, function (error, response, body) {
  //   // If the request is successful
  //   if (!error && response.statusCode === 200) {
  //
  //     var movieInfo = JSON.parse(body);
  //
  //     console.log("Movie title: " + movieInfo.Title);
  //     console.log("Year movie came out: " + movieInfo.Year);
  //     console.log("IMDB Rating: " + movieInfo.imdbRating);
  //     console.log("Actors in the movie: " + movieInfo.Actors);
  //     console.log("Rotten tomatoes URL: " + movieInfo.imdbRating);
  //   }
  // });
}

function doThisNode(){

  fs.readFile("random.txt", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }

  // Break down all the numbers inside
  data = data.split(", ");
  var command = data[0];
  var songName = data[1];
    console.log(command + " " + songName);

    spotifyNode(command,query.songName);

});
}
