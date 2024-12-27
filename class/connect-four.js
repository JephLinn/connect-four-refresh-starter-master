const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    // Screen.addCommand('t', 'test command (remove)', ConnectFour.testCommand);

    Screen.addCommand("left", "move corsor left", this.cursor.left);
    Screen.addCommand("right", "move cursor right", this.cursor.right);
    Screen.addCommand("return", "place mark", this.placeMark.bind(this))

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  placeMark() {
    let player = this.playerTurn;
    
    let row = this.cursor.row;
    
    let col = this.cursor.col;
    
    let position = this.grid[row][col];

    if (position === " "){
      this.grid[row][col] = player;
      Screen.setGrid(row, col, player);

      Screen.render();

      if(ConnectFour.checkWin(this.grid)) {
        ConnectFour.endGame(player)
      }

      if (player === "O") {
        this.playerTurn = "X";
      }
      else{
        this.playerTurn = "O"
      }

      Screen.render();

    }
  }

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length - 3; c++) {
        if (grid[r][c] === grid[r][c+1] && grid[r][c+1] === grid[r][c+2] && grid[r][c+2] === grid[r][c+3] && grid[r][c] !== ' ') {
          return grid[r][c];
        }
      }
    }

    for (let r = 0; r < grid.length - 3; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if (grid[r][c] !== ' ' && grid[r][c] === grid[r+1][c] && grid[r+1][c] === grid[r+2][c] && grid[r+2][c] === grid[r+3][c]) {
          return grid[r][c];
        }
      }
    }

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if ( r + 3 < grid.length &&
          c + 3 < grid[0].length &&
          grid[r][c] === grid[r+1][c+1] &&
          grid[r+1][c+1] === grid[r+2][c+2] &&
          grid[r+2][c+2] === grid[r+3][c+3] &&
          grid[r][c] !== ' ') {
            return grid[r][c];
        }

        if (r - 3 >= 0 &&
          c + 3 < grid[0].length &&
          grid[r][c] === grid[r-1][c+1] &&
          grid[r-1][c+1] === grid[r-2][c+2] &&
          grid[r-2][c+2] === grid[r-3][c+3] &&
          grid[r][c] !== ' ') {
            return grid[r][c]
          }
        }
      }

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if (grid[r][c] === ' ') {
          return false;
        }
      }
    }

    return 'T';

  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
