const video = document.getElementById("start-scene");
const startButton = document.getElementById("start");
const audio = document.getElementById("audio");
const blackLamp = document.getElementById("black_lamp");
const blackRI = document.getElementById("black_RI");
const blackOM = document.getElementById("black_OM");
const startSong = document.getElementById("start_Game");
const blackOmori = document.getElementsByClassName("black_OMORI");

function startMedia() {
  audio.src = "songs/Title.mp3";
  audio.loop = true;
  audio.volume = 0.5;
  audio.play();

  startSong.style.visibility = "hidden";

  startButton.style.disabled = "false";
  startButton.classList.add("visible");
  blackLamp.classList.add("visible");
  blackOmori[0].classList.add("visible");
  blackOmori[1].classList.add("visible");
}

function startGame() {
  video.style.visibility = "visible";
  video.play();

  audio.src = "songs/BlackSpace.mp3";

  blackRI.style.visibility = "hidden";
  blackOM.style.visibility = "hidden";
  startButton.style.visibility = "hidden";

  blackLamp.style.opacity = "100%";

  blackLamp.classList.add("move");
}
