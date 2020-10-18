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

}

module.exports.download = download;
module.exports.createFolder = createFolder;
module.exports.download_images = download_images;
module.exports.download_sound = download_sound;