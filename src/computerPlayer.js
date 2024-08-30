const player = require("./player.js");

export default class computerPlayer extends player {
  constructor(name) {
    super(name);
    this.previousAttacks = new Set();
  }

  makeRandomAttack() {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (this.previousAttacks.has(`${x},${y}`));

    this.previousAttacks.add(`${x},${y}`);
    this.attack(this.opponent, x, y);
    return { x, y };
  }
}

module.exports = computerPlayer;
