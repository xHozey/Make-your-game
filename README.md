# Smooth 60 FPS Browser Game

## Project Overview

This project involves creating a browser-based game that runs smoothly at **60 frames per second (FPS)** without any frame drops or stuttering animations. The game must use only **plain JavaScript, DOM manipulation, and HTML** — **no frameworks or canvas** allowed.

---

## Key Features

- **Smooth animation running at 60 FPS** using `requestAnimationFrame`  
- No frame drops or janky/stuttered motion  
- Keyboard controls that respond smoothly to key press and release events  
- Player can hold keys to continuously perform actions without needing to spam keys  
- **Pause menu** with options to:  
  - Continue the game  
  - Restart the game  
- **Scoreboard** displaying:  
  - Countdown clock or timer (time remaining or elapsed)  
  - Current score (XP or points)  
  - Number of lives remaining  
- Optimized rendering performance with minimal but necessary use of layers  

---

## Gameplay Constraints

- The game genre must be similar to one of the following classics:  
  - Bomberman  
  - Flipper / Pinball  
  - Space Invaders  
  - Donkey Kong  
  - Brick Breaker / Arkanoid  
  - Pac-Man  
  - Super Mario  
  - Tetris  
  - Duck Hunt  

---

## Technical Requirements

- Use **`requestAnimationFrame`** for smooth animations and consistent motion  
- Controls must allow continuous movement/action while keys are held down  
- The game should **never drop below 60 FPS**  
- When the game is paused, the animation loop must stop without causing frame drops or errors  
- All UI and game rendering must be done using DOM and CSS transforms/opacity for best performance  
- Avoid unnecessary repaint or reflow by optimizing styles and DOM manipulation  

---

## Development Tools

Use browser developer tools extensively to monitor and optimize performance:

- **Page Inspector:** Inspect and edit DOM elements and styles in real-time  
- **Web Console:** Debug JavaScript and check console logs  
- **Performance Tool:** Record and analyze frame rate, frame drops, function execution time, painting, layout, and compositing  
- **Paint Flashing:** Visualize repaints to identify unnecessary rendering  

---

## Learning Outcomes

- Deep understanding of **requestAnimationFrame** and the JavaScript **event loop**  
- How to maintain **60 FPS** and avoid jank/stutter in animations  
- Working with **DOM**, **CSS transforms**, and **opacity** for smooth rendering  
- Profiling and optimizing browser rendering tasks: **JavaScript execution**, **style calculation**, **layout**, **painting**, and **compositing**  
- Mastering browser developer tools to debug and improve web app performance  

---

## How to Run

- Open the `index.html` in a modern browser (Chrome, Firefox recommended)  
- Use the keyboard to play the game  
- Press the pause menu key to pause, restart, or continue the game  

---

## Notes

- No external libraries or frameworks are permitted  
- No use of `<canvas>` element; all animations must use DOM and CSS  
- Make sure to test performance on multiple browsers and devices to guarantee consistent 60 FPS  

---

## License

This project is for learning and educational purposes.
