// js to make the app work

let apiCommand = process.argv[2]

// Input for API call
let nodeArgs = process.argv;

// Empty String searchTerm to use for searching with the API
let searchTerm = ""

// Loop to capture all the terms after the process.argv[3] and making them the term to be searched
for (let i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {

        searchTerm = searchTerm + "+" + nodeArgs[i];

    } else {

        searchTerm += nodeArgs[i];

    }
}

let liriBot = {
    // Search function for Twitter

    latestTweets: () => {

        let twitterKeys = require("./keys.js")
        let twitter = require('twitter')

        let params = new twitter({ twitterKeys })
        params.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                console.log(error)
            }
            console.log(tweets)
        });

    },

    // Search function for Spotify

    spotifySearch: () => {
        let Spotify = require('node-spotify-api')

        let spotify = new Spotify({
            id: 2e254175821342adbe4f7539157342d7,
            secret: c9f6eb0b9def4b928ef8e8523ef80cb0
        });

        spotify.search({ type: 'track', query: searchTerm }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err)
            }

            console.log(data);
        });

    },

    // Search function for OMDB request

    movieSearch: () => {
        let request = require("request")

        let queryUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=5e4273b"

        console.log(queryUrl);

        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                //console.log(body)
                console.log("Title: " + JSON.parse(body).Title)
                console.log("Year Released: " + JSON.parse(body).Year)
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating)
                console.log("Metascore: " + JSON.parse(body).Metascore)
                console.log("Country: " + JSON.parse(body).Country)
                console.log("Language: " + JSON.parse(body).Language)
                console.log("Plot: " + JSON.parse(body).Plot)
                console.log("Staring: " + JSON.parse(body).Actors)
                console.log("US Box Office: " + JSON.parse(body).BoxOffice)

            }

        })

    },

    // Search function for random search

    randomSearch: () => {

    },

    writeToLog: () => {

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
