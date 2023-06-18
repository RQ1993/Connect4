let playerPurple = "P";
let playerGreen = "G";
let currPlayer = playerPurple;

let gameOver = false;
let board;

let rows = 6;
let columns = 7;
let currColumns = []; //keeps track of which row each column is at.

window.onload = function () {
  setGame();
};

function setGame() {
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];

  for (let p = 0; p < rows; p++) {
    let row = [];
    for (c = 0; c < columns; c++) {
      //JS
      row.push("");
      let tile = document.createElement("div");

      tile.id = `${p}_${c}`;
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("board").append(tile);
    }
    board.push(row);
  }
}

function setPiece() {
  if (gameOver) {
    return;
  }
  let coords = this.id.split("_");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  r = currColumns[c];
  if (r < 0) {
    return;
  }

  board[r][c] = currPlayer;
  let tile = document.getElementById(r.toString() + "_" + c.toString());
  if (currPlayer == playerPurple) {
    tile.classList.add("purple-piece");
    currPlayer = playerGreen;
  } else {
    tile.classList.add("green-piece");
    currPlayer = playerPurple;
  }
  r -= 1;
  currColumns[c] = r;

  checkWinner();
}

function checkWinner() {
  // horizontal
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r][c + 1] &&
          board[r][c + 1] == board[r][c + 2] &&
          board[r][c + 2] == board[r][c + 3]
        ) {
          console.log("horziontal",r,c)
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // vertical
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r + 1][c] &&
          board[r + 1][c] == board[r + 2][c] &&
          board[r + 2][c] == board[r + 3][c]
        ) {
          console.log("vertical",r,c)
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // anti diagonal
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r + 1][c + 1] &&
          board[r + 1][c + 1] == board[r + 2][c + 2] &&
          board[r + 2][c + 2] == board[r + 3][c + 3]
        ) {
          console.log("anti diagonal",r,c)
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // diagonal
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r - 1][c + 1] &&
          board[r - 1][c + 1] == board[r - 2][c + 2] &&
          board[r - 2][c + 2] == board[r - 3][c + 3]
        ) {
          console.log("diagonal",r,c)
          setWinner(r, c);
          return;
        }
      }
    }
  }
}

function setWinner(r, c) {
  let winner = document.getElementById("winner");
  if (board[r][c] == playerPurple) {
    winner.innerText = "Purple Wins";
  } else {
    winner.innerText = "Green Wins";
  }
  gameOver = true;
  
  for (let y = 0; y < HEIGHT; y++) {
  for (let x = 0; x < WIDTH; x++) {
    // get "check list" of 4 cells (starting here) for each of the different
    // ways to win
    const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
    const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
    const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
    const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

    // find winner (only checking each win-possibility as needed)
    if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
      return true;
    }
  }
}


makeBoard();
makeHtmlBoard()
}
