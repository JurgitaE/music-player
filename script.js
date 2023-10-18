const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design',
    },
];

let isPlaying = false;

function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `./music/${song.name}.mp3`;
    image.src = `./img/${song.name}.jpg`;
}

let songIndex = 0;

function prevSong() {
    songIndex--;
    songIndex = songIndex >= 0 ? songIndex : songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();
}
function nextSong() {
    songIndex++;
    songIndex = songIndex > songs.length - 1 ? 0 : songIndex;
    loadSong(songs[songIndex]);
    playSong();
}

loadSong(songs[songIndex]);

function updateProgressBar(e) {
    if (isPlaying) {
        const { currentTime, duration } = e.srcElement;
        progress.style.width = `${(currentTime / duration) * 100}%`;
        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = `${duration % 60 >= 10 ? '' : '0'}${Math.floor(duration % 60)}`;

        progress.style.width = `${(currentTime / duration) * 100}%`;

        const currentMinutes = Math.floor(currentTime / 60);
        const currentSeconds = `${currentTime % 60 >= 10 ? '' : '0'}${Math.floor(currentTime % 60)}`;

        if (duration) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }
}
function setProgressBar(e) {
    const { duration } = music;
    const width = this.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = duration * (clickX / width);
    progress.style.width = `${(clickX / width) * 100}%`;
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
