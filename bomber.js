
// let SPRITE_HEIGHT = 62;
// let SPRITE_WIDTH = 30;



// const drawSprite = (frameX, frameY) => {
//     const x = frameX * SPRITE_WIDTH;
//     const y = frameY * SPRITE_HEIGHT;
//     bomberman.style.backgroundPosition = `${x}px ${y}px`;
// }

export let bomberman

bomberman = document.createElement('div');
bomberman.className = 'bomber-man';
// bomberman.style.height = `${SPRITE_HEIGHT}px`;
// bomberman.style.width = `${SPRITE_WIDTH}px`;
//bomberman.style.border = '1px solid #000';
bomberman.style.backgroundImage = `url(assets/down1.png)`;
bomberman.classList.add("player")
// drawSprite(1, 1)
