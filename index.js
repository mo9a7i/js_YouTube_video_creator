// Install necessary libraries
// 1- Google APIs Client to upload Youtube Videos
const {
	google
} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
// 2- Soundcloud Library
const SC = require('node-soundcloud')
// 3- HTTPS library
const https = require('https')
// 4- Movie Editing Library
// 5- Canvas
// 6- Audio API
// 7- 
// 8- FileSystem Library
const fs = require('fs');
const readline = require('readline');
const { file } = require('googleapis/build/src/apis/file');
// 9- Visuallization Library
/*
/	////////////////////
/	START THE JOB BROTHA
/ 	////////////////////
*/

process.exit();

// Youtube Stuff
// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
var SCOPES = [
	'https://www.googleapis.com/auth/youtube.readonly',
	'https://www.googleapis.com/auth/youtube.force-ssl',
	'https://www.googleapis.com/auth/youtube.upload'
];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('./config/client_secret.json', function processClientSecrets(err, content) {
	if (err) {
		console.log('Error loading client secret file: ' + err);
		return;
	}
	// Authorize a client with the loaded credentials, then call the YouTube API.
	authorize(JSON.parse(content), getChannel);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
	var clientSecret = credentials.installed.client_secret;
	var clientId = credentials.installed.client_id;
	var redirectUrl = credentials.installed.redirect_uris[0];
	var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

	// Check if we have previously stored a token.
	fs.readFile(TOKEN_PATH, function (err, token) {
		if (err) {
			getNewToken(oauth2Client, callback);
		} else {
			oauth2Client.credentials = JSON.parse(token);
			callback(oauth2Client);
		}
	});
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
	var authUrl = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES
	});
	console.log('Authorize this app by visiting this url: ', authUrl);
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.question('Enter the code from that page here: ', function (code) {
		rl.close();
		oauth2Client.getToken(code, function (err, token) {
			if (err) {
				console.log('Error while trying to retrieve access token', err);
				return;
			}
			oauth2Client.credentials = token;
			storeToken(token);
			callback(oauth2Client);
		});
	});
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
	try {
		fs.mkdirSync(TOKEN_DIR);
	} catch (err) {
		if (err.code != 'EEXIST') {
			throw err;
		}
	}
	fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
		if (err) throw err;
		console.log('Token stored to ' + TOKEN_PATH);
	});
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getChannel(auth) {
	var service = google.youtube('v3');
	service.channels.list({
		auth: auth,
		part: 'snippet,contentDetails,statistics',
		forUsername: 'GoogleDevelopers'
	}, function (err, response) {
		if (err) {
			console.log('The API returned an error: ' + err);
			return;
		}
		var channels = response.data.items;
		if (channels.length == 0) {
			console.log('No channel found.');
		} else {
			console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
				'it has %s views.',
				channels[0].id,
				channels[0].snippet.title,
				channels[0].statistics.viewCount);
		}
	});
}






// Simple soundcloud call
let track = '';
SC.get('/tracks/276882056', function (err, sc_track) {
	if (err) {
		throw err;
	} else {
		track = sc_track;
		console.log('track retrieved:', sc_track);
	}
});