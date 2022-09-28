import { draw } from "./draw";
import { Snake } from "./Snake";
import { isArrowKey } from "./isArrowKey";

export function Game() {
  let isPaused;
  let interval;
  let speed = 100;
  const snake = new Snake();

  const start = () => {
    interval = setInterval(_draw, speed);
  };

  const _toggle = () => {
    switch (isPaused) {
      case true:
        interval = setInterval(_draw, speed);
        isPaused = false;
        break;
      case false:
        clearInterval(interval);
        interval = undefined;
        isPaused = true;
        break;
    }
  };

  const _draw = () => {
    try {
      draw({ coords: snake.move(), fillColor: "orange" });
    } catch (e) {
      clearInterval(interval);
      alert(e.message);
    }
  };

  const _setSnakeDirection = (direction) => {
    // Can change direction only when game is not paused.
    if (isPaused) return;
    snake.setDirection(direction);
  };

  document.addEventListener("keydown", (e) => {
    // You can pause the game ONLY once the game has begun.
    if (e.code === "Enter" && isPaused !== undefined) {
      _toggle();
      return;
    }

    const [isValid, keyDown] = isArrowKey(e.key);
    if (isValid) {
      // isPaused should longer be undefined because the game has started.
      if (isPaused === undefined) isPaused = false;

      _setSnakeDirection(keyDown);
    }
  });

  return { start };
}
