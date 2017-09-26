var action = process.argv[2];
var value = process.argv[3];
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var omdb = require('omdb-api-client');

//switch case for user input
switch (action) {
    case 'my-tweets':
        twitter();
        break;

    case 'spotify-this-song':
        spotifyFunc();
        break;

    case 'movie-this':
        movie();
        break;

    case 'do-what-it-says':
        doit();
        break;

    default:
        break;
}

// twitter function
function twitter() {
    // assigning the keys
    var client = new Twitter({
        consumer_key: 'HmCxcuDeQRiwslSveoziOSjo5',
        consumer_secret: 'Sgq2xVOWm8kn4KROklIu1KYTrA4vXkGfwpBN4xJONUXRV9VFFG',
        access_token_key: '912315256105525248-k35ta0sfGWMW7pMylFAMD7N0CPyJtRs',
        access_token_secret: '7Kg5xH6kJQDpwA2KtHceaFTLoN2NhxLZCsMggzHL8dZcN',
    });
    // search
    var params = { screen_name: 'Nick_M_McK' };


    // Twitter NPM
    client.get('statuses/user_timeline', params, function(error, tweets) {
        //log error
        if (error) {
            console.log(error);
        } else {
            // for loop to show tweets
            console.log("\n/////////////////TWEET ME////////////////\n");
            for (i = 0; i < tweets.length; i++) {
                // adds number to show order
                console.log((i + 1) + ". " + tweets[i].text);
            }
        }
    });
}


//Spotify Function
function spotifyFunc() {

    var spotifyNew = new Spotify({
        id: '7d2fe0c36fc24f8b918264acfc43f1c5',
        secret: 'ca2728862ffa436aaa0f910c3bb0cb3f'
    });

    Spotify
        .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
        .then(function(data) {
            console.log(data);
            spotify.search({ type: 'track', query: value || 'ace of base the sign' }, function(err, data) {
                if (err) {
                    console.log('Error occurred: ' + err);
                    return;
                } else {
                    var spotifyCall = data.tracks.items[0];

                    //Info from API
                    console.log("\n/////////////////SPOTIFY THIS////////////////\n");
                    var artist = spotifyCall.artists[0].name;
                    console.log("Artist: " + artist);
                    var song = spotifyCall.name;
                    console.log("Song name: " + song);
                    var preview = spotifyCall.preview_url;
                    console.log("Preview Link: " + preview);
                    var album = spotifyCall.album.name;
                    console.log("Album: " + album);
                }
            });
        })
        .catch(function(err) {
            console.error('Error occurred: ' + err);
        });
};



//OMDB Function
function movie() {
    console.log("Working movie")

    // instantiate
    var omdb = new APIClinet();
    // list a movie using promises
    omdb({ t: 'Mr. Nobody' }).list().then(function(movie) {
        log(value);
    }).catch(function(err) {
        log(err);
    });
};