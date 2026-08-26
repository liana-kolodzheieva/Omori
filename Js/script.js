const video = document.getElementById("start-scene");
const startButton = document.getElementById("start");
const audio = document.getElementById("audio");
const blackLamp = document.getElementById("black_lamp");
const blackRI = document.getElementById("black_RI");
const blackOM = document.getElementById("black_OM");

function startGame() {
  video.play();
  video.style.visibility = "visible";
  startButton.style.visibility = "hidden";
  audio.src = "songs/BlackSpace.mp3";
  blackLamp.src = "gif/white_lamp.gif";
  blackRI.style.visibility = "hidden";
  blackOM.style.visibility = "hidden";
  blackLamp.style.opacity = "100%";
}

startButton.addEventListener("click", () => {
  blackLamp.classList.add("move");
});
