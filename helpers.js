export const randomMonsterDir = () => {
    const directions = ["left", "up", "down", "right"];
    return directions[Math.floor(directions.length * Math.random())];
  };

  export const getPosImg = (frameX, frameY, div) => {
    const x = frameX * 30;
    const y = frameY * 30;
    div.style.backgroundPosition = `${x}px ${y}px`;
  };
  
  export const death = (player, monsters) => {
    player.x = 60;
    player.y = 60;
    monsters.forEach(mn => {
      mn.posX = mn.startX
      mn.posY = mn.startY
    })
  }