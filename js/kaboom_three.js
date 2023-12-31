import { setGemsText } from "./timer.js";
import {
  getPositionsChallengeTwo,
  getPositionsGems,
  getSpeed,
} from "./utils.js";

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

let numberGems = 0;

let random = 1;

const createGame = () => {
  kaboom(CONFIG);
  loadAssets();
  add([sprite(isMobile ? "layerm" : "layer"), scale(1, 1)]);
  random = Math.floor(Math.random() * 3) + 1;
  generateObstacles(random);
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
      scale(0.017, 0.017),
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
      scale(0.024, 0.024),
    ]);
  }

  generateCollisions();
  generateGems(random);
  generateCollectGem();
  generateGoal();
};

const generateGoal = () => {
  add([pos(370, 29), sprite("goal"), anchor("center"), area(), "goal"]);
  player.onCollide("goal", (_) => {
    if (numberGems === 3) {
      play("win", { volume: 0.05 });
      $("#modal_success").modal("show");
    } else {
      play("lost", { volume: 0.05 });
      $("#modal_error").modal("show");
    }
  });
};

const resetPlayer = () => {
  play("run", { volume: 0.05 });
  player.destroy();
  if (isMobile) {
    player = add([
      timer(),
      sprite("player"),
      rotate(0),
      anchor("center"),
      area(),
      pos(278, 238),
      scale(0.017, 0.017),
    ]);
  } else {
    player = add([
      timer(),
      sprite("player"),
      rotate(0),
      anchor("center"),
      area(),
      pos(370, 315),
      scale(0.024, 0.024),
    ]);
  }
  generateCollisions();
  generateGems(random);
  numberGems = 0;
  setGemsText(0);
  generateCollectGem();
  generateGoal();
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

const validateOffscreen = () => {
  if (
    player.pos.x < 0 ||
    player.pos.x > width() ||
    player.pos.y < 0 ||
    player.pos.y > height()
  ) {
    play("crash", { volume: 0.05 });
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
      generateGems(random);
      generateCollisions();
      generateGoal();
      numberGems = 0;
      setGemsText(0);
      generateCollectGem();
    });
    setTimeout(() => {
      play("lost", { volume: 0.05 });
    }, 1000);
  }
};

const generateCollisions = () => {
  player.onCollide("obstacle", (_) => {
    play("crash", { volume: 0.05 });
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
          scale(0.017, 0.017),
        ]);
      } else {
        player = add([
          timer(),
          sprite("player"),
          rotate(0),
          anchor("center"),
          area(),
          pos(370, 315),
          scale(0.024, 0.024),
        ]);
      }
      generateCollisions();
      numberGems = 0;
      setGemsText(0);
      generateGems(random);
      generateCollectGem();
      generateGoal();
    });
    setTimeout(() => {
      play("lost", { volume: 0.05 });
    }, 1000);
  });
};

const generateCollectGem = () => {
  player.onCollide("gem", (gem) => {
    gem.destroy();
    play("grab", { volume: 0.05 });
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
    "g1",
    "https://ingalexander94.github.io/reto-umake/assets/ui/gem1.png"
  );
  loadSprite(
    "g2",
    "https://ingalexander94.github.io/reto-umake/assets/ui/gem2.png"
  );
  loadSprite(
    "g3",
    "https://ingalexander94.github.io/reto-umake/assets/ui/gem3.png"
  );
  loadSprite(
    "burst",
    "https://ingalexander94.github.io/reto-umake/assets/ui/burst.png"
  );
  loadSprite(
    "glow",
    "https://ingalexander94.github.io/reto-umake/assets/ui/glow.png"
  );
  loadSprite(
    "goal",
    "https://ingalexander94.github.io/reto-umake/assets/ui/transparent.png"
  );
  loadSound(
    "run",
    "https://ingalexander94.github.io/reto-umake/assets/audio/run.wav"
  );
  loadSound(
    "move",
    "https://ingalexander94.github.io/reto-umake/assets/audio/move.wav"
  );
  loadSound(
    "crash",
    "https://ingalexander94.github.io/reto-umake/assets/audio/crash.wav"
  );
  loadSound(
    "win",
    "https://ingalexander94.github.io/reto-umake/assets/audio/win.mp3"
  );
  loadSound(
    "lost",
    "https://ingalexander94.github.io/reto-umake/assets/audio/lost.mp3"
  );
  loadSound(
    "grab",
    "https://ingalexander94.github.io/reto-umake/assets/audio/grab.wav"
  );
};

function generateObstacles(random) {
  const obstacles = get("obstacle");
  if (obstacles.length) {
    obstacles.forEach((item) => item.destroy());
  }
  for (let i = 0; i < 5; i++) {
    const [x, y] = getPositionsChallengeTwo(i, random);
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

function generateGems(random) {
  const gems = get("gem");
  if (gems.length) {
    gems.forEach((item) => item.destroy());
  }
  for (let i = 0; i < 3; i++) {
    const [x, y] = getPositionsGems(i, random);
    const gem = [
      sprite(`g${1 + i}`),
      pos(x, y),
      scale(isMobile ? 0.1 : 0.18, isMobile ? 0.1 : 0.18),
      area(),
      "gem",
    ];
    add(gem);
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
        position === 0
          ? play("run", { volume: 0.05 })
          : play("move", { volume: 0.05 });
        move(movements[position]);
      }
    });
  }
}

export { createGame, movePlayer, resetPlayer };
