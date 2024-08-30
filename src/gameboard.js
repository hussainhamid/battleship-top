const ship = require("./ship.js");

export default class Gameboard {
  constructor() {
    this.board = [];
    this.missedShots = [];
  }

  placeShip(length, coordinates) {
    if (
      !coordinates.every(
        (coord) => typeof coord.x === "number" && typeof coord.y === "number"
      )
    ) {
      throw new Error("Invalid coordinates");
    }

    const newShip = new ship(length);

    this.board.push({ ship: newShip, coordinates });
  }

  getBoard() {
    return this.board;
  }

  receiveAttack(x, y) {
    let hit = false;

    for (const { ship, coordinates } of this.board) {
      for (const coord of coordinates) {
        if (coord.x === x && coord.y === y) {
          ship.hit();
          hit = true;
          break;
        }
      }
      if (hit) break;
    }

    if (!hit) {
      this.missedShots.push({ x, y });
    }
  }

  allShipsSunk() {
    return this.board.every(({ ship }) => ship.isSunk());
  }
}

module.exports = Gameboard;
