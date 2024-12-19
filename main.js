import { level_1 } from "./levels.js";
let map = document.querySelector(".map");
const grids = [];

for (let i = 0; i < level_1.length; i++) {
  grids[i] = [];
  for (let j = 0; j < level_1[i].length; j++) {
    let div = document.createElement("div");
    grids[i].push(div);
    map.appendChild(div);
    switch (level_1[i][j]) {
      case 0:
        div.classList.add("empty");
        break;
      case 1:
        div.classList.add("wall");
      default:
        break;
    }
  }
}

let bomberman = document.createElement("div");
bomberman.classList.add("bomber-man");
const playerPos = { x: 30, y: 30 };
let targetPos = { ...playerPos };

bomberman.style.transform = `translate(${playerPos.x}px, ${playerPos.y}px)`;
map.appendChild(bomberman);

const movePlayer = (e) => {
  let key = e.key.toLowerCase();
  const playerSpeed = 10;

  switch (key) {
    case "arrowup":
      if (
        targetPos.y / 30 > 0 &&
        level_1[targetPos.y / 30 - 1][targetPos.x / 30] !== 1
      ) {
        targetPos.y -= playerSpeed;
      }
      break;
    case "arrowdown":
      if (
        targetPos.y / 30 < level_1.length - 1 &&
        level_1[targetPos.y / 30 + 1][targetPos.x / 30] !== 1
      ) {
        targetPos.y += playerSpeed;
      }
      break;
    case "arrowleft":
      if (
        targetPos.x / 30 > 0 &&
        level_1[targetPos.y / 30][targetPos.x / 30 - 1] !== 1
      ) {
        targetPos.x -= playerSpeed;
      }
      break;
    case "arrowright":
      if (
        targetPos.x / 30 < level_1[0].length - 1 &&
        level_1[targetPos.y / 30][targetPos.x / 30 + 1] !== 1
      ) {
        targetPos.x += playerSpeed;
      }
      break;
    default:
      break;
  }

  requestAnimationFrame(animateMovement);
};

const animateMovement = () => {
  bomberman.style.transform = `translate(${targetPos.x}px, ${targetPos.y}px)`;
  requestAnimationFrame(animateMovement);
};

document.addEventListener("keydown", movePlayer);
