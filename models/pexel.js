const { createClient } = require('pexels');
const { pexels_config } = require('./../config/config.json')
const {download} = require('./my_utils')

async function lets_pexel(query, project_directory){
    try {
        const client = createClient(pexels_config.key);      
        const results = await client.photos.search({ query });
        
        for(photo of results.photos){
            const photo_path = project_directory + 'pexel-photos-' + photo.id + '.jpeg';
            await download(photo.src.landscape, photo_path)
        }
        return 'success';
    } 
    catch (error) {
        console.log('error')
        console.log(error)
    }
}

module.exports.lets_pexel = lets_pexel;