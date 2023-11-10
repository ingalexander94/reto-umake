import { setGemsText } from "./timer.js";
import { getPositionsChallengeTwo, getPositionsGems } from "./utils.js";

const $d = document;

const canvas = $d.getElementById("canvas");

const CONFIG = { width: 500, height: 500, canvas, global: true };

const SPEED = window.screen.availWidth < 1500 ? 4200 : 5400;

let player = null;

let numberGems = 0;

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
  generateGems();
  generateCollectGem();
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
      this.scale = Math.sin(time() * 3);
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

const generateCollectGem = () => {
  player.onCollide("gem", (gem) => {
    gem.destroy();
    const glow = add([
      sprite("glow"),
      pos(player.pos.x, player.pos.y),
      rotate(0),
      spin(),
      anchor("center"),
    ]);
    numberGems += 1;
    setGemsText(numberGems);
    wait(1, () => {
      glow.destroy();
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
  loadSprite("g1", "../assets/ui/gem1.png");
  loadSprite("g2", "../assets/ui/gem2.png");
  loadSprite("g3", "../assets/ui/gem3.png");
  loadSprite("burst", "../assets/ui/burst.png");
  loadSprite("glow", "../assets/ui/glow.png");
};

function generateObstacles() {
  const obstacles = get("obstacle");
  if (obstacles.length) {
    obstacles.forEach((item) => item.destroy());
  }
  for (let i = 0; i < 5; i++) {
    const [x, y] = getPositionsChallengeTwo(i);
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

function generateGems() {
  const gems = get("gem");
  if (gems.length) {
    gems.forEach((item) => item.destroy());
  }
  for (let i = 0; i < 3; i++) {
    const [x, y] = getPositionsGems(i);
    const gem = [
      sprite(`g${1 + i}`),
      pos(x, y),
      scale(isMobile ? 0.1 : 0.2, isMobile ? 0.1 : 0.2),
      area(),
      "gem",
    ];
    add(gem);
  }
}

const move = (direction) => {
  let { x, y } = player.pos;
  x = parseInt(x);
  y = parseInt(y);
  if (
    x > 390 &&
    y < 45 &&
    !direction.includes("GIRAR") &&
    !direction.includes("IZQUIERDA")
  ) {
    if (numberGems === 3) {
      $("#modal_success").modal("show");
    } else {
      $("#modal_error").modal("show");
    }
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
