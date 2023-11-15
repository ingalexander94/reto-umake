import { BlocksControl } from "./js/blocks.js";
import { createGame, movePlayer, resetPlayer } from "./js/kaboom_one.js";
import { setTrashIcon, startTimer } from "./js/timer.js";

const $d = document;

const btnRepeat = $d.querySelector("button.btn-repeat");
const btnContinue = $d.querySelector("button.btn-continue");
const btnRefresh = $d.querySelector("section.controls > button");

const blockControl = new BlocksControl("blocklyDiv", 1);

$d.addEventListener("DOMContentLoaded", () => {
  createGame();
  startTimer();
  blockControl.createMainBlock();
  setTrashIcon(1);
});

const btnPlay = $d.getElementById("play");
const btnReplay = $d.getElementById("replay");

btnPlay.addEventListener("click", () => {
  let movements = blockControl.play();
  if (movements.length) {
    btnPlay.style.display = "none";
    btnReplay.style.display = "block";
    const instructions = [];
    for (let i = 0; i < movements.length; i++) {
      if (i === 0 && movements[0] !== "ARRIBA") {
        instructions.push("GIRAR-" + movements[i]);
        instructions.push(movements[i]);
      } else {
        if (i > 0 && !movements[i - 1].includes(movements[i])) {
          instructions.push("GIRAR-" + movements[i]);
        }
        instructions.push(movements[i]);
      }
    }
    movePlayer(instructions);
  }
});

btnReplay.addEventListener("click", () => {
  btnPlay.style.display = "block";
  btnReplay.style.display = "none";
  resetPlayer();
});

btnRepeat.addEventListener("click", () => {
  location.reload();
});

btnRefresh.addEventListener("click", () => {
  location.reload();
});

btnContinue.addEventListener("click", () => {
  $("#modal_success").modal("hide");
  window.location.replace(
    "https://ingalexander94.github.io/reto-umake/reto2.html"
  );
  window.history.replaceState({}, document.title, window.location.href);
});
