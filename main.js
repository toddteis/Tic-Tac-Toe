/* eslint-disable no-underscore-dangle */
const gameBoard = (() => {
  const _gameBoard = ['', '', '', '', '', '', '', '', ''];

  function setGameBoard(position, marker) {
    let result;
    console.log(position, marker);
    if (position >= 0 && position <= 8) {
      if (marker.toUpperCase() === 'X' || marker.toUpperCase() === 'O') {
        const isAvailable = _gameBoard[position] === '';
        console.log(isAvailable);
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

const playerFactory = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
};

const winGameController = (() => {
  let isWinner = false;
  function getIsWinner() {
    return isWinner;
  }
  function haveWinner(position1, position2, position3) {
    const result = [position1, position2, position3];
    console.log('inside haveWinner');
    isWinner = true;
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
  return { checkWinGame, getIsWinner };
})();

const gameController = (() => {
  const playerX = playerFactory('Player X', 'X');
  const playerO = playerFactory('Player O', 'O');
  let currentTurn = playerX;
  let totalTurns = 0;
  function setTurn(boardPosition, marker) {
    gameBoard.setGameBoard(boardPosition, marker);
    console.log(gameBoard.getGameBoard());
  }
  // for (let t = 0; t < 9; t += 1) {
  //   const winStatus = winGameController.getIsWinner();
  //   if (winStatus === false) {
  //     const getPosition = Number(prompt('position?'));
  //     const getMarker = prompt('marker?');
  //     setTurn(getPosition, getMarker);
  //     winGameController.checkWinGame(gameBoard.getGameBoard());
  //     console.log(`inside the while statement:  ${winGameController.getIsWinner()}`);
  //     totalTurns += 1;
  //   }
  // }

  // if (totalTurns === 9) {
  //   console.log('draw');
  // }
  return { setTurn };
})();

const displayController = (() => {
  // cache DOM
  const topLeft = document.getElementById('0');
  const topCenter = document.getElementById('1');
  const topRight = document.getElementById('2');
  const midLeft = document.getElementById('3');
  const midCenter = document.getElementById('4');
  const midRight = document.getElementById('5');
  const botLeft = document.getElementById('6');
  const botCenter = document.getElementById('7');
  const botRight = document.getElementById('8');

  const displayElement = document.getElementById('game');
  const childrenElements = displayElement.children;
  function getDiv(content, id) {
    if (content === '') {
      console.log(`Sending selection of ${id}`);
    } else {
      console.log('Already taken..try again');
    }
  }

  for (let i = 0; i < childrenElements.length; i += 1) {
    const element = childrenElements[i];
    element.addEventListener('click', () => {
      getDiv(element.textContent, element.id);
    });
  }
  // render
})();
