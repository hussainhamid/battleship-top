import "./styles.css";

import Gameboard from "./gameboard.js";
import ship from "./ship.js";
import realPlayer from "./realPlayer.js";
import computerPlayer from "./computerPlayer.js";
import {
  handleShipPlacementInput,
  handleRandomShipPlacement,
} from "./domManager.js";

const gameManager = require("./gameManager.js");

const newGameManager = new gameManager();

document
  .getElementById("ship-placement-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const length = parseInt(document.getElementById("length").value, 10);
    const x = parseInt(document.getElementById("x").value, 10);
    const y = parseInt(document.getElementById("y").value, 10);
    const coordinates = Array.from({ length }, (_, i) => ({ x: x + i, y }));

    try {
      newGameManager.placePlayerShip(length, coordinates);
      renderBoard(
        newGameManager.player1.getGameboard(),
        document.getElementById("player-board")
      );
    } catch (error) {
      alert("Error placing ship: " + error.message);
    }
  });

document.getElementById("computer-board").addEventListener("click", (event) => {
  const cell = event.target;
  const x = parseInt(cell.getAttribute("data-x"), 10);
  const y = parseInt(cell.getAttribute("data-y"), 10);

  if (isNaN(x) || isNaN(y)) return;

  newGameManager.handlePlayerAttack(x, y);
  renderBoard(
    newGameManager.player2.getGameboard(),
    document.getElementById("computer-board")
  );

  if (newGameManager.checkForGameEnd()) {
    alert(`${newGameManager.currentPlayer.name} wins!`);
  }
});

function createBoardElement(gameboard, container) {
  container.innerHTML = ""; // Clear existing board
  const board = gameboard.getBoard();
  board.forEach(({ ship, coordinates }) => {
    coordinates.forEach(({ x, y }) => {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.setAttribute("data-x", x);
      cell.setAttribute("data-y", y);
      if (ship) {
        cell.classList.add("ship");
      }
      container.appendChild(cell);
    });
  });
}

function renderBoard(gameboard, container) {
  createBoardElement(gameboard, container);
}

module.exports = renderBoard;
module.ecports = createBoardElement;
