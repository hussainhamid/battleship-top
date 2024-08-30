const realPlayer = require("./realPlayer.js");
const computerPlayer = require("./computerPlayer.js");
const renderBoard = require("./domManager.js");
const missedShots = require("./domManager.js");

export default class gameManager {
  constructor() {
    this.player1 = new realPlayer("player: 1");
    this.player2 = new computerPlayer("computer: 2");

    this.setupGame();
    this.renderGameBoard();
  }

  setupGame() {
    this.player1.getGameboard().placeShip(new Ship(3), [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ]);
    this.player2.getGameboard().placeShip(new Ship(3), [
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
    ]);
  }

  renderGameBoard() {
    const playerBoardElement = document.getElementById("player-board");
    const computerBoardElement = document.getElementById("computer-board");

    renderBoard(this.player1.getGameboard(), playerBoardElement);
    renderBoard(this.player2.getGameboard(), computerBoardElement);
  }

  switchTurn() {
    [this.currentPlayer, this.opponent] = [this.opponent, this.currentPlayer];
  }

  handlePlayerAttack(x, y) {
    if (!this.currentPlayer.attack(this.opponent, x, y)) {
      return;
    }

    this.renderGameBoard();
    if (this.opponent.hasLost()) {
      alert(`${this.currentPlayer.name} wins!`);
      return;
    }

    this.switchTurn();
    if (this.currentPlayer instanceof computerPlayer) {
      this.handleComputerTurn();
    }
  }

  handleComputerTurn() {
    const { x, y } = this.currentPlayer.makeRandomAttack();
    this.handlePlayerAttack(x, y);
  }

  checkForGameEnd() {
    return this.opponent.hasLost();
  }

  placePlayerShip(length, coordinates) {
    const ship = new ship(length);

    this.player1.getGameboard().placeShip(ship, coordinates);
    this.renderGameBoard();
  }

  placeComputerShips() {
    const shipLengths = [5, 4, 3, 3, 2];
    shipLengths.forEach((length) => {
      let placed = false;
      while (!placed) {
        const coordinates = this.generateRandomCoordinates(length);
        try {
          this.player2.getGameboard().placeShip(new Ship(length), coordinates);
          placed = true;
        } catch (error) {
          console.log("Failed to place ship at:", coordinates, error);
        }
      }
    });
  }

  generateRandomCoordinates(length) {
    const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
    let x, y;
    if (direction === "horizontal") {
      x = Math.floor(Math.random() * (10 - length));
      y = Math.floor(Math.random() * 10);
    } else {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * (10 - length));
    }
    return Array.from({ length }, (_, i) => ({
      x: direction === "horizontal" ? x + i : x,
      y: direction === "vertical" ? y + i : y,
    }));
  }
}

module.exports = gameManager;
