import { generateNumberAleatory } from "./utils.js";

const $d = document;

const canvas = $d.getElementById("canvas");

const frame = $d.querySelector("div.frame");

const { offsetWidth: width, offsetHeight: height } = frame;

const CONFIG = { width, height, canvas };

const SPEED = 3000;

const createGame = () => {
  kaboom(CONFIG);
  loadAssets();
  add([sprite("fondo"), layer("fondo"), pos(0, 0)]);
  generateEnemies();
};

const loadAssets = () => {
  loadSprite("o1", "../assets/img/obstacles/1.webp");
  loadSprite("o2", "../assets/img/obstacles/2.webp");
  loadSprite("fondo", "../assets/img/fondo.jpeg");
};

// fondo.scale = 2;

function generateEnemies() {
  const enemies = get("enemy");
  if (enemies.length) {
    enemies.forEach((item) => item.destroy());
  }
  for (let i = 0; i < 4; i++) {
    const x = rand(0, width - 100);
    const y = rand(0, height - 100);
    const obstacle = generateNumberAleatory();
    const ghost = [
      sprite(`o${obstacle}`),
      pos(x, y),
      scale(0.2, 0.2),
      area(),
      "enemy",
    ];
    add(ghost);
  }
}

export { createGame };
