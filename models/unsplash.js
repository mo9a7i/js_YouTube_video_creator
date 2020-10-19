const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;
const { unsplash_config } = require('./../config/config.json')
const {download} = require('./my_utils')

async function lets_unsplash(query, project_directory){
    console.log('started lets_unsplash')
    try {
        const unsplash = new Unsplash({ accessKey: unsplash_config.key });
        const result = await toJson(await unsplash.search.photos(query, 1, 10, {orientation: 'landscape'}))

        if(result.total >= 1){
            for(photo of result.results){
                const photo_path = project_directory + 'images/raw/' + 'usplash-photos-' + photo.id + '.jpeg';
                await download(photo.urls.regular , photo_path)
            }
        }
        return 'success';
    } 
    catch (error) {
        console.log('error')
        console.log(error)
    }
}

module.exports.lets_unsplash = lets_unsplash;