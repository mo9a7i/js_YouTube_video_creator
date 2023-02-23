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

function createFolder(project_name, createImageDirectories = true) {
	const fs = require('fs')
	const {
		folders_config
	} = require('./../config/config.json')

	const PROJECT_DIRECTORY = folders_config.base + project_name + '/';

	if (!fs.existsSync(PROJECT_DIRECTORY)) {
		fs.mkdirSync(PROJECT_DIRECTORY);

		if (createImageDirectories) {
			fs.mkdirSync(PROJECT_DIRECTORY + 'images/');
			fs.mkdirSync(PROJECT_DIRECTORY + 'images/resized/');
			fs.mkdirSync(PROJECT_DIRECTORY + 'images/raw/');
		}
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

async function resize_all_images(dir, maxWidth = 1080, maxHeight = 720) {
    const fs = require('fs');
    const path = require('path');
    const sharp = require('sharp');
    const allowed_extensions = ['jpg', 'jpeg', 'png'];
    const rawDir = path.join(dir, 'images', 'raw');
    const resizedDir = path.join(dir, 'images', 'resized');
    
    if (!fs.existsSync(rawDir)) {
        console.log(`The directory ${rawDir} does not exist.`);
        return;
    }
    
    if (!fs.existsSync(resizedDir)) {
        fs.mkdirSync(resizedDir, { recursive: true });
    }
    
    try {
        const files = fs.readdirSync(rawDir);
        
        for (const file of files) {
            const extension = path.extname(file).toLowerCase();
            if (!allowed_extensions.includes(extension)) {
                console.log(`The file ${file} has an invalid extension (${extension}). Skipping...`);
                continue;
            }
            
            const input = path.join(rawDir, file);
            const output = path.join(resizedDir, `resized_${file}`);
            
            const image = sharp(input);
            const metadata = await image.metadata();
            
            if (metadata.width <= maxWidth && metadata.height <= maxHeight) {
                console.log(`The image ${file} is already small enough. Skipping...`);
                continue;
            }
            
            let resizeOptions = { withoutEnlargement: true };
            if (metadata.width > maxWidth) {
                resizeOptions.width = maxWidth;
            }
            if (metadata.height > maxHeight) {
                resizeOptions.height = maxHeight;
            }
            
            await image
                .resize(resizeOptions)
                .toFile(output);
            console.log(`Resized image ${file} to ${resizeOptions.width}x${resizeOptions.height}.`);
        }
    } catch (error) {
        console.log(`An error occurred while resizing images: ${error.message}`);
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
