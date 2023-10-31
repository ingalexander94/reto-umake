import { generateNumberAleatory } from "./utils.js";

const $d = document;

const canvas = $d.getElementById("canvas");

const frame = $d.querySelector("div.frame");

const { offsetWidth: width, offsetHeight: height } = frame;

const CONFIG = { width, height, canvas, global: true };

const SPEED = 3000;

const isMobile =
  window.innerWidth < 1100 && screen.orientation.type === "landscape-primary";

const createGame = () => {
  kaboom(CONFIG);
  loadAssets();
  loadSprite("fondo", "../assets/img/fondo1.avif");
  loadSprite("hearth", "../assets/img/hearth.png");
  loadSprite(
    "ship",
    "https://cdn-umake.s3.us-east-2.amazonaws.com/wp-content/uploads/2023/08/16114324/nave-front.png"
  );
  add([sprite("fondo"), scale(1.1, 1.3)]);
  generateEnemies();
  add([sprite("ship"), pos(width - 80, height - 80), scale(0.4, 0.4)]);
  add([sprite("hearth"), pos(250, 50), scale(0.03, 0.03)]);
};

const loadAssets = () => {
  loadSprite("o1", "../assets/img/obstacles/1.webp");
  loadSprite("o2", "../assets/img/obstacles/2.webp");
};

// fondo.scale = 2;

function generateEnemies() {
  const enemies = get("enemy");
  if (enemies.length) {
    enemies.forEach((item) => item.destroy());
  }
  for (let i = 0; i < 6; i++) {
    const x = rand(0, width - 100);
    const y = rand(0, height - 100);
    const obstacle = generateNumberAleatory();
    const ghost = [
      sprite(`o${obstacle}`),
      pos(x, y),
      scale(isMobile ? 0.1 : 0.15, isMobile ? 0.1 : 0.15),
      area(),
      "enemy",
    ];
    add(ghost);
  }
}

export { createGame };
