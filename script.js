// Sample songs array
const songs = [
  {
    title: "Song One",
    artist: "Artist One",
    src: "music/song1.mp3",
    cover: "images/cover1.jpg",
  },
  {
    title: "Song Two",
    artist: "Artist Two",
    src: "music/song2.mp3",
    cover: "images/cover2.jpg",
  },
  {
    title: "Song Three",
    artist: "Artist Three",
    src: "music/song3.mp3",
    cover: "images/cover3.jpg",
  },
];

const audio = new Audio();
let currentSong = 0;

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const volumeLevel = document.getElementById("volume-level");
const playlistEl = document.getElementById("playlist-songs");

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
}

function togglePlay() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
}

function updateProgress() {
  const { duration, currentTime } = audio;
  progress.style.width = `${(currentTime / duration) * 100}%`;

  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
}

function setProgress(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function setVolume(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  const volume = clickX / width;

  audio.volume = volume;
  volumeLevel.style.width = `${volume * 100}%`;
}

function populatePlaylist() {
  playlistEl.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
      currentSong = index;
      loadSong(songs[currentSong]);
      playSong();
    });
    playlistEl.appendChild(li);
  });
}

// Event Listeners
playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);

document.querySelector(".progress-bar").addEventListener("click", setProgress);
document.querySelector(".volume-bar").addEventListener("click", setVolume);

document.querySelector(".toggle-playlist").addEventListener("click", () => {
  document.querySelector(".playlist").classList.toggle("show");
});

// Init
loadSong(songs[currentSong]);
populatePlaylist();