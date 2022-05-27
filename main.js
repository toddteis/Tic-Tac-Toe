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

const playerFactory = (name, mark) => ({
  name, mark,
});

const gameController = (() => {
  function haveWinner(position1, position2, position3) {
    const result = [position1, position2, position3];
    console.log('inside haveWinner');
    console.log(result);
    return result;
  }
  function checkWinGame(board) {
    const currentBoard = board;

    if (currentBoard[0] !== '') {
      // check top left to top right
      if (currentBoard[0] === currentBoard[1]) {
        if (currentBoard[0] === currentBoard[2]) {
          haveWinner(currentBoard[0].indexOf(), currentBoard[1], currentBoard[2]);
        }
      }
      // check top left to bottom right
      if (currentBoard[0] === currentBoard[4]) {
        if (currentBoard[0] === currentBoard[8]) {
          haveWinner(currentBoard[0].indexOf(), currentBoard[4], currentBoard[8]);
        }
      }
      // check top left to bottom left
      if (currentBoard[0] === currentBoard[3]) {
        if (currentBoard[0] === currentBoard[6]) {
          haveWinner(currentBoard[0], currentBoard[3], currentBoard[6]);
        }
      }
    }
    // check top middle to bottom middle
    if (currentBoard[1] !== '') {
      if (currentBoard[1] === currentBoard[4]) {
        if (currentBoard[1] === currentBoard[7]) {
          haveWinner(currentBoard[1], currentBoard[4], currentBoard[7]);
        }
      }
    }
    // check top right to bottom right
    if (currentBoard[2] !== '') {
      if (currentBoard[2] === currentBoard[5]) {
        if (currentBoard[2] === currentBoard[8]) {
          haveWinner(currentBoard[2], currentBoard[5], currentBoard[8]);
        }
      }
    }
    // check middle left to middle right
    if (currentBoard[3] !== '') {
      if (currentBoard[3] === currentBoard[4]) {
        if (currentBoard[3] === currentBoard[5]) {
          haveWinner(currentBoard[3], currentBoard[4], currentBoard[5]);
        }
      }
    }
    // check bottom left to top right
    if (currentBoard[6] !== '') {
      if (currentBoard[6] === currentBoard[4]) {
        if (currentBoard[6] === currentBoard[2]) {
          haveWinner(currentBoard[6], currentBoard[4], currentBoard[2]);
        }
      }
    }
    // check bottom left to bottom right
    if (currentBoard[6] !== '') {
      if (currentBoard[6] === currentBoard[7]) {
        if (currentBoard[6] === currentBoard[8]) {
          haveWinner(currentBoard[6], currentBoard[7], currentBoard[8]);
        }
      }
    }
  }

  // testing
  // const testBoard = ['X', 'X', 'X', '', '', '', '', '', ''];
  // should fire haveWinner()
  // console.log(checkWinGame(testBoard));

  // const testBoard = ['O', 'O', 'O', '', '', '', '', '', ''];
  // should fire haveWinner()
  // console.log(checkWinGame(testBoard));

  const testBoard = ['X', '', '', '', 'X', '', '', '', 'X'];
  // should fire haveWinner()
  console.log(checkWinGame(testBoard));
})();
