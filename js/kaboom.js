const $d = document;

const canvas = $d.getElementById("canvas");

const CONFIG = { width: 500, height: 500, canvas, global: true };

const SPEED = 3000;

const isMobile =
  window.innerWidth < 1100 && screen.orientation.type === "landscape-primary";

const createGame = () => {
  kaboom(CONFIG);
  loadAssets();
  add([sprite("layer"), scale(1, 1)]);
  generateEnemies();
  add([sprite("player"), pos(500 - 50, 500 - 135), scale(0.03, 0.03)]);
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

export { createGame };
