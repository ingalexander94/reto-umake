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
  generateEnemies();
  player = add([
    timer(),
    sprite("player"),
    rotate(0),
    anchor("center"),
    pos(500 - 35, 500 - 110),
    scale(0.03, 0.03),
  ]);
  add([sprite("bar1"), pos(500 - 110, 405), scale(0.06, 0.06)]);
  add([sprite("bar2"), pos(405, 55), scale(0.06, 0.06)]);
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
};

function generateEnemies() {
  const enemies = get("enemy");
  if (enemies.length) {
    enemies.forEach((item) => item.destroy());
  }
  for (let i = 0; i < 5; i++) {
    const x = rand(50, 300);
    const y = rand(50, 450);
    const ghost = [
      sprite(`o${1 + i}`),
      pos(x, y),
      scale(isMobile ? 0.1 : 0.15, isMobile ? 0.1 : 0.15),
      area(),
      "enemy",
    ];
    add(ghost);
  }
}

const move = (direction) => {
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
      } else {
        move(movements[position]);
      }
    });
  }
}

export { createGame, movePlayer };
