const preGame = (() => {
  let _player1;
  let _player2;

  // Cache DOM
  const enterNamesForm = document.getElementById('enter-names-form');
  const confirmNamesForm = document.getElementById('confirm-names-form');
  const playerX = document.getElementById('player-x');
  const playerO = document.getElementById('player-o');
  const btnBack = document.getElementById('btn-back');
  const btnNext = document.getElementById('btn-next');
  const btnStart = document.getElementById('btn-start');
  const playerXEle = document.getElementById('player1');
  const playerOEle = document.getElementById('player2');
  const preGameEle = document.getElementById('pre-game');
  const gameEle = document.getElementById('game');

  function navBack() {
    enterNamesForm.style.display = null;
    confirmNamesForm.style.display = 'none';
    _player1 = undefined;
    _player2 = undefined;
    btnBack.style.display = 'none';
    btnNext.style.display = null;
    btnStart.style.display = 'none';
  }

  function navNext() {
    if (_player1 === undefined) {
      _player1 = 'Player X';
    }
    if (_player2 === undefined) {
      _player2 = 'Player O';
    }
    if (_player1 === 'Player X') {
      playerXEle.textContent = _player1;
    } else {
      playerXEle.textContent = `${_player1} (X)`;
    }
    if (_player2 === 'Player O') {
      playerOEle.textContent = _player2;
    } else {
      playerOEle.textContent = `${_player2} (O)`;
    }
    enterNamesForm.style.display = 'none';
    confirmNamesForm.style.display = null;
    btnBack.style.display = null;
    btnNext.style.display = 'none';
    btnStart.style.display = null;
    playerX.value = '';
    playerO.value = '';
  }

  function navStart() {
    gameController.setPlayerX(_player1);
    gameController.setPlayerO(_player2);
    preGameEle.style.display = 'none';
    gameEle.classList.remove('hidden');
  }

  function getPlayerXValue(e) {
    _player1 = e.target.value;
  }

  function getPlayerOValue(e) {
    _player2 = e.target.value;
  }

  function restart() {
    navBack();
    preGameEle.style.display = null;
    gameEle.classList.add('hidden');
  }

  // Event Listeners
  playerX.addEventListener('input', getPlayerXValue);
  playerO.addEventListener('input', getPlayerOValue);
  btnBack.addEventListener('click', navBack);
  btnNext.addEventListener('click', navNext);
  btnStart.addEventListener('click', navStart);

  return { restart };
})();

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

  function resetWinner() {
    _isWinner = false;
    _winningPositions = [];
    _winningMarker = '';
    _winningPlayer = '';
  }

  function haveWinner(position1, position2, position3, marker) {
    _winningPositions = [];
    _winningPositions.push(position1, position2, position3);
    _winningMarker = marker;
    getwinningNameFromMarker(marker);
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
    resetWinner,
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
    if (totalTurns === 0) {
      result = `${player} starts.`;
    } else if (winGameController.getIsWinner() === true) {
      const winningPlayerName = winGameController.getWinningPlayer();
      result = `${winningPlayerName} wins!`;
    } else if (totalTurns === 9) {
      result = 'Draw!';
    } else {
      result = `${player}'s turn.`;
    }
    _playerMsg.textContent = result;
  }

  function setOpeningMsg(name) {
    _playerMsg.textContent = `${name} starts.`;
  }

  return { setPlayerMsg, setOpeningMsg };
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

  const _displayElement = document.getElementById('game-board');
  const _childrenElements = _displayElement.children;
  const _errorMsg = document.getElementById('error');
  const _btnReplay = document.getElementById('btn-replay');
  const _btnRestart = document.getElementById('btn-restart');

  function toggleShowHideBtn() {
    if (_btnReplay.style.visibility === 'visible') {
      _btnReplay.style.visibility = 'hidden';
      _btnRestart.style.visibility = 'hidden';
    } else {
      _btnReplay.style.visibility = 'visible';
      _btnRestart.style.visibility = 'visible';
    }
  }

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

  function toggleWinClass() {
    const winnerPositions = winGameController.getWinningPositions();
    for (let i = 0; i < winnerPositions.length; i += 1) {
      const position = winnerPositions[i];
      if (position === 0) {
        if (_topLeft.classList.contains('win')) {
          _topLeft.classList.remove('win');
        } else {
          _topLeft.classList.add('win');
        }
      }
      if (position === 1) {
        if (_topCenter.classList.contains('win')) {
          _topCenter.classList.remove('win');
        } else {
          _topCenter.classList.add('win');
        }
      }
      if (position === 2) {
        if (_topRight.classList.contains('win')) {
          _topRight.classList.remove('win');
        } else {
          _topRight.classList.add('win');
        }
      }
      if (position === 3) {
        if (_midLeft.classList.contains('win')) {
          _midLeft.classList.remove('win');
        } else {
          _midLeft.classList.add('win');
        }
      }
      if (position === 4) {
        if (_midCenter.classList.contains('win')) {
          _midCenter.classList.remove('win');
        } else {
          _midCenter.classList.add('win');
        }
      }
      if (position === 5) {
        if (_midRight.classList.contains('win')) {
          _midRight.classList.remove('win');
        } else {
          _midRight.classList.add('win');
        }
      }
      if (position === 6) {
        if (_botLeft.classList.contains('win')) {
          _botLeft.classList.remove('win');
        } else {
          _botLeft.classList.add('win');
        }
      }
      if (position === 7) {
        if (_botCenter.classList.contains('win')) {
          _botCenter.classList.remove('win');
        } else {
          _botCenter.classList.add('win');
        }
      }
      if (position === 8) {
        if (_botRight.classList.contains('win')) {
          _botRight.classList.remove('win');
        } else {
          _botRight.classList.add('win');
        }
      }
    }
  }

  function replay() {
    toggleWinClass();
    gameController.resetGame();
    toggleShowHideBtn();
  }

  function restart() {
    preGame.restart();
    toggleShowHideBtn();
    toggleWinClass();
    gameController.resetGame();
  }

  _btnReplay.addEventListener('click', replay);
  _btnRestart.addEventListener('click', restart);

  for (let i = 0; i < _childrenElements.length; i += 1) {
    const element = _childrenElements[i];
    element.addEventListener('click', () => {
      getDiv(element.textContent, element.id);
    });
  }

  // render
  function renderBoard(board) {
    [
      _topLeft.textContent,
      _topCenter.textContent,
      _topRight.textContent,
      _midLeft.textContent,
      _midCenter.textContent,
      _midRight.textContent,
      _botLeft.textContent,
      _botCenter.textContent,
      _botRight.textContent,
    ] = board;

    // update player message
    displayPlayerMsgController.setPlayerMsg();
  }

  return {
    renderBoard,
    toggleWinClass,
    toggleShowHideBtn,
  };
})();

const gameController = (() => {
  let _playerX;
  let _playerO;
  let currentTurn;
  let totalTurns = 0;

  function setPlayerX(name) {
    _playerX = playerFactory(name, 'X');
    currentTurn = _playerX;
    displayPlayerMsgController.setOpeningMsg(name);
  }

  function setPlayerO(name) {
    _playerO = playerFactory(name, 'O');
  }

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

  function resetGame() {
    currentTurn = _playerX;
    totalTurns = 0;
    gameBoard.resetGameBoard();
    winGameController.resetWinner();
    displayBoardController.renderBoard(gameBoard.getGameBoard());
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
      displayBoardController.toggleWinClass();
      displayBoardController.toggleShowHideBtn();
    }
    if (winGameController.getIsWinner() === false && totalTurns === 9) {
      displayBoardController.toggleShowHideBtn();
    }
  }

  return {
    setTurn,
    getTotalTurns,
    getCurrentTurn,
    getPlayerX,
    getPlayerO,
    resetGame,
    setPlayerX,
    setPlayerO,
  };
})();
