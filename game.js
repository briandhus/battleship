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

// Get row and column counts dynamically in case I add the ability to create board size later
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

        if (matrix[row][column] && (row - counter) > 0) { // try row - counter
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
          column = startColumn - 1;
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

// Determine if strike is a hit, miss, or already hit
const strike = (row, col) => {
  console.log(row, col, matrix)
  let hits = 0;
  let misses = 0;
  const alreadyHit = 'You already hit this location! Target another spot.';

  if (matrix[row][col] === 1) {
    matrix[row][col] = 2;
    hits++;
    return hits;
  } 

  if (matrix[row][col] > 1) {
    alert(alreadyHit);
    return alreadyHit;
  }

  if (matrix[row][col] === 0) {
    matrix[row][col] = 3;
    return alreadyHit;
  }
}

// Capture coordinates on click
const chooseSquare = (table) => {

  let row = 0;
  let col = 0;

  table.addEventListener("click", event => {   

    const coordinates = event.target.className;

    row = Number(coordinates[0]);
    col = Number(coordinates[1]);

    return strike(row, col);

  });
}

// let playerBoardTarget = chooseSquare(table1);
let computerBoardTarget = chooseSquare(table2);




// Game instructions and options
const messages = {
  welcome: 'Are you ready to play Battleship?',
  playerShip: 'Choose location of your ',
  attack: 'Click on a square from zone 2 to fire at!',
  
}

