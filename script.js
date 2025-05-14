// Sample songs array
const songs = [
  { title: "Pretty Little Baby", artist: "Connie Francis", src: "music/song1.mp3", cover: "images/cover1.jpg" },
  { title: "Daylight", artist: "David Kushner", src: "music/song2.mp3", cover: "images/cover2.jpg" },
  { title: "Lonely", artist: "Akon", src: "music/song3.mp3", cover: "images/cover3.jpg" },
  { title: "Die With A Smile", artist: "Lady Gaga, Bruno Mars", src: "music/song4.mp3", cover: "images/cover4.jpg" },
  { title: "Unstoppable", artist: "Sia", src: "music/song5.mp3", cover: "images/cover5.jpg" },
  { title: "BIRDS OF A FEATHER", artist: "Billie Eilish", src: "music/song6.mp3", cover: "images/cover6.jpg" },
  { title: "Until I Found You", artist: "Stephen Sanchez", src: "music/song7.mp3", cover: "images/cover7.jpg" },
  { title: "Tu hai kahan", artist: "AUR", src: "music/song8.mp3", cover: "images/cover8.jpg" },
  { title: "Jo Tum Mere Ho", artist: "Anuv Jain", src: "music/song9.mp3", cover: "images/cover9.jpg" },
  { title: "Finding Her", artist: "Bharath, Kushagra, and Saaheal", src: "music/song10.mp3", cover: "images/cover10.jpg" },
  { title: "Kabhi Kabhi", artist: "AUR", src: "music/song11.mp3", cover: "images/cover11.jpg" },
  { title: "Dil Tu Jaan Tu", artist: "Chet Singh and Gurnazar", src: "music/song12.mp3", cover: "images/cover12.jpg" },
  { title: "Love Me Like You Do", artist: "Ellie Goulding", src: "music/song13.mp3", cover: "images/cover13.jpg" },
  { title: "Summertime Sadness", artist: "Lana Del Rey", src: "music/song14.mp3", cover: "images/cover14.jpg" },
  { title: "ANXIETY", artist: "Sleepy Hallow", src: "music/song15.mp3", cover: "images/cover15.jpg" },
  { title: "Wildflower", artist: "Billie Eilish and FINNEAS", src: "music/song16.mp3", cover: "images/cover16.jpg" },
  { title: "blue", artist: "Yung Kai", src: "music/song17.mp3", cover: "images/cover17.jpg" },
  { title: "Another Love", artist: "Tom Odell", src: "music/song18.mp3", cover: "images/cover18.jpg" },
  { title: "7 Years", artist: "Jasmine Thompson", src: "music/song19.mp3", cover: "images/cover19.jpg" },
  { title: "Skyfall", artist: "Adele", src: "music/song20.mp3", cover: "images/cover20.jpg" },
  { title: "Cheri Cheri Lady", artist: "Modern Talking", src: "music/song21.mp3", cover: "images/cover21.jpg" }
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