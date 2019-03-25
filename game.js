// Create tables
const table1 = document.createElement('table');
table1.classList.add('table1');
const table2 = document.createElement('table');
table2.classList.add('table2');

const createTables = table => {

  for (let i = 0; i < 10; i++) {

    const tableRow = document.createElement('tr');
    tableRow.classList.add(`${i}`);

    for (let j = 0; j < 10; j++) {
      
      const tableData = document.createElement('td');
      tableData.classList.add(`${i}${j}`);
      tableRow.appendChild(tableData);
    }

    table.appendChild(tableRow);
  }
}

createTables(table1);
createTables(table2);

const boardOne = document.getElementById('board_one');
const boardTwo = document.getElementById('board_two');

boardOne.appendChild(table1);
boardTwo.appendChild(table2);

/* Get row and column counts dynamically in case I add 
the ability for user to create board size later */
const rowCount = table1.childNodes.length;
const colCount = document.querySelectorAll('td').length / (rowCount * 2);

// Ships
const ships = {
  carrier: {
    position: [0, 0, 0, 0, 0],
    hits: 5
  },
  battleship: {
    position: [0, 0, 0, 0],
    hits: 4
  },
  cruiser: {
    position: [0, 0, 0],
    hits: 3
  },
  submarine: {
    position: [0, 0, 0],
    hits: 3
  },
  destroyer: {
    position: [0, 0],
    hits: 2
  },
  activeShips: 5
};

// Generate matrix for game logic
const shipMatrix = () => {
  const matrix = [];
  for (var i = 0; i < rowCount; i++) {
    matrix.push(Array(rowCount).fill(0));
  }
  return matrix;
}

let matrix = shipMatrix();

// Function to check that ship will fit where placed
const checkFit = (direction, ship, row, col) => {

  if (direction === 'horizontal') {
    for (let i = col; i < col + ships[ship]['hits']; i++) {
      if (matrix[row][col] !== 0) {
        return false;
      }
    }
    return true;
  }

  if (direction === 'vertical') {
    for (let i = row; i < row + ships[ship]['hits']; i++) {

      if (matrix[row] === undefined) {
        return false;
      }

      if (matrix[row][col] !== 0) {
        return false;
      }
    }
    return true;
  }

}

// Place ship
const placeShip = (direction, ship, row, col) => {

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

  if (checkFit(horOrVert, ship, row, col)) {
    placeShip(horOrVert, ship, row, col);
  } else {
    placeComputerShips(ship);
  }
  
  console.log(matrix);
}


const loopShips = (ships) => {
  for (let ship in ships) {  
    if (ship !== 'activeShips') {
      placeComputerShips(ship);
    }
  } 
}

loopShips(ships);


// Game instructions and options
const messages = {
  welcome: 'Are you ready to play Battleship?',
  start: 'Click to start',
  playerShip: 'Choose location of your ',
  next: 'Next ship',
  attack: 'Click on a square in zone 2 to fire at!',
  alreadyHit: 'You already hit this location! Target another spot.',
  hit: 'Direct HIT!',
  miss: 'Splash, you hit water.'
}

// Determine if strike is a hit, miss, or already hit
const strike = (row, col, message, node) => {
  console.log(row, col, matrix)
  let misses = 0;

  if (matrix[row][col][1] === 1) {
    let shipName = matrix[row][col]['ship'];
    matrix[row][col] = 2;
    ships[shipName]['hits']--;
    node.classList.add('hit');

    if (ships[shipName]['hits'] === 0) {
      ships['activeShips']--;
      console.log(`You sank my ${shipName}`);
    }

    if (ships['activeShips'] === 0) {
      console.log('You win!');
    }
    return;
  } 

  if (matrix[row][col] > 1) {
    alert(message.alreadyHit);
  }

  if (matrix[row][col] === 0) {
    matrix[row][col] = 3;
    misses++;
    node.classList.add('miss');
    return misses;
  }
}

const placePlayerShips = (row, col, table) => {

  let td = `${row}${col}`;
  console.log(row, col, td, table);

}

// Capture coordinates on click
const chooseSquare = (table, message) => {
  let row = 0;
  let col = 0;

  table.addEventListener('click', event => {   

    const coordinates = event.target.className;

    row = Number(coordinates[0]);
    col = Number(coordinates[1]);

    if (table === table2) {
      strike(row, col, message, event.target);      
    } 

    if (table === table1) {
      placePlayerShips(row, col, table);
    }

  });
}

let playerBoardTarget = chooseSquare(table1);
let computerBoardTarget = chooseSquare(table2, messages);

const displayMessage = (message, spanMessage) => {
  const node = document.createElement('p');
  const textNode = document.createTextNode(message);
  node.classList.add('messages');
  node.appendChild(textNode);
  const messageZone = document.querySelector('.inputs');
  messageZone.appendChild(node);
  
  const button = document.createElement('button');
  button.setAttribute('class','button');
  const span = document.createElement('span');
  span.setAttribute('class','confirm');
  span.innerHTML = spanMessage;
  button.appendChild(span);    
  node.appendChild(button);
}

const clearMessage = () => {
  const message = document.querySelector('.messages');
  message.setAttribute('style', 'display: none;');
}

displayMessage(messages.welcome, messages.start);

const changeMessage = (message) => {
  const button = document.querySelector('.button');
  const span = document.querySelector('.confirm');
  const p = document.querySelector('.messages');

  button.addEventListener('click', event => {
    clearMessage();
    displayMessage(message.playerShip, message.next);
  })
}

changeMessage(messages);
