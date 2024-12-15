const score = document.getElementById("score-id").innerText;
const lifes = document.getElementById("lifes-id").innerText;
const map = document.querySelector(".map");
const grids = [];
const heigth = 28;
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
        playerPos[0] - 1 < 0 ||
        grids[playerPos[0] - 1][playerPos[1]].classList.contains("wall")
      )
        return;
      grids[playerPos[0]][playerPos[1]].classList.remove("pac-man");
      playerPos[0] -= 1;
      grids[playerPos[0]][playerPos[1]].classList.add("pac-man");
      break;
    case "arrowdown":
    case "s":
      if (
        playerPos[0] + 1 >= heigth ||
        grids[playerPos[0] + 1][playerPos[1]].classList.contains("wall")
      )
        return;
      grids[playerPos[0]][playerPos[1]].classList.remove("pac-man");
      playerPos[0] += 1;
      grids[playerPos[0]][playerPos[1]].classList.add("pac-man");
      break;
    case "arrowright":
    case "d":
      if (
        playerPos[1] + 1 >= width ||
        grids[playerPos[0]][playerPos[1] + 1].classList.contains("wall")
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
        playerPos[1] - 1 < 0 ||
        grids[playerPos[0]][playerPos[1] - 1].classList.contains("wall")
      )
        return;
      grids[playerPos[0]][playerPos[1]].classList.remove("pac-man");
      playerPos[1] -= 1;
      grids[playerPos[0]][playerPos[1]].classList.add("pac-man");
      break;
    default:
      break;
  }
};

document.addEventListener("keyup", playerMovement);

class ghost {
  constructor(color, start, speed) {
    this.className = color;
    this.start = start;
    this.speed = speed;
    this.currentPos = start;
    this.isScared = false;
    this.fearCD = NaN
  }
}

const ghosts = [
  new ghost("red", [12, 13], 100),
  new ghost("brown", [12, 14], 150),
  new ghost("green", [12, 12], 120),
  new ghost("pink", [12, 15], 130),
];

ghosts.forEach((ghost) => { 
  const div = document.createElement("div");
  map.appendChild(div);
  grids[ghost.start[0]][ghost.start[1]].classList.add(ghost.className);
  grids[ghost.start[0]][ghost.start[1]].appendChild(div);
})

const ghostMovements = []