const boardTileTopLeft = document.getElementById('top-left');
const boardTileTopCenter = document.getElementById('top-center');
const boardTileTopRight = document.getElementById('top-right');
const boardTileMidLeft = document.getElementById('mid-left');
const boardTileMidCenter = document.getElementById('mid-center');
const boardTileMidRight = document.getElementById('mid-right');
const boardTileBotLeft = document.getElementById('bot-left');
const boardTileBotCenter = document.getElementById('bot-center');
const boardTileBotRight = document.getElementById('bot-right');

const playerFactory = (name, mark) => ({
  name, mark,
});

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
const playerA = playerFactory('player A', 'X');
const playerB = playerFactory('player B', 'O');

function inputController(para) {
  console.log(para);
}

console.log(board, playerA, playerB);

boardTileTopLeft.addEventListener('click', () => {
  inputController(boardTileTopLeft.id);
});

boardTileTopCenter.addEventListener('click', () => {
  inputController(boardTileTopCenter.id);
});

boardTileTopRight.addEventListener('click', () => {
  inputController(boardTileTopRight.id);
});

boardTileMidLeft.addEventListener('click', () => {
  inputController(boardTileMidLeft.id);
});

boardTileMidCenter.addEventListener('click', () => {
  inputController(boardTileMidCenter.id);
});

boardTileMidRight.addEventListener('click', () => {
  inputController(boardTileMidRight.id);
});

boardTileBotLeft.addEventListener('click', () => {
  inputController(boardTileBotLeft.id);
});

boardTileBotCenter.addEventListener('click', () => {
  inputController(boardTileBotCenter.id);
});

boardTileBotRight.addEventListener('click', () => {
  inputController(boardTileBotRight.id);
});
