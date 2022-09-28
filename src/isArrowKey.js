export function isArrowKey(keyCode) {
  const match = keyCode.match(/up$|down$|left$|right$/i);
  if (match) {
    return [true, match[0].toLowerCase()];
  }
  return [false, null];
}
