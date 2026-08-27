const video = document.getElementById("start-scene");
const startButton = document.getElementById("start");
const audio = document.getElementById("audio");
const blackLamp = document.getElementById("black_lamp");
const blackRI = document.getElementById("black_RI");
const blackOM = document.getElementById("black_OM");
const startSong = document.getElementById("start_Game");
const blackOmori = document.getElementsByClassName("black_OMORI");
const title = document.getElementById("title");

function startMedia() {
  audio.src = "songs/Title.mp3";
  audio.loop = true;
  audio.volume = 0.5;
  audio.play();

  title.textContent = "WhiteSpace";
  startSong.style.visibility = "hidden";

  startButton.disabled = false;
  startButton.classList.add("visible");
  blackLamp.classList.add("visible");
  blackOmori[0].classList.add("visible");
  blackOmori[1].classList.add("visible");
}

function startGame() {
  title.textContent = "BlackSpace";
  video.style.visibility = "visible";
  audio.src = "songs/BlackSpace.mp3";
  audio.play();
  video.play();

  blackLamp.style.opacity = "100%";
  blackLamp.src = "gif/white_lamp.gif";
  blackLamp.classList.add("move");

  blackRI.style.visibility = "hidden";
  blackOM.style.visibility = "hidden";
  startButton.style.visibility = "hidden";
}
