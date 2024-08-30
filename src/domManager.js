export function renderBoard(gameboard, container) {
  container.innerHTML = ""; // Clear existing board
  console.log("Rendering board");
  const board = gameboard.getBoard();
  console.log("Board data:", board);
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.setAttribute("data-x", x);
      cell.setAttribute("data-y", y);
      // Check if there is a ship at (x, y)
      const hasShip = board.some(({ coordinates }) =>
        coordinates.some((coord) => coord.x === x && coord.y === y)
      );
      if (hasShip) {
        cell.classList.add("ship");
      }
      container.appendChild(cell);
    }
  }
  console.log("Board rendered");
}

export function missedShots(coordinates, container) {
  coordinates.forEach(({ x, y }) => {
    updateCell(x, y, "missed-shot", container);
  });
}

export function updateCell(x, y, status, container) {
  const cell = container.querySelector(`.cell[data-x='${x}'][data-y='${y}']`);
  if (cell) {
    cell.classList.add(status);
  }
}

export function handleShipPlacementInput(gameManager) {
  const form = document.getElementById("ship-placement-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const length = parseInt(
      form.querySelector("input[name='length']").value,
      10
    );
    const x = parseInt(form.querySelector("input[name='x']").value, 10);
    const y = parseInt(form.querySelector("input[name='y']").value, 10);
    const coordinates = Array.from({ length }, (_, i) => ({ x: x + i, y }));
    gameManager.placePlayerShip(length, coordinates);
  });
}

export function handleRandomShipPlacement(gameManager) {
  const button = document.getElementById("random-placement-button");
  button.addEventListener("click", () => {
    gameManager.placePlayerShipRandomly();
  });
}

module.exports = handleRandomShipPlacement;
mopdule.exports = handleShipPlacementInput;
module.exports = updateCell;
module.exports = missedShots;
module.exports = renderBoard;
