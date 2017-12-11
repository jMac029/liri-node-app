// js to make the app work

let apiCommand = process.argv[2]

// Input for API call
let nodeArgs = process.argv;

// Empty String searchTerm to use for searching with the API
let searchTerm = ""

// bringing in the key object from keys.js
const keys = require('./keys.js')

// Loop to capture all the terms after the process.argv[3] and making them the term to be searched
for (let i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {

        searchTerm = searchTerm + "+" + nodeArgs[i];

    } else {

        searchTerm += nodeArgs[i];

    }
}

const liriBot = {
    // Search function for Twitter

    latestTweets: () => {

        const Twitter = require('twitter')

        //console.log(twitterKeys)
        let client = new Twitter({
                consumer_key: keys.twitter.consumer_key,
                consumer_secret: keys.twitter.consumer_secret,
                access_token_key: keys.twitter.access_token_key,
                access_token_secret: keys.twitter.access_token_secret
            })
            //console.log(client)
        let params = {
            screen_name: 'TheRealMacChees',
            count: 20,
            exclude_replies: true,
            tweet_mode: 'extended'
        }
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                console.log(error)
                    //console.log(tweets[0].tweet.text)
            }
            //console.log(tweets[2])

            for (var i = 1; i < tweets.length; i++) {
                console.log("")
                console.log("* * * * * * * * * * * * * * * * * * * * * * * * * * * * *")
                console.log("")
                console.log("Tweeted on: " + tweets[i].created_at)
                console.log("Tweet: " + tweets[i].full_text)
                    // console.log("- - - - - - - - - - - - - - - - - - - - - - - ")
            }
        });

    },

    // Search function for Spotify

    spotifySearch: () => {
        const Spotify = require("node-spotify-api")

        let spotify = new Spotify({
            id: keys.spotify.id,
            secret: keys.spotify.secret
        })

        if (searchTerm === "") {
            searchTerm = "Ace of Base The Sign"
        }

        spotify.search({ type: 'track', query: searchTerm, limit: 1 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            let track = data.tracks.items
                //console.log(track);
            for (let i = 0; i < track.length; i++) {
                console.log("")
                console.log("* * * * * * * * * * * * * * * * * * ")
                console.log("")
                console.log("Artists: " + track[i].artists[0].name);
                console.log("Song: " + track[i].name)
                console.log("Song Link: " + track[i].external_urls.spotify)
                console.log("Album: " + track[i].album.name)
                console.log("")
                console.log("* * * * * * * * * * * * * * * * * * ")
                console.log("")
            }
        });

    },

    // Search function for OMDB request

    movieSearch: () => {
        const request = require("request")

        if (searchTerm === "") {
            searchTerm = "Mr. Nobody"
        }

        let queryUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=" + keys.omdb.apikey

        //console.log(queryUrl);

        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                //console.log(body)
                console.log("")
                console.log("* * * * * * * * * * * * * * * * * * ")
                console.log("")
                console.log("Title: " + JSON.parse(body).Title)
                console.log("Year Released: " + JSON.parse(body).Year)
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating)
                console.log("Metascore: " + JSON.parse(body).Metascore)
                console.log("Country: " + JSON.parse(body).Country)
                console.log("Language: " + JSON.parse(body).Language)
                console.log("Plot: " + JSON.parse(body).Plot)
                console.log("Staring: " + JSON.parse(body).Actors)
                console.log("US Box Office: " + JSON.parse(body).BoxOffice)
                console.log("")
                console.log("* * * * * * * * * * * * * * * * * * ")
                console.log("")

            }

        })

    },

    // Search function for random search

    randomSearch: () => {
        const fs = require("fs");

        fs.readFile("random.txt", "utf8", function(error, random) {
            if (error) {
                return console.log(error);
            }

            // We will then print the contents of data
            //console.log(random);

            var randomArray = random.split(",");

            apiCommand = randomArray[0]
            searchTerm = randomArray[1]
            liriBot.spotifySearch()

        })
    },

    writeToLog: () => {
        let fs = require("fs");


    }
}

// Switch Statement to switch between various search triggers
switch (apiCommand) {

    case "my-tweets":
        liriBot.latestTweets()
        break

    case "spotify-this-song":
        liriBot.spotifySearch()
        break

    case "movie-this":
        liriBot.movieSearch()
        break

    case "do-what-it-says":
        liriBot.randomSearch()
        break
}