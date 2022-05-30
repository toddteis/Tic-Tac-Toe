/* eslint-disable no-underscore-dangle */
const gameBoard = (() => {
  const _gameBoard = ['', '', '', '', '', '', '', '', ''];

  function setGameBoard(position, marker) {
    let result;
    if (position >= 0 && position <= 8) {
      if (marker.toUpperCase() === 'X' || marker.toUpperCase() === 'O') {
        const isAvailable = _gameBoard[position] === '';
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

const playerFactory = (name, mark) => ({
  name,
  mark,
});

const winGameController = (() => {
  function haveWinner(position1, position2, position3) {
    const result = [position1, position2, position3];
    console.log('inside haveWinner');
    console.log(result);
  }
  function checkWinGame(board) {
    const currentBoard = board;

    if (currentBoard[0] !== '') {
      // check top left to top right
      if (currentBoard[0] === currentBoard[1]) {
        if (currentBoard[0] === currentBoard[2]) {
          haveWinner(0, 1, 2);
        }
      }
      // check top left to bottom right
      if (currentBoard[0] === currentBoard[4]) {
        if (currentBoard[0] === currentBoard[8]) {
          haveWinner(0, 4, 8);
        }
      }
      // check top left to bottom left
      if (currentBoard[0] === currentBoard[3]) {
        if (currentBoard[0] === currentBoard[6]) {
          haveWinner(0, 3, 6);
        }
      }
    }
    // check top middle to bottom middle
    if (currentBoard[1] !== '') {
      if (currentBoard[1] === currentBoard[4]) {
        if (currentBoard[1] === currentBoard[7]) {
          haveWinner(1, 4, 7);
        }
      }
    }
    // check top right to bottom right
    if (currentBoard[2] !== '') {
      if (currentBoard[2] === currentBoard[5]) {
        if (currentBoard[2] === currentBoard[8]) {
          haveWinner(2, 5, 8);
        }
      }
    }
    // check middle left to middle right
    if (currentBoard[3] !== '') {
      if (currentBoard[3] === currentBoard[4]) {
        if (currentBoard[3] === currentBoard[5]) {
          haveWinner(3, 4, 5);
        }
      }
    }
    // check bottom left to top right
    if (currentBoard[6] !== '') {
      if (currentBoard[6] === currentBoard[4]) {
        if (currentBoard[6] === currentBoard[2]) {
          haveWinner(6, 4, 2);
        }
      }
    }
    // check bottom left to bottom right
    if (currentBoard[6] !== '') {
      if (currentBoard[6] === currentBoard[7]) {
        if (currentBoard[6] === currentBoard[8]) {
          haveWinner(6, 7, 8);
        }
      }
    }
  }
  return { checkWinGame };
})();

const gameController = (() => {
  
})();
