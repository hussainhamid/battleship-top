const Gameboard = require("./gameboard.js");

export default class player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }

  getGameboard() {
    return this.gameboard;
  }

  attack(opponent, x, y) {
    if (opponent.getGameboard().hasBeenAttacked(x, y)) {
      return false;
    }

    opponent.getGameboard().receiveAttack(x, y);
    return true;
  }

  hasLost() {
    return this.gameboard.allShipsSunk();
  }
}

module.exports = player;
