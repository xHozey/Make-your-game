export const randomMonsterDir = () => {
    const directions = ["left", "up", "down", "right"];
    return directions[Math.floor(directions.length * Math.random())];
  };

  export const getPosImg = (frameX, frameY, div) => {
    const x = frameX * 30;
    const y = frameY * 30;
    div.style.backgroundPosition = `${x}px ${y}px`;
  };
  