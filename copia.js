(() => {
  const $d = document;

  let movements = [];

  const btnLeft = $d.getElementById("left");

  const btnUp = $d.getElementById("up");

  const btnRight = $d.getElementById("right");

  const btnDown = $d.getElementById("down");

  const btnPlay = $d.getElementById("play");

  btnLeft.addEventListener("click", () => addMotion("left"));
  btnUp.addEventListener("click", () => addMotion("up"));
  btnRight.addEventListener("click", () => addMotion("right"));
  btnDown.addEventListener("click", () => addMotion("down"));
  btnPlay.addEventListener("click", run);

  const config = {
    width: 512,
    height: 512,
    canvas: $d.getElementById("canvas"),
  };

  const SPEED = 3000;

  kaboom(config);

  loadSprite(
    "ship",
    "https://cdn-umake.s3.us-east-2.amazonaws.com/wp-content/uploads/2023/08/16114324/nave-front.png"
  );

  loadSprite(
    "bad",
    "https://cdn-umake.s3.us-east-2.amazonaws.com/wp-content/uploads/2023/08/17100545/Robot.png"
  );

  loadSprite(
    "umake",
    "https://cdn-umake.s3.us-east-2.amazonaws.com/wp-content/uploads/2023/07/25084827/Favicon_U-Make.png"
  );

  let player = add([
    timer(),
    sprite("ship"),
    pos(400),
    area(),
    scale(0.5, 0.5),
  ]);

  let goal = add([
    sprite("umake"),
    pos(rand(0, 400), rand(0, 400)),
    area(),
    scale(0.5, 0.5),
    "goal",
  ]);

  generateEnemies();

  player.onCollide("enemy", (_) => {
    player.destroy();
    goal.destroy();
    addKaboom(center());
    movements.length = 0;
    ol.innerHTML = "";
    player = add([timer(), sprite("ship"), pos(400), area(), scale(0.5, 0.5)]);
    goal = add([
      sprite("umake"),
      pos(rand(0, 400), rand(0, 400)),
      area(),
      scale(0.5, 0.5),
      "goal",
    ]);
    player.onCollide("enemy", (_) => {
      collide();
    });
    player.onCollide("goal", (_) => {
      location.reload();
    });
    generateEnemies();
  });

  player.onCollide("goal", (_) => {
    location.reload();
  });

  const ol = document.querySelector("section ol");

  const move = (direction) => {
    switch (direction) {
      case "left":
        player.move(-SPEED, 0);
        break;
      case "right":
        player.move(SPEED, 0);
        break;
      case "up":
        player.move(0, -SPEED);
        break;
      case "down":
        player.move(0, SPEED);
        break;
      default:
        player.move(0, 0);
        break;
    }
  };

  function addMotion(move) {
    movements = [...movements, move];
    const li = $d.createElement("li");
    li.classList.add("animate__animated");
    const i = $d.createElement("i");
    i.classList.add("fa-solid", `fa-arrow-${move}`);
    li.classList.add("animate__bounceIn");
    li.appendChild(i);
    ol.appendChild(li);
  }

  function generateEnemies() {
    const enemies = get("enemy");
    if (enemies.length) {
      enemies.forEach((item) => item.destroy());
    }
    for (let i = 0; i < 2; i++) {
      const x = rand(0, 400);
      const y = rand(0, 400);
      add([sprite("bad"), pos(x, y), scale(0.5, 0.5), area(), "enemy"]);
    }
  }

  function collide() {
    player.destroy();
    goal.destroy();
    addKaboom(center());
    movements.length = 0;
    ol.innerHTML = "";
    player = add([timer(), sprite("ship"), pos(400), area(), scale(0.5, 0.5)]);
    goal = add(
      [
        sprite("umake"),
        pos(rand(0, 400), rand(0, 400)),
        area(),
        scale(0.5, 0.5),
      ],
      "goal"
    );
    player.onCollide("enemy", (_) => {
      collide();
    });

    player.onCollide("goal", (_) => {
      location.reload();
    });
    generateEnemies();
  }

  function run() {
    const algo = Array.from(ol.childNodes);
    if (movements.length > 0) {
      ol.removeChild(algo[0]);
      let position = -1;
      player.loop(0.5, () => {
        position += 1;
        if (position === movements.length) {
          movements.length = 0;
          ol.innerHTML = "";
        } else {
          move(movements[position]);
        }
      });
    }
  }
})();
