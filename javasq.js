const video_player = document.querySelector("#video_player"),
Mainvideo = video_player.querySelector("#main_video"),
progressAreaTime = video_player.querySelector(".progressAreaTime"),
controlls = video_player.querySelector(".controlls"),
progressArea = video_player.querySelector(".progress-area"),
progress_bar = video_player.querySelector(".progress-bar"),
fast_rewind = video_player.querySelector(".fast-rewind"),
play_pause = video_player.querySelector(".play_pause"),
fast_forward = video_player.querySelector(".fast-forward"),
volume = video_player.querySelector(".volume"),
volume_range = video_player.querySelector(".volume_range"),
current = video_player.querySelector(".current"),
Totalduration = video_player.querySelector(".duration"),
auto_play = video_player.querySelector(".auto-play"),
settingBtn = video_player.querySelector(".settingBtn"),
picture_in_picture = video_player.querySelector(".picture_in_picture"),
fullscreen = video_player.querySelector(".fullscreen"),
settings = video_player.querySelector("#settings"),
playback = video_player.querySelectorAll(".playback li");
sonic = video_player.querySelector("sonicc")
//play video function
function PlayVideo() {
    play_pause.innerHTML = "pause"
    play_pause.title = "play"
    video_player.classList.add("paused")
    Mainvideo.play()
}
//pause video function
function pauseVideo() {
    play_pause.innerHTML = "play_arrow"
    play_pause.title = "pause"
    video_player.classList.remove("paused")
    Mainvideo.pause();
}

play_pause.addEventListener("click",()=>{
    const isVideoPaused = video_player.classList.contains("paused")

    isVideoPaused ? pauseVideo() : PlayVideo()
})

Mainvideo.addEventListener("play",()=>
{
    PlayVideo()
})

Mainvideo.addEventListener("pause",()=>
{
    pauseVideo()
})

// fast rewind function

fast_rewind.addEventListener("click",()=>{
    Mainvideo.currentTime -= 5
})
fast_forward.addEventListener("click",()=>{
    Mainvideo.currentTime += 5
})



// Load Video Duration
Mainvideo.addEventListener("loadeddata",(e)=>{
    let videoDuration = e.target.duration
    let totalSec = Math.floor(videoDuration % 60)
    var hourss = videoDuration / 60;
    var hours = hourss / 60
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);

    //second dont go under 0
    
    totalSec < 10 ? totalSec = "0" + totalSec : totalSec
    
    Totalduration.innerHTML = `${rhours} : ${rminutes} : ${totalSec}`
})


//curent video Duration
Mainvideo.addEventListener("timeupdate",(e)=>{
    let CurrentVideoTime = e.target.currentTime
    let currentMin = Math.floor(CurrentVideoTime / 60)
    let currentSec = Math.floor(CurrentVideoTime % 60)


    //second dont go under 0
    currentSec < 10 ? currentSec = "0" + currentSec : currentSec
    current.innerHTML = `${currentMin} : ${currentSec}`
    

    let videoDuration = e.target.duration
    //prgoressbar with
    let progressWith = (CurrentVideoTime / videoDuration) * 100
    progress_bar.style.width = `${progressWith}%`
})


//progressbar_rewind_and_forward
progressArea.addEventListener("click",(e)=>{
    let videoDuration = Mainvideo.duration
    let progressWithval = progressArea.clientWidth
    let clickoffSetX = e.offsetX

    Mainvideo.currentTime = (clickoffSetX / progressWithval) * videoDuration
})

//change volume
function ChangeVolume() {
    Mainvideo.volume = volume_range.value / 100
    if (volume_range.value == 0) {
        volume.innerHTML = "volume_off"
    }else if(volume_range.value < 40){
        volume.innerHTML = "volume_down"
    }else{
        volume.innerHTML = "volume_up"
    }
}


function muteVolume() {
    if (volume_range.value == 0) {
        volume_range.value = 80
        Mainvideo.volume = 0.8
        volume.innerHTML = "volume_up"

    }else{
        volume_range.value = 0
        Mainvideo.volume = 0
        volume.innerHTML = "volume_off"
    }
}




volume_range.addEventListener("change",()=>{
    ChangeVolume()
})

volume.addEventListener("click",()=>{
    muteVolume()
})

//timeshowonprogressbar
progressArea.addEventListener("mousemove",(e)=>{
    let  progressWithval = progressArea.clientWidth
    let x = e.offsetX
    progressAreaTime.style.setProperty("--x",`${x}px`)
    progressAreaTime.style.display = "block"
    let videoDuration = Mainvideo.duration
    let progresstime = Math.floor((x/progressWithval)*videoDuration)
    let currentMin = Math.floor(progresstime / 60)
    let currentSec = Math.floor(progresstime % 60)
    //second dont go under 0
    currentSec < 10 ? currentSec = "0" + currentSec : currentSec
    current.innerHTML = `${currentMin} : ${currentSec}`
    progressAreaTime.innerHTML = `${currentMin} : ${currentSec}`
    
})
progressArea.addEventListener("mouseleave",(e)=>{
    progressAreaTime.style.display = "none"
    
})

auto_play.addEventListener("click",()=>{
    auto_play.classList.toggle("active")
    if(auto_play.classList.contains("active")){
        auto_play.title = "autoplay is on"

    }else{
        auto_play.title = "autoplay is off"
    }
})

Mainvideo.addEventListener("ended",()=>{
    if(auto_play.classList.contains("active")){
        PlayVideo()
    }else{
        play_pause.innerHTML = "replay"
        play_pause.title = "Replay"
    }
})

picture_in_picture.addEventListener("click",()=>{
    Mainvideo.requestPictureInPicture()
})

fullscreen.addEventListener("click",()=>{
    if (!video_player.classList.contains("openFullScreen")) {
        video_player.classList.add("openFullScreen")
        fullscreen.innerHTML = "fullscreen_exit"
        video_player.requestFullscreen()
    }else{
        video_player.classList.remove("openFullScreen")
        fullscreen.innerHTML = "fullscreen"
        document.exitFullscreen()
    }
})

Mainvideo.addEventListener("click",()=>{
    const isVideoPaused = video_player.classList.contains("paused")

    isVideoPaused ? pauseVideo() : PlayVideo()
})


document.addEventListener("keydown", e => {
    if (e.key === ' '){
        const isVideoPaused = video_player.classList.contains("paused")

        isVideoPaused ? pauseVideo() : PlayVideo()
    }
})
document.addEventListener("keydown", e => {
    console.log(e)
})
document.addEventListener("keydown", e => {
    if (e.key === 'ArrowLeft'){
        Mainvideo.currentTime -= 5
    }
})
document.addEventListener("keydown", e => {
    if (e.key === 'ArrowRight'){
        Mainvideo.currentTime += 5
    }
})

//open settings
 settingBtn.addEventListener("click",()=>{
    settings.classList.toggle('active');
    settingBtn.classList.toggle('active');
})

function removeActiveClasses() {
    playback.forEach(event => {
        event.classList.remove("active")
    });
}

//payyback rate
playback.forEach((event)=>{
    event.addEventListener("click",()=>{
        removeActiveClasses()
        event.classList.add("active")
        let speed = event.getAttribute('data-speed')
        Mainvideo.playbackRate = speed
    })
})

// store duration local

