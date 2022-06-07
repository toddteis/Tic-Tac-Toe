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

  return {
    setGameBoard,
    getGameBoard,
    resetGameBoard,
  };
})();

const playerFactory = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
};

const winGameController = (() => {
  let _isWinner = false;
  let _winningPositions = [];
  let _winningMarker;
  let _winningPlayer;

  function getwinningNameFromMarker(marker) {
    if (marker === 'X') {
      _winningPlayer = gameController.getPlayerX().getName();
    } else if (marker === 'O') {
      _winningPlayer = gameController.getPlayerO().getName();
    }
  }

  function getIsWinner() {
    return _isWinner;
  }

  function getWinningPositions() {
    return _winningPositions;
  }

  function getWinningMarker() {
    return _winningMarker;
  }

  function getWinningPlayer() {
    return _winningPlayer;
  }

  function haveWinner(position1, position2, position3, marker) {
    // const result = [position1, position2, position3];
    _winningPositions = [];
    _winningPositions.push(position1, position2, position3);
    _winningMarker = marker;
    getwinningNameFromMarker(marker);
    console.log(_winningPlayer);
    console.log(`winning markers is: ${_winningMarker}`);
    _isWinner = true;
  }
  function checkWinGame(board) {
    const currentBoard = board;
    if (currentBoard[0] !== '') {
      // check top left to top right
      if (currentBoard[0] === currentBoard[1]) {
        if (currentBoard[0] === currentBoard[2]) {
          haveWinner(0, 1, 2, currentBoard[0]);
        }
      }
      // check top left to bottom right
      if (currentBoard[0] === currentBoard[4]) {
        if (currentBoard[0] === currentBoard[8]) {
          haveWinner(0, 4, 8, currentBoard[0]);
        }
      }
      // check top left to bottom left
      if (currentBoard[0] === currentBoard[3]) {
        if (currentBoard[0] === currentBoard[6]) {
          haveWinner(0, 3, 6, currentBoard[0]);
        }
      }
    }
    // check top middle to bottom middle
    if (currentBoard[1] !== '') {
      if (currentBoard[1] === currentBoard[4]) {
        if (currentBoard[1] === currentBoard[7]) {
          haveWinner(1, 4, 7, currentBoard[1]);
        }
      }
    }
    // check top right to bottom right
    if (currentBoard[2] !== '') {
      if (currentBoard[2] === currentBoard[5]) {
        if (currentBoard[2] === currentBoard[8]) {
          haveWinner(2, 5, 8, currentBoard[2]);
        }
      }
    }
    // check middle left to middle right
    if (currentBoard[3] !== '') {
      if (currentBoard[3] === currentBoard[4]) {
        if (currentBoard[3] === currentBoard[5]) {
          haveWinner(3, 4, 5, currentBoard[3]);
        }
      }
    }
    // check bottom left to top right
    if (currentBoard[6] !== '') {
      if (currentBoard[6] === currentBoard[4]) {
        if (currentBoard[6] === currentBoard[2]) {
          haveWinner(6, 4, 2, currentBoard[6]);
        }
      }
    }
    // check bottom left to bottom right
    if (currentBoard[6] !== '') {
      if (currentBoard[6] === currentBoard[7]) {
        if (currentBoard[6] === currentBoard[8]) {
          haveWinner(6, 7, 8, currentBoard[6]);
        }
      }
    }
  }
  return {
    checkWinGame,
    getIsWinner,
    getWinningPositions,
    getWinningMarker,
    getWinningPlayer,
  };
})();

const displayPlayerMsgController = (() => {
  // cache DOM
  const _playerMsg = document.getElementById('message');
  // render
  function setPlayerMsg() {
    let result;
    const player = gameController.getCurrentTurn().getName();
    const totalTurns = gameController.getTotalTurns();
    console.log(totalTurns);
    if (totalTurns === 0) {
      result = `${player} starts.`;
    } else if (winGameController.getIsWinner() === true) {
      const winningPlayerName = winGameController.getWinningPlayer();
      result = `${winningPlayerName} wins!`;
    } else if (totalTurns === 9) {
      console.log(`Draw!! isWinnner: ${winGameController.getIsWinner()}, Total Turns: ${totalTurns}`);
      result = 'Draw!';
    } else {
      result = `${player}'s turn.`;
    }
    _playerMsg.textContent = result;
  }

  return { setPlayerMsg };
})();

const displayBoardController = (() => {
  // cache DOM
  const _topLeft = document.getElementById('0');
  const _topCenter = document.getElementById('1');
  const _topRight = document.getElementById('2');
  const _midLeft = document.getElementById('3');
  const _midCenter = document.getElementById('4');
  const _midRight = document.getElementById('5');
  const _botLeft = document.getElementById('6');
  const _botCenter = document.getElementById('7');
  const _botRight = document.getElementById('8');

  const _displayElement = document.getElementById('game');
  const _childrenElements = _displayElement.children;
  const _errorMsg = document.getElementById('error');

  function getDiv(content, id) {
    if (winGameController.getIsWinner() === true) {
      return;
    }

    if (content === '') {
      if (_errorMsg.style.visibility === 'visible') {
        _errorMsg.style.visibility = 'hidden';
      }
      const marker = gameController.getCurrentTurn().getMarker();
      gameController.setTurn(id, marker);
    } else {
      _errorMsg.style.visibility = 'visible';
    }
  }

  function addWinClass() {
    const winnerPositions = winGameController.getWinningPositions();
    for (let i = 0; i < winnerPositions.length; i += 1) {
      const position = winnerPositions[i];
      if (position === 0) { _topLeft.classList.add('win'); }
      if (position === 1) { _topCenter.classList.add('win'); }
      if (position === 2) { _topRight.classList.add('win'); }
      if (position === 3) { _midLeft.classList.add('win'); }
      if (position === 4) { _midCenter.classList.add('win'); }
      if (position === 5) { _midRight.classList.add('win'); }
      if (position === 6) { _botLeft.classList.add('win'); }
      if (position === 7) { _botCenter.classList.add('win'); }
      if (position === 8) { _botRight.classList.add('win'); }
    }
  }

  for (let i = 0; i < _childrenElements.length; i += 1) {
    const element = _childrenElements[i];
    element.addEventListener('click', () => {
      getDiv(element.textContent, element.id);
    });
  }

  // render
  function renderBoard(board) {
    // takes an array of the board and an renders to the page.
    _topLeft.textContent = board[0];
    _topCenter.textContent = board[1];
    _topRight.textContent = board[2];
    _midLeft.textContent = board[3];
    _midCenter.textContent = board[4];
    _midRight.textContent = board[5];
    _botLeft.textContent = board[6];
    _botCenter.textContent = board[7];
    _botRight.textContent = board[8];

    // add player message
    displayPlayerMsgController.setPlayerMsg();
  }

  return {
    renderBoard,
    addWinClass,
  };
})();

const gameController = (() => {
  const _playerX = playerFactory('Player X', 'X');
  const _playerO = playerFactory('Player O', 'O');
  let currentTurn = _playerX;
  let totalTurns = 0;

  function getPlayerX() {
    return _playerX;
  }

  function getPlayerO() {
    return _playerO;
  }

  function getTotalTurns() {
    return totalTurns;
  }

  function getCurrentTurn() {
    return currentTurn;
  }

  function setTurn(boardPosition, marker) {
    gameBoard.setGameBoard(boardPosition, marker);
    totalTurns += 1;
    if (currentTurn === _playerX) {
      currentTurn = _playerO;
    } else {
      currentTurn = _playerX;
    }
    winGameController.checkWinGame(gameBoard.getGameBoard());
    displayBoardController.renderBoard(gameBoard.getGameBoard());
    if (winGameController.getIsWinner() === true) {
      displayBoardController.addWinClass();
    }
  }

  return {
    setTurn,
    getTotalTurns,
    getCurrentTurn,
    getPlayerX,
    getPlayerO,
  };
})();
