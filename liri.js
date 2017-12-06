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

        let keys = require("./keys.js");
        let twitter = require("twitter")

    },

    // Search function for Spotify

    spotifySearch: () => {

    },

    // Search function for OMDB request

    movieSearch: () => {

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