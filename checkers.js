import { Size } from "./main.js";

export const checkUpperMove = (grids,rowBot, colBot, colTop) => {
    return (
      grids[rowBot][colBot].classList.contains("wall") ||
      grids[rowBot][colBot].classList.contains("soft-wall") ||
      grids[rowBot][colTop].classList.contains("wall") ||
      grids[rowBot][colTop].classList.contains("soft-wall")
    );
  };
  
  export const checkDownMove = (grids,rowTop, colBot, colTop) => {
    return (
      grids[rowTop][colBot].classList.contains("wall") ||
      grids[rowTop][colBot].classList.contains("soft-wall") ||
      grids[rowTop][colTop].classList.contains("wall") ||
      grids[rowTop][colTop].classList.contains("soft-wall")
    );
  };
  
  export const checkLeftMove = (grids,rowBot, rowTop, colBot, colTop) => {
    return (
      grids[rowTop][colBot].classList.contains("wall") ||
      grids[rowTop][colBot].classList.contains("soft-wall") ||
      grids[rowBot][colBot].classList.contains("wall") ||
      grids[rowBot][colBot].classList.contains("soft-wall") ||
      grids[rowBot][colTop].classList.contains("wall") ||
      grids[rowBot][colTop].classList.contains("soft-wall") ||
      grids[rowTop][colTop].classList.contains("wall") ||
      grids[rowTop][colTop].classList.contains("soft-wall")
    );
  };
  
  export const checkRightMove = (grids,rowBot, rowTop, colBot, colTop) => {
    return (
      grids[rowTop][colBot].classList.contains("wall") ||
      grids[rowTop][colBot].classList.contains("soft-wall") ||
      grids[rowTop][colTop].classList.contains("wall") ||
      grids[rowTop][colTop].classList.contains("soft-wall") ||
      grids[rowBot][colTop].classList.contains("wall") ||
      grids[rowBot][colTop].classList.contains("soft-wall") ||
      grids[rowTop][colTop].classList.contains("wall") ||
      grids[rowTop][colTop].classList.contains("soft-wall")
    );
  };

  export const checkMonsterMove = (enemy, grids) => {
    let rowBot;
    let rowTop;
    let colBot;
    let colTop;
    switch (enemy.dir) {
      case "up":
        rowBot = Math.floor((enemy.posY - enemy.speed) / Size);
        colBot = Math.floor(enemy.posX / Size);
        colTop = Math.ceil(enemy.posX / Size);
        return checkUpperMove(grids,rowBot, colBot, colTop);
      case "down":
        rowBot = Math.floor((enemy.posY + enemy.speed) / Size);
        rowTop = Math.ceil((enemy.posY + enemy.speed) / Size);
        colBot = Math.floor(enemy.posX / Size);
        colTop = Math.ceil(enemy.posX / Size);
        return checkDownMove(grids, rowTop, colBot, colTop);
      case "right":
        rowBot = Math.floor(enemy.posY / Size);
        rowTop = Math.ceil(enemy.posY / Size);
        colBot = Math.floor((enemy.posX + enemy.speed) / Size);
        colTop = Math.ceil((enemy.posX + enemy.speed) / Size);
        return checkRightMove(grids,rowBot, rowTop, colBot, colTop);
      case "left":
        rowBot = Math.floor(enemy.posY / Size);
        rowTop = Math.ceil(enemy.posY / Size);
        colBot = Math.floor((enemy.posX - enemy.speed) / Size);
        colTop = Math.ceil((enemy.posX - enemy.speed) / Size);
        return checkLeftMove(grids,rowBot, rowTop, colBot, colTop);
    }
  }

  export const checkIfBombed = (grids,x,y) => {
    return grids[Math.round(y/Size)][Math.round(x/Size)].classList.contains('explotion')
  }