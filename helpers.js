import { width,height } from "./main.js";

export const randomMonsterDir = () => {
  const directions = ["left", "up", "down", "right"];
  return directions[Math.floor(directions.length * Math.random())];
};

export const getPosImg = (frameX, frameY, div) => {
  const x = frameX * width;
  const y = frameY * height;
  div.style.backgroundPosition = `${x}px ${y}px`;
};

export const death = (player, monsters, bomberman) => {
  bomberman.classList.add('immune')
  setTimeout(() => {
    bomberman.classList.remove('immune')
  },1500)
  monsters.forEach((mn) => {
    mn.posX = mn.startX*width;
    mn.posY = mn.startY*height;
  });
  player.x = player.startX;
  player.y = player.startY;
};

export const getPlayerPose = (bluePrint) => {
  for (let i = 0; i < bluePrint.length; i++) {
    for (let j = 0; j < bluePrint[i].length; j++) {
      if (bluePrint[i][j] === "x") return [i, j];
    }
  }
};

export const Displaymenu = (map) => {
  let menu = document.getElementById("menu");
  if (menu.classList.contains("open")) {
    menu.classList.remove("open");
    map.style.background = `rgb(0, 0, 0,0.7);`
  } else {
    menu.classList.add("open");
  }
};
