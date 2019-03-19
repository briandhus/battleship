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
  }
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

// Random computer ship placing function
const placeComputerShips = (ship, coordinates, matrix) => {

  // random number generator, non inclusive
  const randNum = max => Math.floor(Math.random() * max);

  let length = coordinates.length;

  let horOrVert = ['vertical', 'horizontal'];
  horOrVert = horOrVert[randNum(horOrVert.length)];

  let row = 0;
  let column = 0;

  let counter = 0;

  let vertDirection = 'down';
  let horDirection = 'right';

  if (horOrVert === 'vertical') {
    
    row = randNum(length);
    column = randNum(colCount);

  }

  if (horOrVert === 'horizontal') {
    
    row = randNum(rowCount);
    column = randNum(length);
    
  }

  let startRow = row;
  let startColumn = column;

  // console.log(horOrVert, row, column, matrix, length)

  while (length > 0) {

    if (horOrVert === 'vertical') {

      if (vertDirection === 'down') {

        if (!matrix[row][column]) {
          matrix[row][column] = 1;
          row++;
          counter++;
        } 

        if (matrix[row][column] && (row - counter) > 0) {
          row = row - counter - 1;
          // matrix[row][column] = 1;
          // row--;
          vertDirection = 'up';
          // counter++;
        }

      } else {

        if (row > 0) {

          if (!matrix[row][column]) {
            matrix[row][column] = 1;
            row--;
            counter++;
          } 

        } else {

          if (!matrix[row][column]) {
            matrix[row][column] = 1;
            counter++;
          }

        }
      }     
    }

    if (horOrVert === 'horizontal') {

      if (horDirection === 'right') {

        if (!matrix[row][column]) {
          matrix[row][column] = 1;
          column++;
          counter++;
        } 

        if (matrix[row][column] && (column - counter) > 0) {
          column = column - counter - 1;
          // matrix[row][column] = 1;
          // column--;
          horDirection = 'left';
          // counter++;
        }

      } else {

        if (column > 0) {

          if (!matrix[row][column]) {
            matrix[row][column] = 1;
            column--;
            counter++;
          } 

        } else {

          if (!matrix[row][column]) {
            matrix[row][column] = 1;
            counter++;
          }

        }
      }     
    }

    length--;
  }
  console.log(ship, horOrVert, startRow, startColumn, row, column, matrix)
}


const loopShips = (ships) => {

  let ship;
  let coordinates = [];
  let missiles = 0;

  for (ship in ships) {

    for (let stats in ships[ship]) {

      if (stats === 'position') {
        coordinates = ships[ship][stats];
      }
      if (stats === 'hits') {
        missiles = ships[ship][stats];
      }

    }

    placeComputerShips(ship, coordinates, matrix);

  } 
  // console.log('ship loop', ship, coordinates, missiles); 
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
const strike = (row, col, message) => {
  console.log(row, col, matrix)
  let hits = 0;
  let misses = 0;

  if (matrix[row][col] === 1) {
    matrix[row][col] = 2;
    hits++;
    alert(message.hit);
    return hits;
  } 

  if (matrix[row][col] > 1) {
    alert(message.alreadyHit);
  }

  if (matrix[row][col] === 0) {
    matrix[row][col] = 3;
    misses++;
    alert(message.miss);
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
      strike(row, col, message);      
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
