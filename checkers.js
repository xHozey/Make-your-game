const size = 30

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
        rowBot = Math.floor((enemy.posY - enemy.speed) / size);
        colBot = Math.floor(enemy.posX / size);
        colTop = Math.ceil(enemy.posX / size);
        return checkUpperMove(grids,rowBot, colBot, colTop);
      case "down":
        rowBot = Math.floor((enemy.posY + enemy.speed) / size);
        rowTop = Math.ceil((enemy.posY + enemy.speed) / size);
        colBot = Math.floor(enemy.posX / size);
        colTop = Math.ceil(enemy.posX / size);
        return checkDownMove(grids, rowTop, colBot, colTop);
      case "right":
        rowBot = Math.floor(enemy.posY / size);
        rowTop = Math.ceil(enemy.posY / size);
        colBot = Math.floor((enemy.posX + enemy.speed) / size);
        colTop = Math.ceil((enemy.posX + enemy.speed) / size);
        return checkRightMove(grids,rowBot, rowTop, colBot, colTop);
      case "left":
        rowBot = Math.floor(enemy.posY / size);
        rowTop = Math.ceil(enemy.posY / size);
        colBot = Math.floor((enemy.posX - enemy.speed) / size);
        colTop = Math.ceil((enemy.posX - enemy.speed) / size);
        return checkLeftMove(grids,rowBot, rowTop, colBot, colTop);
    }
  }