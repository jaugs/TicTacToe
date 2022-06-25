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

  }
}

class GameBoard {
   static _newBoard = new Array(9);

   static _checkIfCellEmpty = (index) => {
    if (index || index == 0) {
      return !this.newBoard[index] ? true : false;
    } else {
      return this.newBoard.includes(undefined);
    }
  }

  // static _endTheGame() {
  //   DomElement.board.removeEventListener('click', DomListener.gridCellClick);
  //   uiController.rightSectionController.removeActivePlayerMark();
  // }

  static resetBoard = () => {
    this.newBoard = new Array(9);
    uiController.rightSectionController.cleanGameBoard();
  }




static fillCell = (index) => {
  const currPlayer = GameLogic.currentPlayer();
  const playerMark = currPlayer.tally;
  //console.log(currPlayer);
  //console.log(playerMark);
  //console.log(_newBoard);
  GameLogic.checkMove(index, playerMark);
    eventHandler.board[index].classList.add(playerMark);
  
  GameLogic.winLogic();
    //this.newBoard.classList.add('playerMark');

   
    //select next player when the move was right else display error
    GameLogic.whoIsNext();


  // if (this._checkForWinner()) {
  //   GameLogic.endRound(currPlayer);
  // } else {
  //   this._checkForRemainingEmptyCells();
  // }

};
}

const GameLogic = (() => {
 
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
    //eventHandler.roundEnded_dialog.style.display = 'flex';
   // uiController.rightSectionController.displayRoundEndDialog(winner);
  };

  const checkMove = (index, playerMark) => {
    console.log(eventHandler.board[0]);
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

const winLogic = () => {

 let winCombos = Object;
 winCombos = {
    row1: [0, 1, 2],
    row2: [3, 4, 5],
    row3: [6, 7, 8],
    column1: [0, 3, 6],
    column2: [1, 4, 7],
    column3: [2, 5, 8],
    diag1: [0, 4, 8],
    diag2: [2, 4, 6]
  };

for (i=0; i < 4; i++) {
  console.log(Object.keys(winCombos));
};


  // Object.keys(winCombos).forEach(entry => {
  //   const [ value] = entry;
  //   console.log( value);
  // })


 if ((eventHandler.board[0], eventHandler.board[1], eventHandler.board[2]).classList.contains('x'))
    ((eventHandler.board[3], eventHandler.board[4], eventHandler.board[5]).classList.contains('x')) ||
    ((eventHandler.board[6], eventHandler.board[7], eventHandler.board[8]).classList.contains('x')) ||
    ((eventHandler.board[0], eventHandler.board[1], eventHandler.board[2]).classList.contains('x'))
  {
  console.log('YOU WIN');
 };


}

  return {
    //startNewGame,
    winLogic,
    checkMove,
    endRound,
    newRound,
    whoIsNext,
    currentPlayer,
    getNextPlayer,
  };
})();




const DomListener = (() => {

  // const startExitGame = (e) => {
  //   e.stopPropagation();
  //   if (e.target.closest('.card')) {
  //     uiController.startingDialogController.toggleGameMode(e.target);
  //   } else if (e.target.closest('.controls')) {
  //     uiController.startingDialogController.startOrExitGame(e.target);
  //   }
  // };

 

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
 
    //DomListener.startExitGame
  eventHandler.displayBoard.addEventListener('click', DomListener.gridCellClick);
})();









//   function setPlayers() {
//      gameEvent(player1, player2);
//      }
     
// const gameEvent = (player1, player2) => {
// console.log(player1);
//   let turnCount = document.getElementById("turn1");
//   let turnCount2 = document.getElementById("turn2");

//   let round = 0;

//   let addListener = () => {
//     gameBoard.board.forEach(element => {
//       element.addEventListener('click', function(){cellSelect(element)});
//     })};
// addListener();

// let cellSelect = (num) => {

//   if (round % 2 == 0) {
//     if (num.style.background == "red") {
//       alert('error oppoent picked');
//       return;
//     } else if (num.style.background == 'blue') {
//       alert('error: already selected');
//       return;
//     } else {
//     turnCount2.innerText='';
//     turnCount.innerText = "Your Turn";
//     num.style.background = "blue";
//     round++; 
//     }
//   } 
//   else if (num.style.background == "blue") {
//     alert('error opponent picked');
//     return;
//   } else if (num.style.background == "red") {
//     alert('error: already selected');
//     return;
//   } else {
//   turnCount.innerText='';
//   turnCount2.innerText = "Your Turn";
//   num.style.background = "red";
//   round++;
//   }
//   winCondition();
// }

// return {addListener};
// }


// function winCondition() {
//   let A1 = gameBoard.board[0];
//   let A2 = gameBoard.board[1];
//   let A3 = gameBoard.board[2];
//   let B1 = gameBoard.board[3];
//   let B2 = gameBoard.board[4];
//   let B3 = gameBoard.board[5];
//   let C1 = gameBoard.board[6];
//   let C2 = gameBoard.board[7];
//   let C3 = gameBoard.board[8];

//     if (((A1.style.background == 'blue') && (A2.style.background == 'blue') && (A3.style.background == 'blue')) || 
//         ((B1.style.background == 'blue') && (B2.style.background == 'blue') && (B3.style.background == 'blue')) ||
//         ((C1.style.background == 'blue') && (C2.style.background == 'blue') && (C3.style.background == 'blue')) ||
//         ((A1.style.background == 'blue') && (B1.style.background == 'blue') && (C1.style.background == 'blue')) ||
//         ((A2.style.background == 'blue') && (B2.style.background == 'blue') && (C2.style.background == 'blue')) ||
//         ((A3.style.background == 'blue') && (B3.style.background == 'blue') && (C3.style.background == 'blue')) ||
//         ((A1.style.background == 'blue') && (B2.style.background == 'blue') && (C3.style.background == 'blue')) ||
//         ((A3.style.background == 'blue') && (B2.style.background == 'blue') && (C1.style.background == 'blue'))) {
//           console.log ('blue wins');
//           clearBoard();
//         } else if 
//         (((A1.style.background == 'red') && (A2.style.background == 'red') && (A3.style.background == 'red')) || 
//         ((B1.style.background == 'red') && (B2.style.background == 'red') && (B3.style.background == 'red')) ||
//         ((C1.style.background == 'red') && (C2.style.background == 'red') && (C3.style.background == 'red')) ||
//         ((A1.style.background == 'red') && (B1.style.background == 'red') && (C1.style.background == 'red')) ||
//         ((A2.style.background == 'red') && (B2.style.background == 'red') && (C2.style.background == 'red')) ||
//         ((A3.style.background == 'red') && (B3.style.background == 'red') && (C3.style.background == 'red')) ||
//         ((A1.style.background == 'red') && (B2.style.background == 'red') && (C3.style.background == 'red')) ||
//         ((A3.style.background == 'red') && (B2.style.background == 'red') && (C1.style.background == 'red'))) {
//           console.log ('red wins');
//           clearBoard();
//         }}


// function clearBoard() {
//   gameBoard.board.forEach(element => {
//    element.removeEventListener('click', gameEvent.addListener());

    
//       element.style.background = 'white';
//       console.log('allclear');
    
//    });
   
//    document.getElementById("Player1").value = '';
//    document.getElementById("Player2").value = '';
//    textBox1 = document.getElementById("playerOne");
//    textBox2 = document.getElementById("playerTwo");
  
//    textBox1.remove();
//    textBox2.remove();
  
//   //  button = document.getElementById("submit");
//   //  console.log(button);
//   //  button.addEventListener('click', function(){setPlayers()});


// }

