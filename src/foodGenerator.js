import { randomCoordinate } from "./randomCoordinate";
export function foodGenerator(foodItems) {
  let cache = [];

  const getFood = () => {
    if (cache.length === foodItems) {
      return cache;
    }

    for (let i = cache.length; i < foodItems; i++) {
      cache.push(randomCoordinate());
    }

    return cache;
  };

  const remove = (badCoordinate) => {
    cache = cache.filter((coordinate) => {
      return !(
        badCoordinate[0] === coordinate[0] && badCoordinate[1] === coordinate[1]
      );
    });
  };

  return { getFood, remove };
}
