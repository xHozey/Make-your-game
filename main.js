import { level_1 } from "./levels.js";
import {
  bomberman,
  getPosImg,
  leftMove,
  rightMove,
  upMove,
  downMove,
} from "./bomber.js";

const map = document.querySelector(".map");
const grids = [];

for (let i = 0; i < level_1.length; i++) {
  grids[i] = [];
  for (let j = 0; j < level_1[i].length; j++) {
    const div = document.createElement("div");
    grids[i].push(div);
    map.appendChild(div);
    if (level_1[i][j] == 0 || level_1[i][j] == "x") {
      div.classList.add("empty");
      continue;
    }
    if (level_1[i][j] == 1) {
      div.classList.add("wall");
      continue;
    }
    if (level_1[i][j] == 2) {
      div.classList.add("soft-wall");
      continue;
    }
    if (level_1[i][j] == 3) {
      div.classList.add("soft-wall", "portal");
      continue;
    }
  }
}

const win = () => {
  //player position in the portal and all enemies are dead
};

const lose = () => {
  //player get expolied by bomber or hited by enemy
};

const playerPos = { x: 60, y: 60 };
let currentLoop = 0;

let slowedBy = 0;
let slowFrameRate = 5;
map.append(bomberman);
bomberman.style.transform = `translate(${playerPos.x}px, ${playerPos.y}px)`;

let boombpos = { x: 0, y: 0 };
let dropedtheboomb = false;
const putTheBomb = () => {
  if (dropedtheboomb) return;
  dropedtheboomb = true;
  boombpos = { x: playerPos.x, y: playerPos.y };
  grids[Math.round(boombpos.y / 30)][Math.round(boombpos.x / 30)].classList.add(
    "bomb"
  );

  setTimeout(() => {
    grids[Math.round(boombpos.y / 30)][
      Math.round(boombpos.x / 30)
    ].classList.remove("bomb");
    grids[Math.round(boombpos.y / 30)][
      Math.round(boombpos.x / 30) + 1
    ].classList.remove("soft-wall");
    grids[Math.round(boombpos.y / 30)][
      Math.round(boombpos.x / 30) + 1
    ].classList.contains("wall")
      ? null
      : grids[Math.round(boombpos.y / 30)][
          Math.round(boombpos.x / 30) + 1
        ].classList.add("empty");
    grids[Math.round(boombpos.y / 30)][
      Math.round(boombpos.x / 30) - 1
    ].classList.remove("soft-wall");
    grids[Math.round(boombpos.y / 30)][
      Math.round(boombpos.x / 30) - 1
    ].classList.contains("wall")
      ? null
      : grids[Math.round(boombpos.y / 30)][
          Math.round(boombpos.x / 30) - 1
        ].classList.add("empty");
    grids[Math.round(boombpos.y / 30) + 1][
      Math.round(boombpos.x / 30)
    ].classList.remove("soft-wall");
    grids[Math.round(boombpos.y / 30) + 1][
      Math.round(boombpos.x / 30)
    ].classList.contains("wall")
      ? null
      : grids[Math.round(boombpos.y / 30) + 1][
          Math.round(boombpos.x / 30)
        ].classList.add("empty");
    grids[Math.round(boombpos.y / 30) - 1][
      Math.round(boombpos.x / 30)
    ].classList.remove("soft-wall");
    grids[Math.round(boombpos.y / 30) - 1][
      Math.round(boombpos.x / 30)
    ].classList.contains("wall")
      ? null
      : grids[Math.round(boombpos.y / 30) - 1][
          Math.round(boombpos.x / 30)
        ].classList.add("empty");
    dropedtheboomb = false;
  }, 2000);
};

const movePlayer = (e) => {
  let rowBot
  let rowTop
  let colTop
  let colBot
  let key = e.key.toLowerCase();
  const playerSpeed = 3;
  switch (key) {
    case "x":
      putTheBomb();
      break;
    case "arrowup":
         rowBot = Math.floor((playerPos.y-playerSpeed )/ 30);
         rowTop = Math.ceil((playerPos.y -playerSpeed)/ 30);
         colBot = Math.floor(playerPos.x / 30);
         colTop = Math.ceil(playerPos.x / 30);
        if (
          grids[rowBot][colBot].classList.contains("wall") ||
          grids[rowBot][colBot].classList.contains("soft-wall") ||
          grids[rowBot][colTop].classList.contains("wall") ||
          grids[rowBot][colTop].classList.contains("soft-wall")
        ) {
          return;
        }
     
      playerPos.y -= playerSpeed;
      getPosImg(upMove[currentLoop], 5);
      break;
    case "arrowdown":
         rowBot = Math.floor((playerPos.y+playerSpeed) / 30);
         rowTop = Math.ceil((playerPos.y +playerSpeed)/ 30);
         colBot = Math.floor(playerPos.x / 30);
         colTop = Math.ceil(playerPos.x / 30);
         console.log(grids[rowTop][colBot],grids[rowTop][colTop]);
         console.log([rowTop,colBot],[rowTop,colTop]);

        if (
          grids[rowTop][colBot].classList.contains("wall") ||
          grids[rowTop][colBot].classList.contains("soft-wall") ||
          grids[rowTop][colTop].classList.contains("wall") ||
          grids[rowTop][colTop].classList.contains("soft-wall")
        ) {
          return;
        }
     
      playerPos.y += playerSpeed;
      getPosImg(downMove[currentLoop], 8);
      break;
    case "arrowleft":
         rowBot = Math.floor(playerPos.y / 30);
         rowTop = Math.ceil(playerPos.y / 30);
         colBot = Math.floor((playerPos.x-playerSpeed) / 30);
         colTop = Math.ceil((playerPos.x -playerSpeed)/ 30);
        console.log(grids[rowTop][colBot], grids[rowBot][colBot]);
        console.log([rowTop, colBot], [rowTop, colTop]);
        if (
          grids[rowTop][colBot].classList.contains("wall") ||
          grids[rowTop][colBot].classList.contains("soft-wall") ||
          grids[rowBot][colBot].classList.contains("wall") ||
          grids[rowBot][colBot].classList.contains("soft-wall") ||
          grids[rowBot][colTop].classList.contains("wall") ||
          grids[rowBot][colTop].classList.contains("soft-wall") ||
          grids[rowTop][colTop].classList.contains("wall") ||
          grids[rowTop][colTop].classList.contains("soft-wall")
        ) {
          return;
        }
     
      playerPos.x -= playerSpeed;
      getPosImg(leftMove[currentLoop], 7);
      break;
    case "arrowright":
         rowBot = Math.floor(playerPos.y / 30);
         rowTop = Math.ceil(playerPos.y / 30);
         colBot = Math.floor((playerPos.x+playerSpeed) / 30);
         colTop = Math.ceil((playerPos.x+playerSpeed)/ 30); 
        if (
          grids[rowTop][colBot].classList.contains("wall") ||
          grids[rowTop][colBot].classList.contains("soft-wall") ||
          grids[rowTop][colTop].classList.contains("wall") ||
          grids[rowTop][colTop].classList.contains("soft-wall") ||
          grids[rowBot][colTop].classList.contains("wall") ||
          grids[rowBot][colTop].classList.contains("soft-wall") ||
          grids[rowTop][colTop].classList.contains("wall") ||
          grids[rowTop][colTop].classList.contains("soft-wall")
        ) {
          return;
        }
     
      playerPos.x += playerSpeed;
      getPosImg(rightMove[currentLoop], 6);
      break;
    default:
      break;
  }

};

const animateMovement = () => {
  bomberman.style.transform = `translate(${playerPos.x}px, ${playerPos.y}px)`;
  if (slowedBy >= slowFrameRate) {
    if (currentLoop < downMove.length - 1) {
      currentLoop++;
    } else {
      currentLoop = 0;
    }
    slowedBy = 0;
  } else {
    slowedBy++;
  }

  requestAnimationFrame(animateMovement);
};

requestAnimationFrame(animateMovement);

document.addEventListener("keydown", movePlayer);
