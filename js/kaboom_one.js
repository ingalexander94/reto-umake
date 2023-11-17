import { getSpeed } from "./utils.js";

const $d = document;

const canvas = $d.getElementById("canvas");
const btnPlay = $d.getElementById("play");
const btnReplay = $d.getElementById("replay");

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

function spin() {
  return {
    id: "spin",
    update() {
      this.scale = Math.sin(time() * 2);
      this.angle = time() * 60;
    },
  };
}

const seSalio = () => {
  if (
    player.pos.x < 0 ||
    player.pos.x > width() ||
    player.pos.y < 0 ||
    player.pos.y > height()
  ) {
    player.destroy();
    const burst = add([
      sprite("burst"),
      pos(width() / 2, height() / 2),
      rotate(0),
      spin(),
      anchor("center"),
    ]);
    wait(2, () => {
      burst.destroy();
      btnPlay.style.display = "block";
      btnReplay.style.display = "none";
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
    });
  }
};

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
  loadSprite(
    "burst",
    "https://ingalexander94.github.io/reto-umake/assets/ui/burst.png"
  );
};

const move = (direction) => {
  let { x, y } = player.pos;
  x = parseInt(x);
  y = parseInt(y);
  const isWinner = isMobile
    ? (x < 25 && y < 70) || (y < 25 && x < 70)
    : (x < 95 && y < 35) || (y < 95 && x < 35);
  if (isWinner) {
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
  seSalio();
};

function movePlayer(movements) {
  if (movements.length > 0) {
    let position = -1;
    player.loop(0.5, () => {
      position += 1;
      if (position === movements.length) {
        movements.length = 0;
      } else if (position < movements.length) {
        if (position === movements.length - 1) {
          btnReplay.removeAttribute("disabled");
        }
        move(movements[position]);
      }
    });
  }
}

export { createGame, movePlayer, resetPlayer };
