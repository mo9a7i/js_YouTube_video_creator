/**
 * @file Main entry point for YouTube video creator
 * @requires youtube
 * @requires soundcloud
 * @requires canvas
 * @requires videoshow
 * @requires puppeteer
 */

/**
 * Creates a waveform visualization from an audio file
 * @async
 * @param {string} audioFilePath - Path to the audio file
 * @param {string} outputDir - Directory to save the waveform frames
 * @throws {Error} If audio file cannot be loaded or frames cannot be generated
 */
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
  


/**
 * Main execution function
 * @async
 */
async function run(){
    await create_waveform('./projects/new_project/track.mp3', 'waveform_output');
    console.log('hi')
}
run();