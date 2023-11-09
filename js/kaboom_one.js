import { getPositionsChallengeOne } from "./utils.js";

const $d = document;

const canvas = $d.getElementById("canvas");

const CONFIG = { width: 500, height: 500, canvas, global: true };

const SPEED = 4200;

let player = null;

const isMobile =
  window.innerWidth < 1100 && screen.orientation.type === "landscape-primary";

const createGame = () => {
  kaboom(CONFIG);
  loadAssets();
  add([sprite("layer"), scale(1, 1)]);
  generateObstacles();
  player = add([
    timer(),
    sprite("player"),
    rotate(0),
    anchor("center"),
    area(),
    pos(500 - 35, 500 - 110),
    scale(0.03, 0.03),
  ]);
  generateCollisions();
  add([
    sprite("bar1"),
    pos(520 - 110, 430),
    scale(0.06, 0.06),
    area(),
    "obstacle",
  ]);
  add([sprite("bar2"), pos(430, 74), scale(0.06, 0.06), area(), "obstacle"]);
};

function spin() {
  return {
    id: "spin",
    update() {
      this.scale = Math.sin(time() * 2);
      this.angle = time() * 60;
    },
  };
}

const generateCollisions = () => {
  player.onCollide("obstacle", (_) => {
    player.destroy();
    add([
      sprite("burst"),
      pos(width() / 2, height() / 2),
      rotate(0),
      spin(),
      anchor("center"),
    ]);
    wait(2, () => {
      location.reload();
    });
  });
};

const loadAssets = () => {
  loadSprite("layer", "../assets/ui/layer.png");
  loadSprite("player", "../assets/ui/player.png");
  loadSprite("bar1", "../assets/ui/bar1.png");
  loadSprite("bar2", "../assets/ui/bar2.png");
  loadSprite("o1", "../assets/ui/obstacle1.png");
  loadSprite("o2", "../assets/ui/obstacle2.png");
  loadSprite("o3", "../assets/ui/obstacle3.png");
  loadSprite("o4", "../assets/ui/obstacle4.png");
  loadSprite("o5", "../assets/ui/obstacle5.png");
  loadSprite("burst", "../assets/ui/burst.png");
};

function generateObstacles() {
  const obstacles = get("obstacle");
  if (obstacles.length) {
    obstacles.forEach((item) => item.destroy());
  }
  for (let i = 0; i < 5; i++) {
    const [x, y] = getPositionsChallengeOne(i);
    const obstacle = [
      sprite(`o${1 + i}`),
      pos(x, y),
      scale(isMobile ? 0.1 : 0.2, isMobile ? 0.1 : 0.2),
      area(),
      "obstacle",
    ];
    add(obstacle);
  }
}

const move = (direction) => {
  let { x, y } = player.pos;
  x = parseInt(x);
  y = parseInt(y);
  if (x > 390 && y < 45 && !direction.includes("GIRAR")) {
    $("#modal_success").modal("show");
  }
  switch (direction) {
    case "IZQUIERDA":
      player.move(-SPEED, 0);
      break;
    case "DERECHA":
      player.move(SPEED, 0);
      break;
    case "ARRIBA":
      player.move(0, -SPEED);
      break;
    case "ABAJO":
      player.move(0, SPEED);
      break;
    case "GIRAR-DERECHA":
      player.angle = 90;
      break;
    case "GIRAR-IZQUIERDA":
      player.angle = -90;
      break;
    case "GIRAR-ARRIBA":
      player.angle = 0;
      break;
    case "GIRAR-ABAJO":
      player.angle = 180;
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

export { createGame, movePlayer };
