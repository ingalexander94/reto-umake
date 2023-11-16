import { getSpeed } from "./utils.js";

const $d = document;

const canvas = $d.getElementById("canvas");

const isMobile =
  window.innerWidth < 1100 && screen.orientation.type === "landscape-primary";

const CONFIG = {
  width: isMobile ? 300 : 400,
  height: isMobile ? 300 : 400,
  canvas,
  global: true,
};

let SPEED = 0;

$d.addEventListener("DOMContentLoaded", () => {
  setTimeout(async () => {
    SPEED = await getSpeed();
  }, 1000);
});

let player = null;

const createGame = () => {
  kaboom(CONFIG);
  loadAssets();
  add([sprite(isMobile ? "layerm" : "layer"), scale(1, 1)]);
  if (isMobile) {
    player = add([
      timer(),
      sprite("player"),
      rotate(0),
      anchor("center"),
      area(),
      pos(278, 238),
      scale(0.018, 0.018),
    ]);
  } else {
    player = add([
      timer(),
      sprite("player"),
      rotate(0),
      anchor("center"),
      area(),
      pos(370, 315),
      scale(0.025, 0.025),
    ]);
  }
};

const resetPlayer = () => {
  player.destroy();
  if (isMobile) {
    player = add([
      timer(),
      sprite("player"),
      rotate(0),
      anchor("center"),
      area(),
      pos(278, 238),
      scale(0.018, 0.018),
    ]);
  } else {
    player = add([
      timer(),
      sprite("player"),
      rotate(0),
      anchor("center"),
      area(),
      pos(370, 315),
      scale(0.025, 0.025),
    ]);
  }
};

const loadAssets = () => {
  loadSprite(
    "layer",
    "https://ingalexander94.github.io/reto-umake/assets/ui/layer_challenge_one.png"
  );
  loadSprite(
    "layerm",
    "https://ingalexander94.github.io/reto-umake/assets/ui/layerm_challenge_one.png"
  );
  loadSprite(
    "player",
    "https://ingalexander94.github.io/reto-umake/assets/ui/player.png"
  );
};

const move = (direction) => {
  let { x, y } = player.pos;
  x = parseInt(x);
  y = parseInt(y);
  const isWinner = isMobile
    ? (x < 25 && y < 70) || (y < 25 && x < 70)
    : (x < 95 && y < 35) || (y < 95 && x < 35);
  if (isWinner && !direction.includes("GIRAR")) {
    $("#modal_success").modal("show");
  }
  switch (direction) {
    case "AVANZAR":
      const angle = (player.angle + 360) % 360;
      if (angle === 0 || angle === 360) player.move(0, -SPEED);
      else if (angle === 90) player.move(SPEED, 0);
      else if (angle === 180) player.move(0, SPEED);
      else if (angle === 270) player.move(-SPEED, 0);
      else player.move(0, 0);
      break;
    case "DERECHA":
      player.angle = player.angle + 90;
      break;
    case "IZQUIERDA":
      player.angle = player.angle - 90;
      break;
    default:
      player.angle = 0;
      player.move(0, 0);
      break;
  }
};

function movePlayer(movements) {
  if (movements.length > 0) {
    let position = -1;
    player.loop(0.5, () => {
      position += 1;
      if (position === movements.length) {
        movements.length = 0;
      } else if (position < movements.length) {
        move(movements[position]);
      }
    });
  }
}

export { createGame, movePlayer, resetPlayer };
