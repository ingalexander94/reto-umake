import { BlocksControl } from "./js/blocks.js";
import { createGame, movePlayer, resetPlayer } from "./js/kaboom_one.js";
import { setTrashIcon, startTimer } from "./js/timer.js";

const $d = document;

const btnRepeat = $d.querySelector("button.btn-repeat");
const btnContinue = $d.querySelector("button.btn-continue");
const btnRefresh = $d.querySelector("section.controls > button");
const toggleAudio = $d.querySelector("input#toggle_audio");

const audio = new Audio(
  "https://ingalexander94.github.io/reto-umake/assets/audio/sound.mp3"
);

const blockControl = new BlocksControl("blocklyDiv", 1);

$d.addEventListener("DOMContentLoaded", () => {
  audio.loop = true;
  audio.volume = 0.2;
  toggleAudio.setAttribute("checked", false);
  createGame();
  startTimer();
  blockControl.createMainBlock();
  setTrashIcon(1);
  $("#modal_instructions").modal("show");
});

toggleAudio.addEventListener("change", ({ target }) => {
  if (!target.checked) audio.play();
  else audio.pause();
});

const btnPlay = $d.getElementById("play");
const btnReplay = $d.getElementById("replay");

btnPlay.addEventListener("click", () => {
  let movements = blockControl.play();
  if (movements.length) {
    btnPlay.style.display = "none";
    btnReplay.style.display = "block";
    btnReplay.setAttribute("disabled", true);
    movePlayer(movements);
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
