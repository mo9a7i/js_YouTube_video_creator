# a NodeJS YouTube video creator

Create YouTube Videos from NodeJS

## Description

An automated tool that creates YouTube videos by combining audio from SoundCloud with visual elements. The program handles everything from audio extraction to video generation and YouTube uploading.

## Prerequisites

- Node.js (v12 or higher)
- YouTube API credentials
- SoundCloud API access

## Installation

```bash
npm install
```

## Configuration

1. Create `config/client_secret.json` with your YouTube API credentials
2. Update `config/config.json` with your settings:

```json
{
  "soundcloud": {
    "clientId": "your_client_id"
  },
  "youtube": {
    "credentials": "./config/client_secret.json"
  }
}
```

## Usage

```bash
node index.js
```

## Todo

* [ ] Find an Audio Visualizer
* [ ] Link with a wallpapers `royalty free` website to get image
* [x] give the video a SoundCloud link to extract audio
* [x] Link with YouTube API
* [ ] Add small text to the bottom right

## Steps

* Get the sound
* Get the wallpaper through an API
* Build responsive sound animator
* Putting everything together
* Post on YT

## Resources

[YouTube Data API Documentation](https://developers.google.com/youtube/v3)
[SoundCloud API Documentation](https://developers.soundcloud.com/)

## Features

- Audio extraction from SoundCloud
- Automatic video generation
- YouTube upload integration
- Background video/image integration

## Content From

* <https://www.soundcloud.com>
* <https://www.pexels.com/videos/> Keywords: `music, loud, vibrate`

## License

This project is licensed under the MIT License - see the LICENSE file for details.