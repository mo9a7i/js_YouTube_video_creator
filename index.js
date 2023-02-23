
// Install necessary libraries
// 1- Youtube Stuff
const youtube = require('./models/youtube')
// 2- Soundcloud
const soundcloud = require('./models/soundcloud')

// 3- HTTPS library
// 4- Movie Editing Library
// 5- Canvas
const { createCanvas, loadImage } = require('canvas');

// 6- Audio API
// 7- Photos Library

// 9- Visuallization Library
//const {Wave} = require("./models/visualizer/bundle.cjs")

//const wave = new Wave();


/*
/	////////////////////
/	START THE JOB BROTHA
/ 	////////////////////
*/
const VideoShow = require('videoshow')
const fs = require('fs')
const { createFolder, download_images, download_sound, resize_all_images } = require('./models/my_utils')


// CONSTANTS
const PROJECT_NAME = 'new_project';
const SOUNDCLOUD_URL = '';
const PHOTOS_SEARCH_QUERY = 'night club';

// CREATE PROJECT FOLDER
const PROJECT_DIRECTORY = createFolder(PROJECT_NAME);
console.log(PROJECT_DIRECTORY);

// DOWNLOAD THE IMAGES
//download_images(PHOTOS_SEARCH_QUERY, PROJECT_DIRECTORY)

// DOWNLOAD SOUND
//download_sound('https://soundcloud.com/naoya-sakamata/heartless-flock-sad-piano-music-naoyas-original-composition','soundcloud', PROJECT_DIRECTORY);

// Resize all images to fit
//resize_all_images(PROJECT_DIRECTORY)
// COMBINE INTO A VIDEO



// IF ALL SUCCESS ZIP THE FOLDER AND DELETE IT

//const fs = require('fs');
const { Wave } = require('./models/wave.js');

const puppeteer = require('puppeteer');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const wav = require('node-wav');



// async function create_waveform(audioFilePath, outputDir) {
//     // create output directory if it does not exist
//     if (!fs.existsSync(outputDir)) {
//       fs.mkdirSync(outputDir);
//     }
  
//     console.log('hi 🪟🪟🪟🪟')
//     // create waveform object
    
//     // convert audio file to wav
//     const audioFileName = path.basename(audioFilePath);
//     const audioFileNameWithoutExt = audioFileName.slice(0, audioFileName.lastIndexOf('.'));
//     const audioWavPath = path.join(outputDir, `${audioFileNameWithoutExt}.wav`);
//     await new Promise((resolve, reject) => {
//         ffmpeg(audioFilePath)
//         .toFormat('wav')
//         .on('error', (err) => reject(err))
//         .on('end', () => resolve())
//         .save(audioWavPath);
//     });

//     // read audio data
//     const audioData = fs.readFileSync(audioWavPath);
//     const audio = wav.decode(audioData);

//     const canvas = createCanvas(1920, 1080);
//     const ctx = canvas.getContext('2d');

//     const wave = new Wave(audio.channelData[0], canvas, false);
  
//     // set wave options
//     const options = {
//       type: 'bar',
//       barWidth: 4,
//       barGap: 1,
//       height: 200,
//       colors: ['#ffffff'],
//     };
  
//     // load audio file
    
//     //await wave.load(audioFilePath);
  
//     // calculate duration and number of frames (12 frames per second)
//     const duration = wave.getDuration();
//     const frameCount = duration * 12;
  
//     // create browser instance
//     const browser = await puppeteer.launch();
  
//     try {
//       // create new page
//       const page = await browser.newPage();
  
//       // set viewport size
//       await page.setViewport({ width: 1920, height: 1080 });
  
//       console.log('i am here')
//       // iterate over each frame
//       for (let i = 0; i < frameCount; i++) {
  
//         // render waveform at current time position
//         wave.render(options, canvas, ctx, (i / 12));
  
//         // save current frame to file
//         const frameNumber = i.toString().padStart(5, '0');
//         const filename = `frame-${frameNumber}.png`;
//         const filepath = `${outputDir}/${filename}`;
  
//         await page.setContent(`<img src="${canvas.toDataURL()}"/>`);
//         await page.screenshot({ path: filepath, fullPage: true });
  
//         console.log(`Frame ${i} saved to ${filepath}`);
//       }
//     } finally {
//       // close the browser instance
//       await browser.close();
//     }
// }
  
async function create_waveform(audioFilePath, outputDir) {
    // create output directory if it does not exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
  
    // create waveform object
    console.log('here ✅✅✅✅✅')
    const canvas = createCanvas(1920, 1080);
    const ctx = canvas.getContext('2d');
    console.log('here ✅✅✅✅✅')

    // set wave options
    const options = {
      type: 'bar',
      barWidth: 4,
      barGap: 1,
      height: 200,
      colors: ['#ffffff'],
    };
    console.log('here ✅✅✅✅✅')

    // create browser instance
    const browser = await puppeteer.launch();
    console.log('here ✅✅✅✅✅')

    try {
      // create new page
      const page = await browser.newPage();
      console.log('here ✅✅✅✅✅')

      // create audio element and set its src attribute to the audio file path
      await page.setContent(`
        <audio id="audio" src="${audioFilePath}" preload="auto"></audio>
      `);
      console.log('here ✅✅✅✅✅')

  
      // get the HTMLAudioElement from the page context
      const audioElement = await page.$('#audio');
      console.log('here 🔴🔴🔴🔴🔴🔴')


  
      // wait for the audio element to load
    //   await page.evaluate(() => new Promise(resolve => {
    //     const audio = document.getElementById('audio');
    //     audio.oncanplay = () => resolve();
    //   }));
      console.log('here 🔴🔴🔴🔴🔴🔴')

  
      // load the audio data into the Wave object
      const wave = new Wave(audioElement,canvas);
      await wave.load(audioElement);
  
      // calculate duration and number of frames (12 frames per second)
      const duration = wave.getDuration();
      const frameCount = duration * 12;
  
      // set viewport size
      await page.setViewport({ width: 1920, height: 1080 });
  
      // iterate over each frame
      for (let i = 0; i < frameCount; i++) {
        // create new canvas and context
        
  
        // render waveform at current time position
        wave.render(options, canvas, ctx, (i / 12));
  
        // save current frame to file
        const frameNumber = i.toString().padStart(5, '0');
        const filename = `frame-${frameNumber}.png`;
        const filepath = `${outputDir}/${filename}`;
  
        await page.setContent(`<img src="${canvas.toDataURL()}"/>`);
        await page.screenshot({ path: filepath, fullPage: true });
  
        console.log(`Frame ${i} saved to ${filepath}`);
      }
    } finally {
      // close the browser instance
      await browser.close();
    }
  }
  


async function run(){
    await create_waveform('./projects/new_project/track.mp3', 'waveform_output');
    console.log('hi')
}
run();