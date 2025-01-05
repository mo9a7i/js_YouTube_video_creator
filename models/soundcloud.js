/**
 * Downloads a track from SoundCloud
 * @async
 * @param {string} url - SoundCloud track URL
 * @param {string} path - Directory to save the track
 * @throws {Error} If download fails or track is unavailable
 */
async function get_track(url, path) {
    try {
        const output_file_path = path + 'track.mp3';
        const CLIENT_ID = 's51g1yFKlR5Rcl9OHi0MNk7PC6XvXw0y'

        const stream = await SC.download(url);
        const saved = await streamPipeline(stream, fs.createWriteStream(output_file_path));
        console.log(`✅ Done downloading ${output_file_path}`)
    } catch (error) {
        console.log('failed to download track')
    }   
}

module.exports.get_track = get_track;