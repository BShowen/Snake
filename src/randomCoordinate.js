export function randomCoordinate() {
  const randomInt = () => {
    return Math.floor(Math.random() * 1000);
  };

  let x = randomInt();
  x -= x % 20;
  let y = randomInt();
  y -= y % 20;
  return [x, y];
}
