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

  function _canEatFood(foodCoordinates) {
    return foodCoordinates.some((foodCoordinate) => {
      const [foodX, foodY] = foodCoordinate;
      const [headX, headY] = head;
      return foodX === headX && foodY === headY;
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

  function _getNextCoords(portals) {
    // The operands to be worked on in this method.
    const [currentX, currentY] = head;

    // Get the magnitude to add to the current vector (head)
    const vMagnitude = directionMap[currentDirection];

    // Allow positive wrapping around the map.
    let nextX = (currentX + vMagnitude[0]) % 1000;
    let nextY = (currentY + vMagnitude[1]) % 1000;

    const [portalA, portalB] = portals;
    const [portalA_X, portalA_Y] = portalA;
    const [portalB_X, portalB_Y] = portalB;

    if (nextX === portalA_X && nextY === portalA_Y) {
      nextX = portalB_X + vMagnitude[0];
      nextY = portalB_Y + vMagnitude[1];
    } else if (nextX === portalB_X && nextY === portalB_Y) {
      nextX = portalA_X + vMagnitude[0];
      nextY = portalA_Y + vMagnitude[1];
    }

    // Allow negative wrapping around the map.
    if (nextX < 0) nextX = 1000 - Math.abs(nextX);
    if (nextY < 0) nextY = 1000 - Math.abs(nextY);

    return [nextX, nextY];
  }

  function move(food, portals) {
    // Make sure currentDirection always reflects what the user wants.
    currentDirection = moveQueue.shift() || currentDirection;

    // This gets triggered ONLY when the game is initially started.
    if (currentDirection === "idle") return body;

    const [nextX, nextY] = _getNextCoords(portals);

    if (_isBodyCoord([nextX, nextY])) {
      body.length = 1;
    } else if (_canEatFood(food.getFood())) {
      food.remove(head);
      body.unshift([nextX, nextY]);
    } else {
      body.unshift([nextX, nextY]);
      body.pop();
    }
    head = [nextX, nextY];
    return body;
  }

  function getBody() {
    // Return a COPY of the body.
    return body.slice();
  }

  return { move, setDirection, getBody };
}
