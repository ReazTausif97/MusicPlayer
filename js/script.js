const wrapper=document.querySelector(".wrapper"),
myImg=wrapper.querySelector(".img-area .img"),
songName=wrapper.querySelector(".song-details .name"),
songArtist=wrapper.querySelector(".song-details .artist");
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
musicList=wrapper.querySelector(".music-list");
closeBtn=wrapper.querySelector(".headings #close"),
ul=wrapper.querySelector("ul"),
audDur=wrapper.querySelector(".row .audio-duration");

let musicIndex=4;
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
function playMusic()
{
  mainAudio.play();
}
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
playPauseBtn.addEventListener("click",()=>{
  playPause();
});
mainAudio.addEventListener("timeupdate",()=>{
 
  if(Math.floor(mainAudio.currentTime%60)<10)
  {
    curTime.innerText=`${Math.floor(mainAudio.currentTime/60)}:0${Math.floor(mainAudio.currentTime%60)}`;
  }
  else
  {
    curTime.innerText=`${Math.floor(mainAudio.currentTime/60)}:${Math.floor(mainAudio.currentTime%60)}`;
  }



});













