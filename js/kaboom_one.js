import { getPositionsChallengeOne, getSpeed } from "./utils.js";

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

let player = null;

const createGame = async () => {
  SPEED = await getSpeed();
  kaboom(CONFIG);
  loadAssets();
  add([sprite(isMobile ? "layerm" : "layer"), scale(1, 1)]);
  generateObstacles();

  if (isMobile) {
    add([
      sprite("bar1"),
      pos(240, 259),
      scale(0.05, 0.035),
      area(),
      "obstacle",
    ]);
    add([
      sprite("bar2"),
      pos(256, 42),
      scale(0.038, 0.045),
      area(),
      "obstacle",
    ]);
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
    add([
      sprite("bar1"),
      pos(326, 345),
      scale(0.05, 0.047),
      area(),
      "obstacle",
    ]);
    add([sprite("bar2"), pos(342, 57), scale(0.05, 0.047), area(), "obstacle"]);
    player = add([
      timer(),
      sprite("player"),
      rotate(0),
      anchor("center"),
      area(),
      pos(370, 318),
      scale(0.025, 0.025),
    ]);
  }
  generateCollisions();
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
  loadSprite("layerm", "../assets/ui/layerm.png");
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
  const random = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < 5; i++) {
    const [x, y] = getPositionsChallengeOne(i, random);
    const obstacle = [
      sprite(`o${1 + i}`),
      pos(x, y),
      scale(isMobile ? 0.1 : 0.18, isMobile ? 0.1 : 0.18),
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
  const isWinner = isMobile ? x > 230 && y < 25 : x > 310 && y < 40;
  if (isWinner && !direction.includes("GIRAR")) {
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
