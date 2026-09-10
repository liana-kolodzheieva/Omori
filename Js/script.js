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
const dialogue = document.getElementById("dialogue");
const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const yesButton = document.getElementById("yes");
const noButton = document.getElementById("no");
const catDoor = document.getElementById("CatDoor");
const white = document.getElementById("white");

let NoAnswersCount = 0;
let YesAnswersCount = 0;
let canOmoriWalk = true;
const audioTargetVolume = 0.5;

function fadeOutAudio(duration = 3000) {
  return new Promise((resolve) => {
    const startVolume = audio.volume;
    const startTime = performance.now();

    function updateVolume(currentTime) {
      const progress = Math.max(
        0,
        Math.min((currentTime - startTime) / duration, 1),
      );
      audio.volume = Math.max(0, Math.min(startVolume * (1 - progress), 1));

      if (progress < 1) {
        requestAnimationFrame(updateVolume);
      } else {
        audio.volume = 0;
        resolve();
      }
    }

    requestAnimationFrame(updateVolume);
  });
}

function fadeInAudio(duration = 3000) {
  return new Promise((resolve) => {
    const startTime = performance.now();

    function updateVolume(currentTime) {
      const progress = Math.max(
        0,
        Math.min((currentTime - startTime) / duration, 1),
      );
      audio.volume = Math.max(0, Math.min(audioTargetVolume * progress, 1));

      if (progress < 1) {
        requestAnimationFrame(updateVolume);
      } else {
        audio.volume = audioTargetVolume;
        resolve();
      }
    }

    requestAnimationFrame(updateVolume);
  });
}

function startMedia() {
  audio.src = "songs/Title.mp3";
  audio.loop = true;
  audio.volume = audioTargetVolume;
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
  catDoor.classList.add("visible");
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
    Omori.classList.remove("go-to-the-door-right");
    Omori.style.left = "68.2%";
    Omori.classList.add("go-to-the-door-top");
  }
});

Omori.addEventListener("animationend", () => {
  setTimeout(() => {
    if (Omori.classList.contains("go-to-the-door-top")) {
      setTimeout(() => {
        Omori.classList.remove("go-to-the-door-top");
        Omori.src = "../Photo/Omori-stay-back.png";
        Omori.style.left = "68.2%";
        Omori.style.top = "38%";
      }, 2500);
      setTimeout(() => {
        dialogWindow.classList.add("visible");
      }, 3500);
    }
  });
});

function handleYesAnswers() {
  dialogWindow.classList.remove("visible");
  dialogWindow.style.opacity = 0;
  setTimeout(() => {
    catDoor.src = "../gif/door-open.gif";
    setTimeout(() => {
      Omori.classList.add("Go-into-the-door");
      Omori.src = "../gif/Omori-walk-back.gif";
    }, 1500);
  }, 1000);
}

Omori.addEventListener("animationend", () => {
  if (Omori.classList.contains("Go-into-the-door")) {
    Omori.classList.remove("Go-into-the-door");
    white.classList.add("visible");
    fadeOutAudio();
    Omori.style.opacity = "0";
  }
});

white.addEventListener("animationend", async () => {
  if (white.classList.contains("visible")) {
    white.classList.remove("visible");
    white.style.opacity = 1;

    await new Promise((resolve) => setTimeout(resolve, 2000));
    audio.pause();
    audio.src = "songs/Cat.mp3";
    audio.load();
    audio.volume = 0;

    try {
      await audio.play();
      white.classList.add("visible-end");
      await fadeInAudio();
    } catch (error) {
      console.error("Could not play Cat.mp3:", error);
    }
  }
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
    noButton.removeEventListener("click", handleNoAnswers);
    noButton.addEventListener("click", handleYesAnswers);
    text1.textContent = "Just open it.";
    text2.innerHTML = "You can answer <strong>'Yes'</strong>";
    noButton.textContent = "Yes";
    NoAnswersCount = 0;
  }
}
