const wrapper = document.querySelector(".wrapper"),
  // myImg = wrapper.querySelector(".img-area .img"),
  songName = wrapper.querySelector(".song-details .name"),
  songArtist = wrapper.querySelector(".song-details .artist"),
  favorites = wrapper.querySelector(".plist .favorites"),
  pList = wrapper.querySelector(".plist .music-queue"),
  progressArea = wrapper.querySelector(".progress-area"),
  progressBar = wrapper.querySelector(".progress-bar"),
  mainAudio = wrapper.querySelector("#main-audio"),
  songDur = wrapper.querySelector(".song-duration"),
  curTime = wrapper.querySelector(".current-time"),
  endTime = wrapper.querySelector(".end-time"),
  shuffle = wrapper.querySelector("#shuffle"),
  prev = wrapper.querySelector("#prev"),
  next = wrapper.querySelector("#next"),
  playPauseBtn = wrapper.querySelector(".play-pause"),
  repeat = wrapper.querySelector("#repeat"),
  musicList = wrapper.querySelector(".music-list"),
  closeBtn = wrapper.querySelector(".headings #close"),
  ul = wrapper.querySelector("ul"),
  vol = wrapper.querySelector(".volume"),
  volumeBtn = wrapper.querySelector("#volumeBtn"),
  volumeArea = wrapper.querySelector(".volume-area"),
  volumeBar = wrapper.querySelector(".volume-bar"),
  layer1 = document.getElementById("l1"),
  layer2 = document.getElementById("l2"),
  layer3 = document.getElementById("l3");
audDur = wrapper.querySelector(".row .audio-duration");
let musicIndex = Math.floor(Math.random() * allMusic.length + 1);

window.addEventListener("load", () => {
  loadMusic(musicIndex);
});

let check = false;
setInterval(() => {
  if (!check) {
    layer1.style.transform = "rotate(45deg)";
    layer2.style.transform = "rotate(90deg)";
    layer3.style.transform = "rotate(90deg)";
  }
  else {
    layer1.style.transform = "rotate(0deg)";
    layer2.style.transform = "rotate(0deg)";
    layer3.style.transform = "rotate(0deg)";
  }
  check = !check;
}, 2000);

function loadMusic(indxNum) {
  songName.innerText = allMusic[indxNum - 1].name;
  songArtist.innerText = allMusic[indxNum - 1].artist;
  layer1.style.setProperty("background", `url(/images/${allMusic[indxNum - 1].img}.jpg)`);
  layer2.style.setProperty("background", `url(/images/${allMusic[indxNum - 1].img}.jpg)`);
  layer3.style.setProperty("background", `url(/images/${allMusic[indxNum - 1].img}.jpg)`);
  layer1.style.setProperty("background-size", `256px 256px`);
  layer2.style.setProperty("background-size", `256px 256px`);
  layer3.style.setProperty("background-size", `256px 256px`);
  layer1.style.setProperty("background-position", `center`);
  layer2.style.setProperty("background-position", `center`);
  layer3.style.setProperty("background-position", `center`);
  layer1.style.setProperty("background-repeat", `no-repeat`);
  layer2.style.setProperty("background-repeat", `no-repeat`);
  layer3.style.setProperty("background-repeat", `no-repeat`);
  // myImg.src = `images/${allMusic[indxNum - 1].img}.jpg`;
  mainAudio.src = `songs/${allMusic[indxNum - 1].src}.mp3`;
}


let l = allMusic.length;
//Add all music to music list
for (let i = 0; i < l; i++) {
  let LI = document.createElement('li');

  LI.innerHTML = `<div class="row">
 <span>${allMusic[i].name}</span>
 <p>${allMusic[i].artist}</p>
 </div>
 <span id="${allMusic[i].src}">0:00</span>
 <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3" ></audio>`;
  ul.append(LI);
  let x = ul.querySelector(`#${allMusic[i].src}`);
  let y = ul.querySelector(`.${allMusic[i].src}`);
  y.addEventListener("loadeddata", () => {
    let r = Math.floor(y.duration / 60), t = Math.floor(y.duration % 60);
    console.log(r, t);
    if (t < 10) {
      x.innerHTML = `${r}:0${t}`;
    }
    else {
      x.innerHTML = `${r}:${t}`;
    }
  });
}


// Play/Pause Song
function playPause() {
  let x = ul.querySelector(`#${allMusic[musicIndex - 1].src}`);
  x.innerHTML = `playing`;
  if (playPauseBtn.classList.contains('pause')) {
    mainAudio.pause();
    playPauseBtn.classList.remove('pause');
    playPauseBtn.querySelector('i').innerText = "play_arrow";
  }
  else {
    mainAudio.play();
    playPauseBtn.classList.add('pause');
    playPauseBtn.querySelector('i').innerText = "pause";
  }
}


// Seek Funtionality
progressArea.addEventListener("click", (e) => {
  let y = (e.offsetX * 100) / progressArea.offsetWidth;
  mainAudio.currentTime = (y * mainAudio.duration) / 100;
});

volumeArea.addEventListener("click", (e) => {
  // let y = (e.offsetY * 100) / volumeArea.offsetWidth;
  const yFromBottom = (e.offsetY) / volumeArea.offsetHeight;
  mainAudio.volume = yFromBottom;
  volumeBar.style.height = `${yFromBottom * 100}%`;
});

next.addEventListener("click", () => {
  let x = ul.querySelector(`#${allMusic[musicIndex - 1].src}`);
  let y = ul.querySelector(`.${allMusic[musicIndex - 1].src}`);

  let r = Math.floor(y.duration / 60), t = Math.floor(y.duration % 60);
  if (t < 10) {
    x.innerHTML = `${r}:0${t}`;
  }
  else {
    x.innerHTML = `${r}:${t}`;
  }
  if (shuffle.classList.contains("shuffled")) {
    let musIdx = musicIndex;
    while (musIdx == musicIndex) {
      musIdx = Math.floor(Math.random() * allMusic.length + 1);
    }
    musicIndex = musIdx;
    loadMusic(musicIndex);
    if (playPauseBtn.classList.contains("pause")) {
      playPauseBtn.classList.remove("pause");
    }
    else {
      playPauseBtn.classList.add("pause");
    }
    playPause();
  }
  else {
    nextMusic();
  }
});

prev.addEventListener("click", () => {
  let x = ul.querySelector(`#${allMusic[musicIndex - 1].src}`);
  let y = ul.querySelector(`.${allMusic[musicIndex - 1].src}`);

  let r = Math.floor(y.duration / 60), t = Math.floor(y.duration % 60);
  if (t < 10) {
    x.innerHTML = `${r}:0${t}`;
  }
  else {
    x.innerHTML = `${r}:${t}`;
  }

  if (shuffle.classList.contains("shuffled")) {
    let musIdx = musicIndex;
    while (musIdx == musicIndex) {
      musIdx = Math.floor(Math.random() * allMusic.length + 1);
    }
    musicIndex = musIdx;
    loadMusic(musicIndex);
    if (playPauseBtn.classList.contains("pause")) {
      playPauseBtn.classList.remove("pause");
    }
    else {
      playPauseBtn.classList.add("pause");
    }
    playPause();
  }
  else {
    prevMusic();
  }

});

volumeBtn.addEventListener("click", () => {
  vol.classList.toggle("volumeshow");
});

// PlayList Display
pList.addEventListener("click", () => {
  musicList.classList.toggle("show");
});
// PlayList Close
closeBtn.addEventListener("click", () => {
  musicList.classList.toggle("show");
});

playPauseBtn.addEventListener("click", () => {
  playPause();
});
shuffle.addEventListener("click", () => {
  shuffleSong();
});
repeat.addEventListener("click", () => {
  repeatSong();
});


// Shuffle Song
function shuffleSong() {
  if (shuffle.classList.contains("shuffled")) {
    shuffle.classList.toggle("shuffled");
    shuffle.style.color = `var(--lightgray)`;
    shuffle.innerText = "shuffle";
  }
  else {
    shuffle.classList.toggle("shuffled");
    shuffle.style.color = `var(--lemongreen)`;
  }
}

// Repeat Song
function repeatSong() {
  if (repeat.classList.contains("repeat_one")) {
    repeat.classList.toggle("repeat_one");
    repeat.innerText = "repeat";
    repeat.style.color = "var(--lightgray)";
  }
  else {
    repeat.classList.toggle("repeat_one");
    repeat.innerText = "repeat_one";
    repeat.style.color = "var(--lemongreen)";

  }
}

//Next Music
function nextMusic() {
  if (musicIndex < allMusic.length) {
    musicIndex++;
  }
  else {
    musicIndex = 1;
  }
  if (playPauseBtn.classList.contains("pause")) {
    playPauseBtn.classList.remove("pause");
  }
  else {
    playPauseBtn.classList.add("pause");
  }
  loadMusic(musicIndex);
  progressBar.style.width = "0%";
  playPause();

}


//Prev Music
function prevMusic() {
  if (musicIndex > 1) {
    musicIndex--;
  }
  else {
    musicIndex = allMusic.length;
  }
  if (playPauseBtn.classList.contains("pause")) {
    playPauseBtn.classList.remove("pause");
  }
  else {
    playPauseBtn.classList.add("pause");
  }
  loadMusic(musicIndex);
  progressBar.style.width = "0%";
  playPause();
}

// Song Duration
mainAudio.addEventListener("loadeddata", () => {
  if (Math.floor(mainAudio.duration % 60) < 10) {
    endTime.innerText = `${Math.floor(mainAudio.duration / 60)}:0${Math.floor(mainAudio.duration % 60)}`;
  }
  else {
    endTime.innerText = `${Math.floor(mainAudio.duration / 60)}:${Math.floor(mainAudio.duration % 60)}`;
  }
});
// Progress Bar Update Funtionality
mainAudio.addEventListener("timeupdate", () => {
  progressBar.style.width = `${(mainAudio.currentTime * 100) / mainAudio.duration}%`;
  if (Math.floor(mainAudio.currentTime % 60) < 10) {
    curTime.innerText = `${Math.floor(mainAudio.currentTime / 60)}:0${Math.floor(mainAudio.currentTime % 60)}`;
  }
  else {
    curTime.innerText = `${Math.floor(mainAudio.currentTime / 60)}:${Math.floor(mainAudio.currentTime % 60)}`;
  }
});



mainAudio.addEventListener("ended", () => {
  let x = ul.querySelector(`#${allMusic[musicIndex - 1].src}`);
  let y = ul.querySelector(`.${allMusic[musicIndex - 1].src}`);

  let r = Math.floor(y.duration / 60), t = Math.floor(y.duration % 60);
  if (t < 10) {
    x.innerHTML = `${r}:0${t}`;
  }
  else {
    x.innerHTML = `${r}:${t}`;
  }
  if (repeat.classList.contains("repeat_one")) {
    musicIndex--;
    nextMusic();
  }
  else {

    if (shuffle.classList.contains("shuffled")) {
      let musIdx = musicIndex;
      while (musIdx == musicIndex) {
        musIdx = Math.floor(Math.random() * allMusic.length + 1);
      }
      musicIndex = musIdx;
      loadMusic(musicIndex);
      if (playPauseBtn.classList.contains("pause")) {
        playPauseBtn.classList.remove("pause");
      }
      else {
        playPauseBtn.classList.add("pause");
      }
      playPause();
    }
    else {
      nextMusic();
    }
  }
});

const liList = ul.querySelectorAll('li');

liList.forEach((liTag, idx) => {
  liTag.addEventListener('click', () => {
    let x = ul.querySelector(`#${allMusic[musicIndex - 1].src}`);
    let y = ul.querySelector(`.${allMusic[musicIndex - 1].src}`);

    let r = Math.floor(y.duration / 60), t = Math.floor(y.duration % 60);
    if (t < 10) {
      x.innerHTML = `${r}:0${t}`;
    }
    else {
      x.innerHTML = `${r}:${t}`;
    }
    musicIndex = idx + 1;
    loadMusic(musicIndex);
    if (playPauseBtn.classList.contains("pause")) {
      playPauseBtn.classList.remove("pause");
    }
    else {
      playPauseBtn.classList.add("pause");
    }

    playPause(musicIndex);
  });
});













