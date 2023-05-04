const wrapper=document.querySelector(".wrapper"),
myImg=wrapper.querySelector(".img-area .img"),
songName=wrapper.querySelector(".song-details .name"),
songArtist=wrapper.querySelector(".song-details .artist"),
favorites=wrapper.querySelector(".plist .favorites"),
pList=wrapper.querySelector(".plist .music-queue"),
progressArea=wrapper.querySelector(".progress-area"),
progressBar=wrapper.querySelector(".progress-bar"),
mainAudio=wrapper.querySelector("#main-audio"),
songDur=wrapper.querySelector(".song-duration"),
curTime=wrapper.querySelector(".current-time"),
endTime=wrapper.querySelector(".end-time"),
shuffle=wrapper.querySelector("#shuffle"),
prev=wrapper.querySelector("#prev"),
next=wrapper.querySelector("#next"),
playPauseBtn=wrapper.querySelector(".play-pause"),
repeat=wrapper.querySelector("#repeat"),
musicList=wrapper.querySelector(".music-list"),
closeBtn=wrapper.querySelector(".headings #close"),
ul=wrapper.querySelector("ul"),
audDur=wrapper.querySelector(".row .audio-duration");

let musicIndex=2;
window.addEventListener("load", ()=>{
    loadMusic(musicIndex); 
  });
function loadMusic(indxNum)
{
  songName.innerText=allMusic[indxNum - 1].name;
  songArtist.innerText=allMusic[indxNum - 1].artist;
  myImg.src = `images/${allMusic[indxNum - 1].img}.jpg`;
  mainAudio.src=`songs/${allMusic[indxNum-1].src}.mp3`;
}


// Play/Pause Song
function playPause()
{
  if(playPauseBtn.classList.contains('pause'))
  {
    mainAudio.pause();
    playPauseBtn.classList.remove('pause');  
    playPauseBtn.querySelector('i').innerText="play_arrow";
  }
  else
  {
    mainAudio.play();
    playPauseBtn.classList.add('pause');   
    playPauseBtn.querySelector('i').innerText="pause";  
  }
}



function shuffleSong()
{
  if(shuffle.classList.contains("shuffled"))
  {
    shuffle.classList.remove("shuffled");
    shuffle.style.color =`var(--white)`;
  }
  else
  {
    shuffle.classList.add("shuffled");
    shuffle.style.color =`var(--lightgray)`;
    shuffle.innerText="shuffle";
  }
}

// Repeat Song
function repeatSong()
{
  if(repeat.classList.contains("repeat_one"))
  {
    repeat.classList.remove("repeat_one");
    repeat.innerText="repeat_one";
    repeat.style.color="var(--white)";
  }
  else
  {
    repeat.classList.add("repeat_one");
    repeat.innerText="repeat";
    repeat.style.color="var(--lightgray)";
  }
}

// Song Duration
mainAudio.addEventListener("loadeddata",()=>{
 if(Math.floor(mainAudio.duration%60)<10)
  {
    endTime.innerText=`${Math.floor(mainAudio.duration/60)}:0${Math.floor(mainAudio.duration%60)}`;
  }
  else
  { 
    endTime.innerText=`${Math.floor(mainAudio.duration/60)}:${Math.floor(mainAudio.duration%60)}`;
  }
});
// Progress Bar Update Funtionality
mainAudio.addEventListener("timeupdate",()=>{
  progressBar.style.width=`${(mainAudio.currentTime*100)/mainAudio.duration}%`;
  console.log(mainAudio.duration+" "+typeof mainAudio.duration);
  if(Math.floor(mainAudio.currentTime%60)<10)
  {
    curTime.innerText=`${Math.floor(mainAudio.currentTime/60)}:0${Math.floor(mainAudio.currentTime%60)}`;
  }
  else
  {
    curTime.innerText=`${Math.floor(mainAudio.currentTime/60)}:${Math.floor(mainAudio.currentTime%60)}`;
  }
});

// Seek Funtionality
progressArea.addEventListener("click",(e)=>{
  let y = (e.offsetX*100)/progressArea.offsetWidth;
  mainAudio.currentTime=(y*mainAudio.duration)/100;
});

//Next Music
next.addEventListener("click", ()=>{
  if(musicIndex<allMusic.length)
  {
    musicIndex++;
  }
  else
  {
    musicIndex=1;
  }
  if(playPauseBtn.classList.contains("pause"))
  {
    playPauseBtn.classList.remove("pause");
  }
  else
  {
    playPauseBtn.classList.add("pause");
  }
  loadMusic(musicIndex);
  progressBar.style.width="0%";
  playPause();
});


//Prev Music
prev.addEventListener("click", ()=>{
  if(musicIndex>1)
  {
    musicIndex--;
  }
  else
  {
    musicIndex=allMusic.length;
  }
  if(playPauseBtn.classList.contains("pause"))
  {
    playPauseBtn.classList.remove("pause");
  }
  else
  {
    playPauseBtn.classList.add("pause");
  }
  loadMusic(musicIndex);  
  progressBar.style.width="0%";
  playPause();
});

// PlayList Display
pList.addEventListener("click", ()=>{
  musicList.classList.toggle("show");
});
// PlayList Close
closeBtn.addEventListener("click", ()=>{
  musicList.classList.toggle("show");
});

playPauseBtn.addEventListener("click",()=>{
  playPause();
});
shuffle.addEventListener("click", ()=>{
  shuffleSong();
});
repeat.addEventListener("click",()=>{
  repeatSong();
});














