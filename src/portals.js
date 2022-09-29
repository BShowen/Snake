import { randomCoordinate } from "./randomCoordinate";

export const portals = (() => {
  let cache = [];

  function getPortals() {
    if (cache.length > 0) return cache;

    cache.push(randomCoordinate());
    cache.push(randomCoordinate());

    return cache;
  }

  return getPortals();
})();
