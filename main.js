const tileFactory = (name, row, column, marker) => ({
  name, row, column, marker,
});

function createTiles() {
  const arr = [];
  arr.push(tileFactory('topLeft', 1, 1, ''));
  arr.push(tileFactory('topCentre', 1, 2, ''));
  arr.push(tileFactory('topRight', 1, 3, ''));
  arr.push(tileFactory('midLeft', 2, 1, ''));
  arr.push(tileFactory('midCentre', 2, 2, ''));
  arr.push(tileFactory('midRight', 2, 3, ''));
  arr.push(tileFactory('botLeft', 3, 1, ''));
  arr.push(tileFactory('botCenter', 3, 2, ''));
  arr.push(tileFactory('botRight', 3, 3, ''));
  return arr;
}

const board = createTiles();

console.log(board);
