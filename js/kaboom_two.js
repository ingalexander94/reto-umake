import { getPositionsChallengeOne, getSpeed } from "./utils.js";

const $d = document;

const btnPlay = $d.getElementById("play");
const btnReplay = $d.getElementById("replay");

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
      pos(370, 315),
      scale(0.025, 0.025),
    ]);
  }
  generateCollisions();
  generateGoal();
};

const generateGoal = () => {
  add([pos(370, 29), sprite("goal"), anchor("center"), area(), "goal"]);
  player.onCollide("goal", (_) => {
    $("#modal_success").modal("show");
  });
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

const validateOffscreen = () => {
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
      generateCollisions();
      generateGoal();
    });
  }
};

const generateCollisions = () => {
  player.onCollide("obstacle", (_) => {
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
      generateCollisions();
    });
  });
};

const loadAssets = () => {
  loadSprite(
    "layer",
    "https://ingalexander94.github.io/reto-umake/assets/ui/layer.png"
  );
  loadSprite(
    "layerm",
    "https://ingalexander94.github.io/reto-umake/assets/ui/layerm.png"
  );
  loadSprite(
    "player",
    "https://ingalexander94.github.io/reto-umake/assets/ui/player.png"
  );
  loadSprite(
    "bar1",
    "https://ingalexander94.github.io/reto-umake/assets/ui/bar1.png"
  );
  loadSprite(
    "bar2",
    "https://ingalexander94.github.io/reto-umake/assets/ui/bar2.png"
  );
  loadSprite(
    "o1",
    "https://ingalexander94.github.io/reto-umake/assets/ui/obstacle1.png"
  );
  loadSprite(
    "o2",
    "https://ingalexander94.github.io/reto-umake/assets/ui/obstacle2.png"
  );
  loadSprite(
    "o3",
    "https://ingalexander94.github.io/reto-umake/assets/ui/obstacle3.png"
  );
  loadSprite(
    "o4",
    "https://ingalexander94.github.io/reto-umake/assets/ui/obstacle4.png"
  );
  loadSprite(
    "o5",
    "https://ingalexander94.github.io/reto-umake/assets/ui/obstacle5.png"
  );
  loadSprite(
    "burst",
    "https://ingalexander94.github.io/reto-umake/assets/ui/burst.png"
  );
  loadSprite(
    "goal",
    "https://ingalexander94.github.io/reto-umake/assets/ui/transparent.png"
  );
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
      scale(isMobile ? 0.1 : 0.16, isMobile ? 0.1 : 0.16),
      area(),
      "obstacle",
    ];
    add(obstacle);
  }
}

const move = (direction) => {
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
  validateOffscreen();
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
