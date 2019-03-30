// Ships
const ships = {
  carrier: {
    position: [0, 0, 0, 0, 0],
    hits: 5,
    playerHits: 5
  },
  battleship: {
    position: [0, 0, 0, 0],
    hits: 4,
    playerHits: 4
  },
  cruiser: {
    position: [0, 0, 0],
    hits: 3,
    playerHits: 3
  },
  submarine: {
    position: [0, 0, 0],
    hits: 3,
    playerHits: 3
  },
  destroyer: {
    position: [0, 0],
    hits: 2,
    playerHits: 2
  },
  activeShips: 5,
  activePlayerShips: 5
};

// Function to check that ship will fit where placed
const checkFit = (direction, ship, row, col, matrix) => {

  const length = ships[ship]['hits'];

  if (direction === 'horizontal') {

    if (col + length > matrix[0].length) {
      return false;
    }

    for (let i = col; i < col + length; i++) {
      if (matrix[row][i] !== 0) {
        return false;
      }
    }

    return true;
  }

  if (direction === 'vertical') {

    for (let i = row; i < row + length; i++) {

      if (matrix[i] === undefined) {
        return false;
      }

      if (matrix[i][col] !== 0) {
        return false;
      }
    }

    return true;
  }

}

// Place ship
const placeShip = (direction, ship, row, col, matrix) => {

  if (direction === 'horizontal') {
    for (let i = col; i < col + ships[ship]['hits']; i++) {
      matrix[row][i] = {'ship': ship, 1: 1};
    }
  }

  if (direction === 'vertical') {
    for (let i = row; i < row + ships[ship]['hits']; i++) {
      matrix[i][col] = {'ship': ship, 1: 1};
    }
  }

}

// Random computer ship placing function
const placeComputerShips = (ship) => {

  // random number generator, non inclusive
  const randNum = max => Math.floor(Math.random() * max);

  let horOrVert = ['vertical', 'horizontal'];
  horOrVert = horOrVert[randNum(horOrVert.length)];

  let row = randNum(matrix.length);
  let col = randNum(matrix[0].length);

  if (checkFit(horOrVert, ship, row, col, matrix)) {
    placeShip(horOrVert, ship, row, col, matrix);
  } else {
    placeComputerShips(ship);
  }
}

// Capture coordinates on click
const chooseSquare = (table) => {
  let row = 0;
  let col = 0;

  table.addEventListener('click', event => {   

    const coordinates = event.target.className;

    row = Number(coordinates[0]);
    col = Number(coordinates[1]);

    strike(row, col, event.target);  

  });
}

// Function for player to place ships
const placePlayerShips = () => {

  const table1 = document.querySelector('.table1');
  const shipArray = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];
  let index = 0;
  
  displayMessage(messages.ship[index]);

  table1.addEventListener('click', event => {

    if (index === 4) chooseSquare(table2);
    if (index > 4) return;

    const row = Number(event.target.className[0]);
    const col = Number(event.target.className[1]);
    const select = document.querySelectorAll('select')[index];
    const direction = select.options[select.selectedIndex].text.toLowerCase();
    console.log(direction);
    const ship = shipArray[index];

    if (checkFit(direction, ship, row, col, playerMatrix)) {
      placeShip(direction, ship, row, col, playerMatrix);
      showPlayerShips(direction, ship, event.target);
      index++;
      clearMessage();
      if (index > 4) {
        displayMessage(messages.attack, true);
      } else {
        displayMessage(messages.ship[index]);       
      }
    } else {
      alert('Ship won\'t fit here. Choose a new location.');
    }
    console.log(playerMatrix);
  })

}

// Function to change color of placed player ships to black
const showPlayerShips = (direction, ship, node) => {
  const row = Number(node.className[0]);
  const col = Number(node.className[1]);

  if (direction === 'horizontal') {
    for (let i = col; i < col + ships[ship]['hits']; i++) {
      let nextNode = table1.rows[row].cells[i];
      nextNode.classList.add('placed');
    }
  }

  if (direction === 'vertical') {
    for (let i = row; i < row + ships[ship]['hits']; i++) {
      let nextNode = table1.rows[i].cells[col];
      nextNode.classList.add('placed');
    }
  }

}

const loopShips = (ships) => {
  for (let ship in ships) {  
    if (ship !== 'activeShips' && ship !== 'activePlayerShips') {
      placeComputerShips(ship, matrix);
    }
  } 
  console.log(matrix);
}
