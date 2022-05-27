/* eslint-disable no-underscore-dangle */
const gameBoard = (() => {
  const _gameBoard = ['', '', '', '', '', '', '', '', ''];

  function setGameBoard(position, marker) {
    let result;
    if (position >= 0 && position <= 8) {
      if (marker.toUpperCase() === 'X' || marker.toUpperCase() === 'O') {
        const isAvailable = (_gameBoard[position] === '');
        if (isAvailable) {
          _gameBoard.splice(position, 1, marker);
          result = `Successful: Added marker ${marker} to position ${position}`;
        } else {
          result = 'Unsuccessful: Position already in use.';
        }
      } else {
        result = 'Unsuccessful: Not a valid marker. x or o required.';
      }
    } else {
      result = 'Unsuccessful: Not a valid position. 0-9 required.';
    }

    return result;
  }

  function getGameBoard() {
    return _gameBoard;
  }

  function resetGameBoard() {
    for (let i = 0; i < _gameBoard.length; i += 1) {
      _gameBoard[i] = '';
    }
    return _gameBoard;
  }

  return { setGameBoard, getGameBoard, resetGameBoard };
})();

const game = (() => {
  // Cache DOM

  const name = 'Tic Tac Toe';
  return { name };
})();

console.log(game.name);

const playerFactory = (name, mark) => ({
  name, mark,
});

const tileFactory = (name, row, column, marker) => ({
  name, row, column, marker,
});

const boardTileTopLeft = document.getElementById('top-left');
const boardTileTopCenter = document.getElementById('top-center');
const boardTileTopRight = document.getElementById('top-right');
const boardTileMidLeft = document.getElementById('mid-left');
const boardTileMidCenter = document.getElementById('mid-center');
const boardTileMidRight = document.getElementById('mid-right');
const boardTileBotLeft = document.getElementById('bot-left');
const boardTileBotCenter = document.getElementById('bot-center');
const boardTileBotRight = document.getElementById('bot-right');

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
