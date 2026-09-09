const video = document.getElementById("start-scene");
const startButton = document.getElementById("start");
const audio = document.getElementById("audio");
const blackLamp = document.getElementById("black_lamp");
const blackRI = document.getElementById("black_RI");
const blackOM = document.getElementById("black_OM");
const startSong = document.getElementById("start_Game");
const blackOmori = document.getElementsByClassName("black_OMORI");
const title = document.getElementById("title");
const startDoor = document.getElementById("start-door");
const Omori = document.getElementById("Omori");
const dialogWindow = document.getElementById("window");
const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");

let NoAnswersCount = 0;
let canOmoriWalk = true;

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
  audio.src = "../songs/BlackSpace.mp3";
  audio.play();
  video.play();

  blackLamp.style.opacity = "100%";
  blackLamp.src = "../gif/white_lamp.gif";
  blackLamp.classList.add("move");

  blackRI.style.visibility = "hidden";
  blackOM.style.visibility = "hidden";
  startButton.style.visibility = "hidden";
}

video.addEventListener("ended", () => {
  startDoor.classList.add("visible");
});

startDoor.addEventListener("animationend", () => {
  startDoor.src = "gif/door-open.gif";
  if (canOmoriWalk) {
    setTimeout(() => {
      Omori.classList.add("visible");
      Omori.src = "../gif/Omori-walk-forward.gif";
    }, 1500);

    setTimeout(() => {
      Omori.src = "../Photo/Omori-stay-right.png";
    }, 4450);

    canOmoriWalk = false;
  }
});

Omori.addEventListener("animationend", () => {
  startDoor.src = "../gif/door-close.gif";

  setTimeout(() => {
    startDoor.classList.add("end");
  }, 1500);
});

startDoor.addEventListener("animationend", () => {
  if (startDoor.classList.contains("end")) {
    setTimeout(() => {
      Omori.classList.remove("visible");
      Omori.style.top = "52%";
      Omori.style.opacity = "1";
      Omori.classList.add("go-to-the-door-right");
      Omori.src = "../gif/Omori-walk-right.gif";
    }, 2000);
  }
});

Omori.addEventListener("animationend", () => {
  if (Omori.classList.contains("go-to-the-door-right")) {
    Omori.src = "../gif/Omori-walk-back.gif";
    Omori.classList.add("go-to-the-door-top");
    Omori.classList.remove("go-to-the-door-right");
    Omori.style.left = "68.5%";
  }
});

Omori.addEventListener("animationend", () => {
  setTimeout(() => {
    if (Omori.classList.contains("go-to-the-door-top")) {
      setTimeout(() => {
        Omori.src = "../Photo/Omori-stay-back.png";
        Omori.style.left = "68.5%";
        Omori.style.top = "38%";
      }, 2500);
      setTimeout(() => {
        dialogWindow.classList.add("visible");
      }, 3500);
    }
  });
});

function handleNoAnswers() {
  NoAnswersCount++;
  if (NoAnswersCount === 0) {
    text1.textContent = "Are you sure? You might miss something important.";
    text2.textContent = "Are you going to open it?";
  }
  if (NoAnswersCount === 1) {
    text1.textContent = "You really don't want to open it?";
    text2.innerHTML = "You can answer 'Yes' or 'No'";
  }
  if (NoAnswersCount === 2) {
    text1.textContent = "Aren't you interested?";
    text2.textContent = "Open it, will you?";
  }
  if (NoAnswersCount === 3) {
    text1.textContent = "Just open it.";
    text2.innerHTML = "You can answer <strong>'Yes'</strong>";
  }
}
