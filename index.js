
// Install necessary libraries
// 1- Youtube Stuff
const youtube = require('./models/youtube')
// 2- Soundcloud
const soundcloud = require('./models/soundcloud')

// 3- HTTPS library
// 4- Movie Editing Library
// 5- Canvas
// 6- Audio API
// 7- Photos Library

// 9- Visuallization Library
/*
/	////////////////////
/	START THE JOB BROTHA
/ 	////////////////////
*/
const VideoShow = require('videoshow')
const fs = require('fs')
const { createFolder, download_images, download_sound } = require('./models/my_utils')


// CONSTANTS
const PROJECT_NAME = 'new_project';
const SOUNDCLOUD_URL = '';
const PHOTOS_SEARCH_QUERY = 'night club';

// CREATE PROJECT FOLDER
const PROJECT_DIRECTORY = createFolder(PROJECT_NAME);
console.log(PROJECT_DIRECTORY);

// DOWNLOAD THE IMAGES
download_images(PHOTOS_SEARCH_QUERY, PROJECT_DIRECTORY)

// DOWNLOAD SOUND
download_sound('https://soundcloud.com/naoya-sakamata/heartless-flock-sad-piano-music-naoyas-original-composition','soundcloud', PROJECT_DIRECTORY);

// COMBINE INTO A VIDEO



// IF ALL SUCCESS ZIP THE FOLDER AND DELETE IT