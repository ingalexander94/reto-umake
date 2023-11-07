import { BlocksControl } from "./js/blocks.js";
import { createGame } from "./js/kaboom.js";
import { startTimer } from "./js/timer.js";

const $d = document;

const blockControl = new BlocksControl("blocklyDiv");

$d.addEventListener("DOMContentLoaded", () => {
  createGame();
  startTimer();
  blockControl.createMainBlock();
  blockControl.createMoveBlock();
});

const btnPlay = $d.getElementById("play");

btnPlay.addEventListener("click", () => {
  blockControl.play();
});
