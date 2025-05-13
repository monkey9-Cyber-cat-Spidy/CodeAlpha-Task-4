# JavaScript Music Player

## Overview

A feature-rich, responsive web-based music player built with HTML, CSS, and JavaScript. This application allows users to play audio tracks with a clean, intuitive interface featuring playback controls, playlist management, and track information display.

## Features

- **Audio Playback**: Play, pause, and stop functionality
- **Track Navigation**: Next and previous track buttons
- **Progress Bar**: Visual representation of playback progress with seek functionality
- **Volume Control**: Adjustable volume with mute option
- **Playlist Management**: View and select tracks from a playlist
- **Track Information**: Display current track title, artist, and album art
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Keyboard Controls**: Control playback using keyboard shortcuts
- **Local Storage**: Remember last played track and volume settings (optional)
- **Visualizations**: Audio visualizations using canvas (optional)

## Technologies Used

- **HTML5**: 
  - Semantic markup
  - HTML5 Audio API
- **CSS3**: 
  - Flexbox and Grid for layouts
  - CSS animations and transitions
  - Media queries for responsiveness
- **JavaScript**: 
  - Audio manipulation
  - DOM manipulation
  - Event handling
  - Local storage (optional)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/monkey9-Cyber-cat-Spidy/CodeAlpha-Task-4.git
   cd music-player
   ```

2. **Add music files**
   - Place your audio files in the `audio/` directory
   - Supported formats: MP3, WAV, OGG (depends on browser support)

3. **Update track list**
   - Edit the `script.js` file to include your tracks in the `songs` array

4. **Open in a browser**
   - Simply open the `index.html` file in any modern web browser
   - Alternatively, use a local development server:
   ```bash
   # Using Python
   python -m http.server

   # Using Node.js (with http-server installed)
   npx http-server
   ```

## Project Structure

```
music-player/
│
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── audio/              # Directory for audio files
│   ├── track1.mp3
│   ├── track2.mp3
│   └── ...
└── images/             # Directory for album art and icons
    ├── cover1.jpg
    ├── cover2.jpg
    └── ...
```

## Usage

### Basic Controls

- **Play/Pause**: Click the play/pause button to start or pause playback
- **Next/Previous**: Navigate between tracks using the next and previous buttons
- **Volume**: Adjust volume using the volume slider
- **Seek**: Click anywhere on the progress bar to jump to that position in the track
- **Playlist**: Click on a track in the playlist to play it

### Keyboard Controls

- **Space**: Play/Pause
- **Left Arrow**: Previous track
- **Right Arrow**: Next track
- **Up Arrow**: Increase volume
- **Down Arrow**: Decrease volume
- **M**: Mute/Unmute

## Implementation Details

### Audio Handling

The music player uses the HTML5 Audio API to handle audio playback:

```javascript
// Create audio element
const audio = new Audio();

// Play function
function playSong() {
  audio.play();
  updatePlayIcon();
}

// Pause function
function pauseSong() {
  audio.pause();
  updatePauseIcon();
}

// Event listeners for audio element
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
```

### Playlist Management

The playlist is managed using a JavaScript array of song objects:

```javascript
const songs = [
  {
    title: 'Song Title',
    artist: 'Artist Name',
    audioPath: 'audio/track1.mp3',
    coverPath: 'images/cover1.jpg'
  },
  // More songs...
];
```

## Customization

### Adding Tracks

Update the `songs` array in `script.js` with your own tracks:

```javascript
const songs = [
  {
    title: 'Your Song Title',
    artist: 'Artist Name',
    audioPath: 'audio/your-track.mp3',
    coverPath: 'images/your-cover.jpg',
    duration: '3:45' // Optional, will be calculated if not provided
  },
  // Add more songs here
];
```

### Styling

Modify the `styles.css` file to change the player's appearance:

- Update the color scheme
- Change the layout and dimensions
- Customize button styles
- Adjust animations and transitions

### Advanced Features

You can extend the music player with additional features:

- Shuffle and repeat modes
- Equalizer settings
- Playlist creation and management
- Audio visualizations using Canvas API
- Dark/Light theme toggle

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

Note: Audio format support varies by browser. MP3 has the best cross-browser support.

## Troubleshooting

### Common Issues

1. **Audio not playing**
   - Check if the audio file path is correct
   - Ensure the audio format is supported by your browser
   - Check browser console for errors

2. **Controls not working**
   - Check browser console for JavaScript errors
   - Ensure event listeners are properly attached

3. **Responsive issues**
   - Test on different devices and browsers
   - Check CSS media queries

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons from [Font Awesome](https://fontawesome.com/)
- Inspiration from various music streaming services