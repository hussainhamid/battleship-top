const player = require("./player.js");

export default class realPlayer extends player {
  constructor(name) {
    this.name = name;
  }

  chooseAttackCoords(x, y) {
    this.gameboard.receiveAttack(x, y);
  }
}

module.exports = realPlayer;
