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
const catDecisionRoom = document.getElementById("Cat-decision-room");
const mewoOnTheTable = document.getElementById("Mewo-Table");
const mewo = document.getElementById("emotion");
const eyes = document.getElementById("eyes");
const tail = document.getElementById("tail");
const trambling = document.getElementById("trambl");
const final = document.getElementById("final");

let NoAnswersCount = 0;
let YesAnswersCount = 0;
let kostyl = 0;
let canOmoriWalk = true;
let isGoingToTable = false;
let dialogTimer = null;
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
  if (!isGoingToTable && Omori.classList.contains("go-to-the-door-right")) {
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

Omori.addEventListener("animationend", () => {
  if (Omori.classList.contains("Go-into-the-door")) {
    Omori.classList.remove("Go-into-the-door");
    white.classList.add("visible");
    fadeOutAudio();
    Omori.style.opacity = 0;
    setTimeout(() => {
      video.style.visibility = "hidden";
      catDoor.style.visibility = "hidden";
      mewoOnTheTable.style.opacity = 1;
      catDecisionRoom.style.opacity = 1;
      Omori.style.zIndex = 40;
      Omori.style.top = "51%";
      Omori.style.left = "47.8%";
      Omori.src = "../Photo/Omori-stay-right.png";
      Omori.style.opacity = 1;
    }, 4000);
  }
});

white.addEventListener("animationend", async (event) => {
  switch (kostyl) {
    case 0:
      if (event.animationName === "white-visible") {
        white.classList.remove("visible");
        white.style.opacity = 1;

        await new Promise((resolve) => setTimeout(resolve, 2000));
        audio.pause();
        audio.src = "songs/Cat.mp3";
        audio.load();
        audio.volume = 0;

        try {
          await audio.play();
        } catch (error) {
          console.error("Could not play Cat.mp3:", error);
        }

        white.classList.remove("visible-end");
        void white.offsetWidth;
        white.classList.add("visible-end");
        kostyl = 1;
        console.log("test1: " + kostyl);
        await fadeInAudio();
      }
      break;

    case 1:
      dialogTimer = setTimeout(() => {
        console.log("Works! Kostyl:" + kostyl);
        dialogWindow.classList.remove("visible");
        dialogue.classList.remove("visible");
        noButton.classList.remove("visible");
        yesButton.classList.remove("visible");
        noButton.removeEventListener("click", handleNoAnswers);
        noButton.removeEventListener("click", handleYesAnswers);

        dialogWindow.style.opacity = "0";
        dialogue.style.opacity = "0";
        noButton.style.opacity = "0";
        yesButton.style.opacity = "0";

        void dialogWindow.offsetWidth;

        dialogWindow.style.opacity = "1";
        dialogue.classList.add("visible");
        noButton.classList.add("visible");
        noButton.textContent = "...";
        text1.innerHTML = "Mewo has been very, very bad.";
        text2.innerHTML = "";
        noButton.addEventListener("click", handleAnyAnswers);
      }, 1000);
      break;

    case 2:
      setTimeout(() => {
        mewoOnTheTable.style.opacity = 0;
        catDecisionRoom.style.opacity = 0;
        tail.style.opacity = 1;
        mewo.style.opacity = 1;
        eyes.style.opacity = 1;
        Omori.style.opacity = 0;
        setTimeout(() => {
          white.classList.remove("visible");
          white.classList.add("visible-end");
        }, 500);
      }, 1000);
      kostyl = 3;
      break;

    case 3:
      setTimeout(() => {
        dialogWindow.style.opacity = "1";
        noButton.classList.remove("visible");
        dialogue.classList.remove("visible");

        void noButton.offsetWidth;
        void dialogue.offsetWidth;

        noButton.removeEventListener("click", handleNoAnswers);
        noButton.removeEventListener("click", handleAnyAnswers);
        noButton.removeEventListener("click", handleYesAnswers);
        yesButton.removeEventListener("click", handleYesAnswers);

        yesButton.addEventListener("click", CutOpen);
        noButton.addEventListener("click", DoNothing);

        dialogue.classList.add("visible");
        noButton.classList.add("visible");
        yesButton.classList.add("visible");
        noButton.style.width = "20%";
        noButton.style.left = "76.82%";
        yesButton.style.width = "20%";
        yesButton.style.left = "76.82%";
        text1.innerHTML =
          "MEWO stares at you. She does not know what's happening.";
        text2.innerHTML = "";
        noButton.innerHTML = "Do nothing";
        yesButton.innerHTML = "Cut open Mewo";
      }, 1000);
      break;

    default:
      console.log("error");
  }
});

function CutOpen() {
  NoAnswersCount++;
  switch (NoAnswersCount) {
    case 1: {
      text1.innerHTML =
        "MEWO stares at you. She tilts her head out of curiosity.";
      break;
    }
    case 2:
      text1.innerHTML =
        "MEWO stares at you. Her eyes widen. She wants to go now.";
      eyes.src = "Photo/Eyes-2.png";
      break;
    case 3:
      text1.innerHTML = "MEWO stares at you. She struggles to break free.";
      eyes.src = "Photo/Eyes-3.png";
      mewo.src = "gif/Mewo-emotion-2.gif";
      break;
    case 4:
      text1.innerHTML =
        "MEWO stares at you. Her eyes are filled with desperation.";
      eyes.src = "Photo/Eyes-4.png";
      break;
    case 5:
      text1.innerHTML =
        "MEWO stares at you. She tries to scream, but there is no sound.";
      eyes.src = "Photo/Eyes-5.png";
      mewo.src = "gif/Mewo-emotion-3.gif";
      trambling.style.opacity = 1;
      break;
    case 6:
      text1.innerHTML =
        "MEWO stares at you. She does not know what's happening.";
      break;
    case 7:
      white.classList.remove("visible", "visible-end");
      void white.offsetWidth;
      white.style.backgroundColor = "#000000";
      white.style.opacity = 1;
      dialogWindow.classList.remove("visible");
      dialogue.classList.remove("visible");
      noButton.classList.remove("visible");
      yesButton.classList.remove("visible");
      audio.pause();
      audio.src = "songs/stab.ogg";
      audio.loop = false;
      audio.load();
      audio.currentTime = 0;
      mewo.style.opacity = 0;
      eyes.style.opacity = 0;
      tail.style.opacity = 0;
      dialogWindow.style.opacity = 0;
      trambling.style.opacity = 0;
      audio.play().catch((error) => {
        console.error("Could not play stab.ogg:", error);
      });

      setTimeout(() => {
        final.style.opacity = 1;
        audio.pause();
        audio.src = "songs/Final.mp3";
        audio.loop = true;
        audio.volume = audioTargetVolume;
        audio.load();
        audio.currentTime = 0;
        white.style.opacity = 0;
        audio.play().catch((error) => {
          console.error("Could not play Final.mp3:", error);
        });
      }, 2000);
      break;
  }
}

function DoNothing() {
  console.log("real nothing");
}

noButton.addEventListener("click", handleNoAnswers);
yesButton.addEventListener("click", handleYesAnswers);

function handleAnyAnswers() {
  isGoingToTable = true;
  Omori.classList.remove(
    "visible",
    "go-to-the-door-right",
    "go-to-the-door-top",
    "Go-into-the-door",
  );
  dialogue.classList.remove("visible");
  noButton.classList.remove("visible");
  dialogWindow.style.opacity = 0;
  setTimeout(() => {
    Omori.src = "gif/Omori-walk-forward.gif";
    Omori.classList.add("Go-to-the-table");
  }, 1000);
}

Omori.addEventListener("animationend", () => {
  if (Omori.classList.contains("Go-to-the-table")) {
    Omori.classList.remove("Go-to-the-table");
    Omori.style.top = "69%";
    Omori.src = "Photo/Omori-stay-right.png";
    setTimeout(() => {
      white.style.backgroundColor = "#000000";
      white.classList.remove("visible-end");
      white.style.opacity = 0;
      white.classList.add("visible");
      kostyl = 2;
    }, 1000);
  }
});

function handleYesAnswers() {
  clearTimeout(dialogTimer);

  dialogWindow.classList.remove("visible");
  dialogue.classList.remove("visible");
  noButton.classList.remove("visible");
  yesButton.classList.remove("visible");

  dialogWindow.style.opacity = "0";
  dialogue.style.opacity = "0";
  noButton.style.opacity = "0";
  yesButton.style.opacity = "0";

  setTimeout(() => {
    catDoor.src = "../gif/door-open.gif";
    setTimeout(() => {
      Omori.classList.add("Go-into-the-door");
      Omori.src = "../gif/Omori-walk-back.gif";
    }, 1500);
  }, 1000);
}

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
