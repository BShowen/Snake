import { directionMap } from "./directionMap";
import { opposite } from "./opposite";

export function Snake() {
  const body = [[480, 480]];
  let head = [480, 480];
  const moveQueue = []; // ===> ["up", "left", "down", ...etc]
  // let grow = false;
  let currentDirection = "idle";

  function _isBodyCoord([x, y]) {
    return body.some((coordinate) => {
      const [bodyX, bodyY] = coordinate;
      return bodyX === x && bodyY === y;
    });
  }

  function setDirection(direction) {
    switch (moveQueue.length) {
      case 0:
        if (opposite[currentDirection] === direction) return;
        moveQueue.push(direction);
        break;
      case 1:
        if (opposite[moveQueue[0]] === direction) return;
        moveQueue.push(direction);
        break;
    }
  }

  function move() {
    // The operands to be worked on in this method.
    let [currentX, currentY] = head;

    // Make sure currentDirection always reflects what the user wants.
    currentDirection = moveQueue.shift() || currentDirection;

    // This gets triggered ONLY when the game is initially started.
    if (currentDirection === "idle") return body;

    // Get the magnitude to add to the current vector (head)
    const vMagnitude = directionMap[currentDirection];

    const nextX = currentX + vMagnitude[0];
    const nextY = currentY + vMagnitude[1];

    if (_isBodyCoord([nextX, nextY])) {
      body.length = 0;
    } else {
      body.unshift([nextX, nextY]);
      body.pop();
    }
    head = [nextX, nextY];
    return body;
  }

  return { move, setDirection };
}
