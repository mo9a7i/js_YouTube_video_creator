async function download(url, path) {
	const fetch = require('node-fetch');
	const util = require('util');
	const streamPipeline = util.promisify(require('stream').pipeline);
	const fs = require('fs')

	const response = await fetch(url);

	if (response.ok) {
		try {
			const saved = await streamPipeline(response.body, fs.createWriteStream(path));
			console.log(`✅ Done downloading ${path}`)
			return saved;
		} catch (error) {
			console.log(`⛔ Error downloading ${path}`)
		}
	}
	throw new Error(`unexpected response ${response.statusText}`);
};

function createFolder(project_name) {
	const fs = require('fs')
	const {
		folders_config
	} = require('./../config/config.json')

	const PROJECT_DIRECTORY = folders_config.base + project_name + '/';

	if (!fs.existsSync(PROJECT_DIRECTORY)) {
		fs.mkdirSync(PROJECT_DIRECTORY);
		fs.mkdirSync(PROJECT_DIRECTORY + 'images/');
		fs.mkdirSync(PROJECT_DIRECTORY + 'images/resized/');
		fs.mkdirSync(PROJECT_DIRECTORY + 'images/raw/');
	}
	return PROJECT_DIRECTORY;
}


async function download_images(query, dir) {
	const pexel = require('./../models/pexel')
	const unsplash = require('./../models/unsplash')

	let status = await pexel.lets_pexel(query, dir)
	console.log('finished pexel ' + status);
	status = await unsplash.lets_unsplash(query, dir)
	console.log('finished usplash ' + status);
	return 'success';
}


async function download_sound(url, type, dir) {
	switch (type) {
		case 'soundcloud':
			const soundcloud = require('./soundcloud')
			await soundcloud.get_track('https://soundcloud.com/naoya-sakamata/heartless-flock-sad-piano-music-naoyas-original-composition', dir)
			break;
		case 'Mangoes':
		case 'raw':
			console.log('Mangoes and papayas are $2.79 a pound.');
			break;
		default:
			console.log(`Sorry, couldn't understand the sound source.`);
	}

	return 'success';

}


async function resize_all_images(dir){
	console.log('resizing all images')
	const fs = require('fs')
	var _array = require('lodash/array');
	const path = require('path');
	let files = fs.readdirSync( dir + 'images/raw/');
	const allowed_extensions = ['jpg','jpeg','png'];

	try {
		for( const file of files ) {
	
			files = _array.remove(files, function(file) {
				return allowed_extensions.includes(getExtension(file));
			});
		}

		console.log(files);
		console.log(dir);
		console.log(files[5]);
		for( const file of files ) {
			const sharp = require('sharp');
			const filename = path.join( dir + 'images/raw', file);			
			const image = sharp(filename);
			const resized = image.resize({ height:720, width:1080});
			
			await resized.toFile(path.join(dir + 'images/resized/','1080_720_' + file));
			console.log("Image Resized: " + '1080_720_' + file)
		}
		
	} 
	catch (error) {
		console.log(error);
	}
}

function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i+1);
}

module.exports.download = download;
module.exports.createFolder = createFolder;
module.exports.download_images = download_images;
module.exports.download_sound = download_sound;
module.exports.resize_all_images = resize_all_images;
