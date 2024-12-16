let score = document.getElementById("score-id");
let currentScore = 0;
score.innerText = String(currentScore);
let lifes = document.getElementById("lifes-id").innerText;
const map = document.querySelector(".map");
const grids = [];
const width = 28;
const level_1 = [
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    1, 0, 1,
  ],
  [
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    1, 3, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    1, 0, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    1, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    1, 0, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1,
  ],
  [
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    1, 1, 1,
  ],
  [
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1,
    1, 1, 1,
  ],
  [
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1,
    1, 1, 1,
  ],
  [
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1,
    1, 1, 1,
  ],
  [
    5, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4,
    4, 4, 5,
  ],
  [
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1,
    1, 1, 1,
  ],
  [
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1,
    1, 1, 1,
  ],
  [
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1,
    1, 1, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0,
    0, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    1, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    1, 0, 1,
  ],
  [
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
    0, 3, 1,
  ],
  [
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
    1, 1, 1,
  ],
  [
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
    1, 1, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
    0, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 1,
  ],
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1,
  ],
];

// 0-pac-dots
// 1- wall
// 2-ghost-lair
// 3-power-pellet
// 4-empty
// 5-teleport

for (let i = 0; i < level_1.length; i++) {
  grids[i] = [];
  for (let j = 0; j < level_1[i].length; j++) {
    const div = document.createElement("div");
    map.appendChild(div);
    grids[i].push(div);
    switch (level_1[i][j]) {
      case 0:
        grids[i][j].classList.add("pac-dot");
        continue;
      case 1:
        grids[i][j].classList.add("wall");
        continue;
      case 2:
        grids[i][j].classList.add("ghost-lair");
        continue;
      case 3:
        grids[i][j].classList.add("power-pellet");
        continue;
      case 4:
        grids[i][j].classList.add("empy");
        continue;
      case 5:
        grids[i][j].classList.add("teleport");
      default:
        continue;
    }
  }
}

let playerPos = [17, 14];
grids[playerPos[0]][playerPos[1]].classList.add("pac-man");

const playerMovement = (event) => {
  switch (event.key.toLowerCase()) {
    case "arrowup":
    case "w":
      if (
        grids[playerPos[0] - 1][playerPos[1]].classList.contains("wall") ||
        grids[playerPos[0] - 1][playerPos[1]].classList.contains("ghost-lair")
      )
        return;
      grids[playerPos[0]][playerPos[1]].classList.remove("pac-man");
      playerPos[0] -= 1;
      grids[playerPos[0]][playerPos[1]].classList.add("pac-man");
      break;
    case "arrowdown":
    case "s":
      if (
        grids[playerPos[0] + 1][playerPos[1]].classList.contains("wall") ||
        grids[playerPos[0] + 1][playerPos[1]].classList.contains("ghost-lair")
      )
        return;
      grids[playerPos[0]][playerPos[1]].classList.remove("pac-man");
      playerPos[0] += 1;
      grids[playerPos[0]][playerPos[1]].classList.add("pac-man");
      break;
    case "arrowright":
    case "d":
      if (
        grids[playerPos[0]][playerPos[1] + 1].classList.contains("wall") ||
        grids[playerPos[0]][playerPos[1] + 1].classList.contains("ghost-lair")
      )
        return;
      grids[playerPos[0]][playerPos[1]].classList.remove("pac-man");
      playerPos[1] += 1;
      if (grids[playerPos[0]][playerPos[1]].classList.contains("teleport")) {
        playerPos[1] = 0;
        grids[playerPos[0]][0].classList.add("pac-man");
        return;
      }
      grids[playerPos[0]][playerPos[1]].classList.add("pac-man");
      break;
    case "arrowleft":
    case "a":
      if (
        grids[playerPos[0]][playerPos[1] - 1].classList.contains("wall") ||
        grids[playerPos[0]][playerPos[1] - 1].classList.contains("ghost-lair")
      )
        return;
      grids[playerPos[0]][playerPos[1]].classList.remove("pac-man");
      playerPos[1] -= 1;
      if (grids[playerPos[0]][playerPos[1]].classList.contains("teleport")) {
        playerPos[1] = 27;
        grids[playerPos[0]][27].classList.add("pac-man");
        return;
      }
      grids[playerPos[0]][playerPos[1]].classList.add("pac-man");
      break;
    default:
      break;
  }
  eatPacDot();
  eatPowerPullet();
};

document.addEventListener("keyup", playerMovement);

class ghost {
  constructor(color, start, speed) {
    this.className = color;
    this.start = start;
    this.speed = speed;
    this.currentPos = start;
    this.isScared = false;
    this.timerId = NaN;
  }
}

const ghosts = [
  new ghost("red", [12, 13], 1200),
  new ghost("brown", [12, 14], 1200),
  new ghost("green", [12, 12], 1200),
  new ghost("pink", [12, 15], 1200),
];

ghosts.forEach((ghost) => {
  grids[ghost.currentPos[0]][ghost.currentPos[1]].classList.add(
    ghost.className
  );
  grids[ghost.currentPos[0]][ghost.currentPos[1]].classList.add("ghost");
});

const ghostMovements = (ghost) => {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let nextMove = directions[Math.floor(Math.random() * directions.length)];

  ghost.timerId = setInterval(() => {
    const invalidDirection =
      grids[ghost.currentPos[0] + nextMove[0]][
        ghost.currentPos[1] + nextMove[1]
      ].classList.contains("wall") ||
      grids[ghost.currentPos[0] + nextMove[0]][
        ghost.currentPos[1] + nextMove[1]
      ].classList.contains("ghost");

    if (!invalidDirection) {
      grids[ghost.currentPos[0]][ghost.currentPos[1]].classList.remove(
        "ghost",
        "scared-ghost",
        ghost.className
      );
      ghost.currentPos[0] += nextMove[0];
      ghost.currentPos[1] += nextMove[1];
      grids[ghost.currentPos[0]][ghost.currentPos[1]].classList.add("ghost");
      grids[ghost.currentPos[0]][ghost.currentPos[1]].classList.add(
        ghost.className
      );
    } else nextMove = directions[Math.floor(Math.random() * directions.length)];
    if (ghost.isScared)
      grids[ghost.currentPos[0]][ghost.currentPos[1]].classList.add(
        "scared-ghost"
      );
    if (
      ghost.isScared &&
      grids[ghost.currentPos[0]][ghost.currentPos[1]].classList.contains(
        "pac-man"
      )
    ) {
      grids[ghost.currentPos[0]][ghost.currentPos[1]].classList.remove(
        "ghost",
        "scared-ghost",
        ghost.className
      );
      console.log(ghost.start);
      console.log(ghost.currentPos);
      ghost.currentPos = ghost.start;
      console.log(ghost.currentPos);
      currentScore += 200;
      score.innerText = String(currentScore);
      ghost.isScared = false;
      grids[ghost.currentPos[0]][ghost.currentPos[1]].classList.add(
        "ghost",
        ghost.className
      );
    }
  }, ghost.speed);
};

const eatPacDot = () => {
  if (grids[playerPos[0]][playerPos[1]].classList.contains("pac-dot")) {
    grids[playerPos[0]][playerPos[1]].classList.remove("pac-dot");
    currentScore += 10;
    score.innerText = String(currentScore);
  }
};

const eatPowerPullet = () => {
  if (grids[playerPos[0]][playerPos[1]].classList.contains("power-pellet")) {
    grids[playerPos[0]][playerPos[1]].classList.remove("power-pellet");
    currentScore += 50;
    score.innerText = String(currentScore);
    ghosts.forEach((ghost) => (ghost.isScared = true));
    setTimeout(() => {
      ghosts.forEach((ghost) => (ghost.isScared = false));
    }, 10000000);
  }
};

ghosts.forEach((ghost) => ghostMovements(ghost));
