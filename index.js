const mySongs = [
    { id: 0, title: "គេមកហើយ", artist: "MITHSOYBAD", file: "music/MITHSOYBAD - គេមកហើយ.mp3", img: "picture/MITHSOYBAD.jpg" },
    { id: 1, title: "In between us", artist: "Suly Pheng", file: "music/Suly Pheng - ស្រពិចស្រពិល In between us.mp3", img: "picture/SulyPheng.jpg" },
    { id: 2, title: "អវត្តមាន", artist: "Glomyy Vincent", file: "music/Glomyy Vincent - អវតតមន [Official Audio].mp3", img: "picture/gloomy-vincent.jpg" },
    { id: 3, title: "គុណទ្វេ", artist: "Suly Pheng", file: "music/Suly Pheng - គុណទ្វេ X2.mp3", img: "picture/SulyPheng.jpg" },
    { id: 4, title: "អស់ទឹកភ្នែក", artist: "Tena", file: "music/Tena - អស់ទឹកភ្នែក.mp3", img: "picture/tena-khimphun1.jpg" },
    { id: 5, title: "មិនចង់វែងឆ្ងាយ", artist: "MITHSOYBAD x NICK IT", file: "music/MITHSOYBAD x NICK IT - មិនចង់វែងឆ្ងាយ.mp3", img: "picture/sad1.webp" },
    { id: 6, title: "ហេតុអ្វីស្រលាញ់​មិនអាចជួប", artist: "Glomyy Vincent", file: "music/Glomyy Vincent - ហេតុអ្វីស្រលាញ់មិនអាចជួប Cover.mp3", img: "picture/gloomy-vincent.jpg" },
    { id: 7, title: "ចុះចាញ់", artist: "Glomyy Vincent", file: "Glomyy - ចុះចាញ់ Surrender.mp3", img: "picture/gloomy-vincent.jpg" },
    { id: 8, title: "យកគួរ", artist: "Suly Pheng", file: "music/Suly Pheng - យកគរ Blind.mp3", img: "picture/SulyPheng.jpg" },
    { id: 9, title: "រសនិយម", artist: "Suly Pheng", file: "music/Suly Pheng - រសនិយម Taste.mp3", img: "picture/SulyPheng.jpg" }
];

let currentSongIndex = 0;
const audio = document.getElementById('audioPlayer');
const playBtn = document.getElementById('masterPlay');
const progressBar = document.getElementById('progressBar');
const volumeControl = document.getElementById('volumeControl');

function loadSongs() {
    const container = document.getElementById('song-container');
    if (!container) return;
    container.innerHTML = ""; 

    mySongs.forEach((song, index) => {
        const row = document.createElement('div');
        row.className = "song-row";
        row.onclick = () => {
            currentSongIndex = index;
            playSong(song.file, song.title, song.img, song.artist);
        };
        row.innerHTML = `
            <img src="${song.img}" style="width:50px; height:50px; margin-right:20px;">
            <div style="flex:1;">
                <h4 style="margin-bottom:4px;">${song.title}</h4>
                <p style="font-size:13px; color:#b3b3b3;">${song.artist}</p>
            </div>
            <span style="color:var(--primary); font-size:18px;"><i class="fa fa-play"></i></span>
        `;
        container.appendChild(row);
    });
}

function playSong(file, title, image, artist) {
    audio.src = file;
    document.getElementById('nowPlayingTitle').innerText = title;
    document.getElementById('nowPlayingArtist').innerText = artist;
    document.getElementById('currentAlbumArt').src = image;
    audio.play();
    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
}

function togglePlay() {
    if (audio.src === "") playSong(mySongs[0].file, mySongs[0].title, mySongs[0].img, mySongs[0].artist);
    else if (audio.paused) { audio.play(); playBtn.innerHTML = '<i class="fa fa-pause"></i>'; }
    else { audio.pause(); playBtn.innerHTML = '<i class="fa fa-play"></i>'; }
}

audio.ontimeupdate = () => { if (audio.duration) progressBar.value = (audio.currentTime / audio.duration) * 100; };
progressBar.oninput = () => { audio.currentTime = (progressBar.value / 100) * audio.duration; };
volumeControl.oninput = (e) => { audio.volume = e.target.value; };

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % mySongs.length;
    playSong(mySongs[currentSongIndex].file, mySongs[currentSongIndex].title, mySongs[currentSongIndex].img, mySongs[currentSongIndex].artist);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + mySongs.length) % mySongs.length;
    playSong(mySongs[currentSongIndex].file, mySongs[currentSongIndex].title, mySongs[currentSongIndex].img, mySongs[currentSongIndex].artist);
}

audio.onended = nextSong;

function toggleSidebar() { document.getElementById('sidebar').classList.toggle('active'); }
function logout() { localStorage.removeItem("username"); window.location.href = "login.html"; }

window.onload = loadSongs;

// Add this function to the bottom of your index.js file

function searchSongs() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const container = document.getElementById('song-container');
    
    // Clear the current list
    container.innerHTML = ""; 

    // Filter and show matching songs
    const filteredSongs = mySongs.filter(song => 
        song.title.toLowerCase().includes(query) || 
        song.artist.toLowerCase().includes(query)
    );

    if (filteredSongs.length === 0) {
        container.innerHTML = `<p style="padding: 20px; color: #888;">No songs found for "${query}"</p>`;
        return;
    }

    filteredSongs.forEach((song) => {
        // Find the original index to keep playback working correctly
        const originalIndex = mySongs.findIndex(s => s.id === song.id);
        
        const row = document.createElement('div');
        row.className = "song-row";
        row.onclick = () => {
            currentSongIndex = originalIndex;
            playSong(song.file, song.title, song.img, song.artist);
        };
        row.innerHTML = `
            <img src="${song.img}" style="width:50px; height:50px; margin-right:20px;">
            <div style="flex:1;">
                <h4 style="margin-bottom:4px;">${song.title}</h4>
                <p style="font-size:13px; color:#b3b3b3;">${song.artist}</p>
            </div>
            <span style="color:var(--primary); font-size:18px;"><i class="fa fa-play"></i></span>
        `;
        container.appendChild(row);
    });
}
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    // This toggles the 'active' class we created in CSS
    sidebar.classList.toggle('active');
}