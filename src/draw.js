export const draw = (() => {
  const _context = (() => {
    const _canvas = document.createElement("canvas");
    _canvas.setAttribute("width", "1000");
    _canvas.setAttribute("height", "1000");
    _canvas.setAttribute("style", "border: 1px solid black");

    document.body.appendChild(_canvas);

    const context = _canvas.getContext("2d");
    return context;
  })();

  const _clear = function () {
    _context.fillStyle = "white";
    _context.fillRect(0, 0, 1000, 1000);
  };

  const draw = function (...drawObjects) {
    _clear();
    for (const drawObject of drawObjects) {
      const { coords, fillColor, travelThroughWalls } = drawObject;
      if (!travelThroughWalls) {
        const outOfBounds = coords.some((coord) => {
          const [x, y] = coord;
          return x >= 1000 || y >= 1000 || x < 0 || y < 0;
        });

        if (outOfBounds) {
          throw new Error("Don't hit the walls!");
        }
      }

      coords.forEach((coord) => {
        const [x, y] = coord;
        _context.fillStyle = fillColor;
        _context.fillRect(x, y, 20, 20);
      });
    }
  };

  return draw;
})();
