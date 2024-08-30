const Gameboard = require("./gameboard");
const ship = require("./ship");

describe("gameboard", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("places ship at given coordinates", () => {
    const length = 3;
    const coordinates = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ];

    gameboard.placeShip(length, coordinates);

    const board = gameboard.getBoard();

    expect(board.length).toBe(1);
    expect(board[0].coordinates).toEqual(coordinates);
    expect(board[0].ship.length).toBe(length);
  });

  test("does not place a ship with invalid coordinates", () => {
    const length = 3;
    const invalidCoordinates = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: "invalid" },
    ];

    expect(() => {
      gameboard.placeShip(length, invalidCoordinates);
    }).toThrow();
  });

  test("receives an attack and hits the correct ship", () => {
    const length = 3;
    const coordinates = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ];

    gameboard.placeShip(length, coordinates);

    gameboard.receiveAttack(0, 1);

    const board = gameboard.getBoard();
    expect(board[0].ship.hits).toBe(1);
    expect(gameboard.missedShots.length).toBe(0);
  });

  test("records missed shots", () => {
    const length = 3;
    const coordinates = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ];

    gameboard.placeShip(length, coordinates);

    gameboard.receiveAttack(1, 1);

    expect(gameboard.missedShots.length).toBe(1);
    expect(gameboard.missedShots[0]).toEqual({ x: 1, y: 1 });
  });

  test("reports if not all the ships are sunk", () => {
    const length = 3;
    const coordinates = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ];

    gameboard.placeShip(length, coordinates);

    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);

    expect(gameboard.allShipsSunk()).toBe(false);
  });
});
