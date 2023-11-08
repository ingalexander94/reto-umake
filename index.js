import { BlocksControl } from "./js/blocks.js";
import { createGame, movePlayer } from "./js/kaboom.js";
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
  let movements = blockControl.play();
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
});
