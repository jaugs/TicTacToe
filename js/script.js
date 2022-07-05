let player1;
let player2;


const eventHandler = (() => {
  let board = [];
  board[0] = document.getElementById('spotA1');
  board[1] = document.getElementById('spotA2');
  board[2] = document.getElementById('spotA3');
  board[3] = document.getElementById('spotB1');
  board[4] = document.getElementById('spotB2');
  board[5] = document.getElementById('spotB3');
  board[6] = document.getElementById('spotC1');
  board[7] = document.getElementById('spotC2');
  board[8] = document.getElementById('spotC3');
  let displayBoard =  document.getElementById('display');
  let playerSpace = document.querySelector('.scoreCard');
  player1 = document.getElementById("p1Name");
  player2 = document.getElementById("p2Name");
  gameOver = document.getElementById('roundEnded');
  return {
    board,
    playerSpace,
    player1,
    player2,
    displayBoard
  };
})();

class Player {
  constructor(name, tally) {
    this._name = name;
    this._tally = tally;
    this._score = {
      won: 0,
    };
  }
  get name() {
    return this._name;
  }
  get tally() {
    return this._tally;
  }
  get score() {
    return this._score.won;
  }
  set won(wonOrNot) {
    if (wonOrNot) {
      this._score.won++;
    }
  }
  selectx() {
}}

class GameBoard {
   static _newBoard = new Array(9);
   static _checkIfCellEmpty = (index) => {
    if (index || index == 0) {
      return !this.newBoard[index] ? true : false;
    } else {
      return this.newBoard.includes(undefined);
    }
  }

  static resetBoard = () => {
    this.newBoard = new Array(9);
    uiController.rightSectionController.cleanGameBoard();
  }


static fillCell = (index) => {
  const currPlayer = GameLogic.currentPlayer();
  const playerMark = currPlayer.tally;
  GameLogic.checkMove(index, playerMark);
  eventHandler.board[index].classList.add(playerMark);
  GameLogic.winLogic(index, playerMark);
  GameLogic.whoIsNext();
};
}

const GameLogic = (() => {
 
  let xArr = [];
  let oArr = [];
  let whoIsNextIndex = 0;
  let round = 1;
  let draw = 0;
  let player_1 = new Player(player1.innerText, 'x');
  let player_2 = new Player(player2.innerText, 'o');

  const currentPlayer = () => {
    const player = [player_1, player_2][whoIsNextIndex];
    return player;
  };

  const getNextPlayer = () => {
    const player = [player_1, player_2][whoIsNextIndex === 0 ? 1 : 0];
    console.log(player);
    return player;
  };

  const whoIsNext = () => {
    whoIsNextIndex = whoIsNextIndex === 0 ? 1 : 0;
   //[player_1, player_2][whoIsNextIndex].select()
  };

  const newRound = () => {
    DomElement.roundEnded_dialog.style.display = 'none';
    uiController.leftSectionController.updateLogRound(round);
    GameBoard.resetBoard();
    eventHandler.board.addEventListener('click', DomListener.gridCellClick);
    whoIsNextIndex = 0;
    player1.select();
  };

  const endRound = function (winner) {
    if (winner) {
      if (winner === player1) {
        player_1.won = true;
      } else {
        player_2.won = true;
      }
    }
    round++;
   
  };

  const checkMove = (index, playerMark) => {
   // console.log(eventHandler.board[0]);
    let notMark;
    if (playerMark == 'x') {
     notMark = 'o';
    } else if (playerMark == 'o') {
     notMark = 'x';
    };
    let Arr = eventHandler.board[index].classList;
    if (Arr.contains(playerMark)){
      alert('already selected');
      whoIsNext();
    } else if (Arr.contains(notMark)){
      alert('other player has selected');
      whoIsNext();
    }
  };

const winLogic = (index, playerMark) => {

if (playerMark == 'x') {
  xArr.push(index);
} else {
  oArr.push(index);
}

winningFormulas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

//function for generating cominations of array elements found on SO
function generateCombinations(sourceArray, comboLength) {
  const sourceLength = sourceArray.length;
  if (comboLength > sourceLength) return [];
  const combos = []; // Stores valid combinations as they are generated.
  // Accepts a partial combination, an index into sourceArray, 
  // and the number of elements required to be added to create a full-length combination.
  // Called recursively to build combinations, adding subsequent elements at each call depth.
  const makeNextCombos = (workingCombo, currentIndex, remainingCount) => {
    const oneAwayFromComboLength = remainingCount == 1;
    // For each element that remaines to be added to the working combination.
    for (let sourceIndex = currentIndex; sourceIndex < sourceLength; sourceIndex++) {
      // Get next (possibly partial) combination.
      const next = [ ...workingCombo, sourceArray[sourceIndex] ];
      if (oneAwayFromComboLength) {
        // Combo of right length found, save it.
        combos.push(next);
      } else {
        // Otherwise go deeper to add more elements to the current partial combination.
        makeNextCombos(next, sourceIndex + 1, remainingCount - 1);
      }}}
  makeNextCombos([], 0, comboLength);
  return combos;
}

if (xArr.length > 2) {
  let xCombos = generateCombinations(xArr, 3);
  for (let i = 0; i < winningFormulas.length; i++) {
    const formula = winningFormulas[i];
    for (let k = 0; k < xCombos.length; k++) {
    let x_result = formula.every((item) => xCombos[k].includes(item));
      if (x_result == true) {
        xArr = [];
        oArr = [];
        xCombos = [];
        index = 0;
        whoIsNext();
        winGame('xwins');
      } }};
  }

  if (oArr.length > 2) {
    let oCombos = generateCombinations(oArr, 3);
    for (let i = 0; i < winningFormulas.length; i++) {
      const formula = winningFormulas[i];
      for (let k = 0; k < oCombos.length; k++) {
      let o_result = formula.every((item) => oCombos[k].includes(item));
        console.log(o_result);
        if (o_result == true) {
          xArr = [];
          oArr = [];
          oCombos = [];
          index = 0;
          whoIsNext();
          winGame('owins');
        } }};
    }
}
  
const winGame = (winner) => {
  if (winner == 'xwins') {
    let winner = document.createElement('div');
    winner.textContent = "Player 1 Wins!";
    winner.setAttribute('id', 'winnerID');
    eventHandler.playerSpace.appendChild(winner);
    resetBoard();
  } else if (winner == 'owins') {
    let winner = document.createElement('div');
    winner.textContent = "Player 2 Wins!";
    winner.setAttribute('id', 'winnerID');
    eventHandler.playerSpace.appendChild(winner);
    resetBoard();
  } else {
    alert('something went wrong');
  }
}

const resetBoard = () => {

  for (let i = 0; i < eventHandler.board.length; i++) {
    eventHandler.board[i].removeAttribute('class');
    eventHandler.board[i].setAttribute('class', 'cell_');
  }

}

  return {
    resetBoard,
    winGame,
    winLogic,
    checkMove,
    endRound,
    newRound,
    whoIsNext,
    currentPlayer,
    getNextPlayer
  };
})();

const DomListener = (() => {

  const gridCellClick = (e) => {
    if (e.target.closest('.cell_')) {
      e.stopPropagation();
      const targetCell = e.target.closest('.cell_');
      const cellIndex = Array.from(eventHandler.displayBoard.children).indexOf(
      targetCell
     );
      GameBoard.fillCell(cellIndex);
    }
  };

  const roundEnded_dialogClick = function (e) {
    if (e.target.id === 'newRound') {
      GameLogic.newRound();
    } else if (e.target.id === 'newGame') {
      location.reload();
    }
  };

  return { gridCellClick, roundEnded_dialogClick };
})();

const addListener = (function () {

  eventHandler.displayBoard.addEventListener('click', DomListener.gridCellClick);
})();



