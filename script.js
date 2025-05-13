class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement
    this.currentOperandElement = currentOperandElement
    this.clear()
  }

  clear() {
    this.currentOperand = "0"
    this.previousOperand = ""
    this.operation = undefined
    this.shouldResetScreen = false
  }

  delete() {
    if (this.currentOperand === "0") return
    if (this.currentOperand.length === 1) {
      this.currentOperand = "0"
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1)
    }
  }

  appendNumber(number) {
    if (this.shouldResetScreen) {
      this.currentOperand = ""
      this.shouldResetScreen = false
    }

    if (number === "." && this.currentOperand.includes(".")) return
    if (this.currentOperand === "0" && number !== ".") {
      this.currentOperand = number
    } else {
      this.currentOperand += number
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return

    if (this.previousOperand !== "") {
      this.compute()
    }

    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ""
  }

  compute() {
    let computation
    const prev = Number.parseFloat(this.previousOperand)
    const current = Number.parseFloat(this.currentOperand)

    if (isNaN(prev) || isNaN(current)) return

    switch (this.operation) {
      case "+":
        computation = prev + current
        break
      case "-":
        computation = prev - current
        break
      case "×":
        computation = prev * current
        break
      case "÷":
        if (current === 0) {
          this.currentOperand = "Error"
          this.previousOperand = ""
          this.operation = undefined
          this.shouldResetScreen = true
          return
        }
        computation = prev / current
        break
      default:
        return
    }

    this.currentOperand = computation.toString()
    this.operation = undefined
    this.previousOperand = ""
    this.shouldResetScreen = true
  }

  getDisplayNumber(number) {
    if (number === "Error") return "Error"

    const stringNumber = number.toString()
    const integerDigits = Number.parseFloat(stringNumber.split(".")[0])
    const decimalDigits = stringNumber.split(".")[1]

    let integerDisplay

    if (isNaN(integerDigits)) {
      integerDisplay = ""
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      })
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandElement.textContent = this.getDisplayNumber(this.currentOperand)

    if (this.operation != null) {
      this.previousOperandElement.textContent = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandElement.textContent = ""
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const previousOperandElement = document.getElementById("previous-operand")
  const currentOperandElement = document.getElementById("current-operand")
  const calculator = new Calculator(previousOperandElement, currentOperandElement)

  // Number buttons
  document.querySelectorAll("[data-number]").forEach((button) => {
    button.addEventListener("click", () => {
      calculator.appendNumber(button.getAttribute("data-number"))
      calculator.updateDisplay()
    })
  })

  // Operation buttons
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-action")

      switch (action) {
        case "add":
          calculator.chooseOperation("+")
          break
        case "subtract":
          calculator.chooseOperation("-")
          break
        case "multiply":
          calculator.chooseOperation("×")
          break
        case "divide":
          calculator.chooseOperation("÷")
          break
        case "equals":
          calculator.compute()
          break
        case "clear":
          calculator.clear()
          break
        case "delete":
          calculator.delete()
          break
      }

      calculator.updateDisplay()
    })
  })

  // Keyboard support
  document.addEventListener("keydown", (event) => {
    if (/^[0-9]$/.test(event.key)) {
      calculator.appendNumber(event.key)
    } else if (event.key === ".") {
      calculator.appendNumber(".")
    } else if (event.key === "+") {
      calculator.chooseOperation("+")
    } else if (event.key === "-") {
      calculator.chooseOperation("-")
    } else if (event.key === "*") {
      calculator.chooseOperation("×")
    } else if (event.key === "/") {
      event.preventDefault()
      calculator.chooseOperation("÷")
    } else if (event.key === "Enter" || event.key === "=") {
      event.preventDefault()
      calculator.compute()
    } else if (event.key === "Escape") {
      calculator.clear()
    } else if (event.key === "Backspace") {
      calculator.delete()
    }

    calculator.updateDisplay()
  })
})

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const musicContainer = document.querySelector(".music-player")
  const playBtn = document.getElementById("play")
  const prevBtn = document.getElementById("prev")
  const nextBtn = document.getElementById("next")
  const audio = new Audio()
  const progress = document.getElementById("progress")
  const progressContainer = document.querySelector(".progress-bar")
  const title = document.getElementById("title")
  const artist = document.getElementById("artist")
  const cover = document.getElementById("cover")
  const currentTimeEl = document.getElementById("current-time")
  const durationEl = document.getElementById("duration")
  const volumeLevel = document.getElementById("volume-level")
  const volumeBar = document.querySelector(".volume-bar")
  const playlistContainer = document.querySelector(".playlist")
  const playlistSongs = document.getElementById("playlist-songs")
  const togglePlaylistBtn = document.querySelector(".toggle-playlist")

  // State
  let songIndex = 0
  let isPlaying = false
  let updateTimer

  // Songs data
  const songs = [
    {
      title: "Summer Vibes",
      artist: "John Smith",
      coverPath: "/placeholder.svg?height=300&width=300",
      audioPath: "https://example.com/audio1.mp3", // Replace with actual audio path
      duration: "3:45",
    },
    {
      title: "Chill Beats",
      artist: "Sarah Johnson",
      coverPath: "/placeholder.svg?height=300&width=300",
      audioPath: "https://example.com/audio2.mp3", // Replace with actual audio path
      duration: "4:20",
    },
    {
      title: "Midnight Dreams",
      artist: "Michael Brown",
      coverPath: "/placeholder.svg?height=300&width=300",
      audioPath: "https://example.com/audio3.mp3", // Replace with actual audio path
      duration: "3:10",
    },
    {
      title: "Ocean Waves",
      artist: "Emily Davis",
      coverPath: "/placeholder.svg?height=300&width=300",
      audioPath: "https://example.com/audio4.mp3", // Replace with actual audio path
      duration: "5:15",
    },
    {
      title: "Urban Jungle",
      artist: "David Wilson",
      coverPath: "/placeholder.svg?height=300&width=300",
      audioPath: "https://example.com/audio5.mp3", // Replace with actual audio path
      duration: "4:05",
    },
  ]

  // For demo purposes, we'll simulate audio playback
  let audioPlaying = false
  let audioCurrentTime = 0
  let audioDuration = 180 // 3 minutes in seconds
  let simulationInterval

  // Initialize the music player
  function init() {
    // Load song details
    loadSong(songs[songIndex])

    // Create playlist items
    createPlaylist()

    // Set initial volume
    audio.volume = 0.5
    volumeLevel.style.width = "50%"

    // Add event listeners
    playBtn.addEventListener("click", togglePlay)
    prevBtn.addEventListener("click", prevSong)
    nextBtn.addEventListener("click", nextSong)
    progressContainer.addEventListener("click", setProgress)
    volumeBar.addEventListener("click", setVolume)
    togglePlaylistBtn.addEventListener("click", togglePlaylist)

    // For demo purposes, we'll simulate timeupdate event
    simulateAudioEvents()
  }

  // Create playlist items
  function createPlaylist() {
    playlistSongs.innerHTML = ""

    songs.forEach((song, index) => {
      const li = document.createElement("li")
      li.classList.add("playlist-item")
      if (index === songIndex) {
        li.classList.add("active")
      }

      li.innerHTML = `
                <div class="song-number">${index + 1}</div>
                <div class="song-info">
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
                <div class="song-duration">${song.duration}</div>
            `

      li.addEventListener("click", () => {
        songIndex = index
        loadSong(songs[songIndex])
        if (isPlaying) {
          playSong()
        }
        updateActivePlaylistItem()
      })

      playlistSongs.appendChild(li)
    })
  }

  // Update active playlist item
  function updateActivePlaylistItem() {
    const playlistItems = document.querySelectorAll(".playlist-item")
    playlistItems.forEach((item, index) => {
      if (index === songIndex) {
        item.classList.add("active")
      } else {
        item.classList.remove("active")
      }
    })
  }

  // Toggle playlist visibility
  function togglePlaylist() {
    playlistContainer.classList.toggle("show")
  }

  // Load song details
  function loadSong(song) {
    title.textContent = song.title
    artist.textContent = song.artist
    cover.src = song.coverPath

    // In a real application, you would set the audio source
    // audio.src = song.audioPath;

    // For demo purposes, reset simulation
    audioCurrentTime = 0
    audioDuration = convertTimeStringToSeconds(song.duration)
    updateTimeDisplay()
  }

  // Convert time string (e.g., "3:45") to seconds
  function convertTimeStringToSeconds(timeString) {
    const [minutes, seconds] = timeString.split(":").map(Number)
    return minutes * 60 + seconds
  }

  // Play song
  function playSong() {
    musicContainer.classList.add("play")
    playBtn.querySelector("i").classList.remove("fa-play")
    playBtn.querySelector("i").classList.add("fa-pause")

    // In a real application, you would play the audio
    // audio.play();

    // For demo purposes, start simulation
    audioPlaying = true
    startSimulation()

    isPlaying = true
  }

  // Pause song
  function pauseSong() {
    musicContainer.classList.remove("play")
    playBtn.querySelector("i").classList.add("fa-play")
    playBtn.querySelector("i").classList.remove("fa-pause")

    // In a real application, you would pause the audio
    // audio.pause();

    // For demo purposes, pause simulation
    audioPlaying = false

    isPlaying = false
  }

  // Toggle play/pause
  function togglePlay() {
    if (isPlaying) {
      pauseSong()
    } else {
      playSong()
    }
  }

  // Previous song
  function prevSong() {
    songIndex--

    if (songIndex < 0) {
      songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])
    updateActivePlaylistItem()

    if (isPlaying) {
      playSong()
    }
  }

  // Next song
  function nextSong() {
    songIndex++

    if (songIndex > songs.length - 1) {
      songIndex = 0
    }

    loadSong(songs[songIndex])
    updateActivePlaylistItem()

    if (isPlaying) {
      playSong()
    }
  }

  // Update progress bar
  function updateProgress() {
    const progressPercent = (audioCurrentTime / audioDuration) * 100
    progress.style.width = `${progressPercent}%`

    updateTimeDisplay()
  }

  // Update time display
  function updateTimeDisplay() {
    currentTimeEl.textContent = formatTime(audioCurrentTime)
    durationEl.textContent = formatTime(audioDuration)
  }

  // Format time to MM:SS
  function formatTime(seconds) {
    const min = Math.floor(seconds / 60)
    const sec = Math.floor(seconds % 60)
    return `${min}:${sec < 10 ? "0" + sec : sec}`
  }

  // Set progress bar
  function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audioDuration

    audioCurrentTime = (clickX / width) * duration
    updateProgress()
  }

  // Set volume
  function setVolume(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const volumePercent = clickX / width

    volumeLevel.style.width = `${volumePercent * 100}%`

    // In a real application, you would set the audio volume
    // audio.volume = volumePercent;
  }

  // Simulate audio events for demo purposes
  function simulateAudioEvents() {
    // Update progress every second when playing
    setInterval(() => {
      if (audioPlaying) {
        audioCurrentTime += 1

        if (audioCurrentTime >= audioDuration) {
          audioCurrentTime = 0
          nextSong()
        }

        updateProgress()
      }
    }, 1000)
  }

  // Start simulation
  function startSimulation() {
    // This function would be used in a real implementation
    // to handle additional simulation logic if needed
  }

  // Initialize the player
  init()
})
