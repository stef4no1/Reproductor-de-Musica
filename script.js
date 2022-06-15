const songs = document.getElementById("songs");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
progressContainer.addEventListener("click", setProgress);


const songList = [
    {
        title: "Mamichula",
        file: "y2mate.com - Trueno Nicki Nicole Bizarrap  MAMICHULA.mp3",
        cover: "Trueno_(Repero)_2021.jpg"
    },
    {
        title: "Ahora Soy Peor",
        file: "y2mate.com - BAD BUNNY  SOY PEOR Video Oficial.mp3",
        cover: "Bad_Bunny_2019_by_Glenn_Francis_(cropped).jpg"
    },
    {
        title: "Yo Ya Me Fui",
        file: "y2mate.com - Bizarrap x Duki x Nicki Nicole  YaMeFui.mp3",
        cover: "Duko_concierto.jpg"
    },
    {
        title: "Nos comemos",
        file: "y2mate.com - Tiago PZK Ozuna  Nos Comemos Video Oficial.mp3",
        cover: "tiago_1.jpg_1956802537.webp"
    },
    {
        title: "Moonlight",
        file: "y2mate.com - XXXTENTACION  MOONLIGHT OFFICIAL MUSIC VIDEO.mp3",
        cover: "Xxxtentacion_(cropped).jpg"
    },
    {
        title: "Gods Plan",
        file: "y2mate.com - Drake  Gods Plan.mp3",
        cover: "rs_634x1024-220306143134-634-Drake.jpg"
    },
]


let actualSong = null;


audio.addEventListener("timeupdate", updateProgress);


play.addEventListener("click", () => {
    if (audio.paused) {
        playSong();   
    } else {
        pauseSong();
    }
})

next.addEventListener("click", () => nextSong());
prev.addEventListener("click", () => prevSong());


function loadSongs() {
    songList.forEach((song, index) => {
        const li = document.createElement("li");

        const link = document.createElement("a");
        link.textContent = song.title;
        link.href = "#";

        link.addEventListener("click", () => loadSong(index));

        li.appendChild(link);

        songs.appendChild(li);
    });
};


function loadSong(songIndex) {
    if (songIndex !== actualSong) {
        changeActiveClass(actualSong, songIndex);
        actualSong = songIndex;
        audio.src = "./audio/" + songList[songIndex].file;
        playSong();
        changeSongtitle(songIndex);
        changeCover(songIndex);
    }
}


function updateProgress(event) {
    const {duration, currentTime} = event.srcElement;
    const percent = (currentTime / duration) * 100;
    progress.style.width = percent + "%";
}


function setProgress(event) {
    const totalWidth = this.offsetWidth;
    const progressWidth = event.offsetX;
    const current = (progressWidth / totalWidth) * audio.duration;
    audio.currentTime = current;
}


function updateControls() {
    if (audio.paused) {
        play.classList.remove("fa-pause");
        play.classList.add("fa-play");
    } else {
        play.classList.add("fa-pause");
        play.classList.remove("fa-play");
    }
}


function playSong() {
    if (actualSong !== null) {
        audio.play();
        updateControls();
    }
}


function pauseSong() {
    audio.pause();
    updateControls();
}


function changeActiveClass(lastIndex, newIndex) {
    const links = document.querySelectorAll("a");
    if (lastIndex !== null) {
        links[lastIndex].classList.remove("active");
    }
    links[newIndex].classList.add("active");
}


function changeCover(songIndex) {
    cover.src = "./assets/" + songList[songIndex].cover;
}


function changeSongtitle(songIndex) {
    title.innerText = songList[songIndex].title;
}


function prevSong() {
    if (actualSong > 0) {
        loadSong(actualSong - 1);
    } else {
        loadSong(songList.length - 1);
    }
}


function nextSong() {
    if (actualSong < songList.length -1) {
        loadSong(actualSong + 1);
    } else {
        loadSong(0);
    }
}


audio.addEventListener("ended", () => nextSong());

loadSongs();