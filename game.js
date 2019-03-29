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

// Generate matrix for game logic
const shipMatrix = () => {
  const matrix = [];
  for (var i = 0; i < rowCount; i++) {
    matrix.push(Array(rowCount).fill(0));
  }
  return matrix;
}

let matrix = shipMatrix();
let playerMatrix = shipMatrix();

// Game instructions and options
const messages = {
  ship: ['Choose location of your carrier.', 
          'Choose location of your battleship.',
          'Choose location of your cruiser.',
          'Choose location of your submarine.',
          'Choose location of your destroyer.'],
  start: 'Click to start',
  attack: 'Click on a square in zone 2 to fire at!',
  alreadyHit: 'You already hit this location! Target another spot.',
  hit: 'Direct HIT!',
  miss: 'Splash, you hit water.'
}

const displayMessage = (message, end) => {
  const node = document.createElement('p');
  const textNode = document.createTextNode(message);
  node.classList.add('messages');
  node.appendChild(textNode);
  const messageZone = document.querySelector('.inputs');
  messageZone.appendChild(node);

  if (end) {
    return;
  }

  const select = document.createElement('select');

  const vertical = document.createElement('option');
  vertical.innerHTML = 'Vertical';
  const horizontal = document.createElement('option');
  horizontal.innerHTML = 'Horizontal';
  select.appendChild(vertical);
  select.appendChild(horizontal);    
  node.appendChild(select);

}

const clearMessage = () => {
  const messages = document.querySelectorAll('.messages');
  for (let i = 0; i < messages.length; i++) {
    messages[i].setAttribute('style', 'display: none;');
  }
}

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
  //console.log(direction, ship, row, col);
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

// Function for player to place ships
const placePlayerShips = () => {

  const table1 = document.querySelector('.table1');
  const shipArray = ['carrier', 'battleship', 'cruiser', 'submarine', 'destroyer'];
  let index = 0;
  displayMessage(messages.ship[index]);

  table1.addEventListener('click', event => {

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

placePlayerShips();

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

loopShips(ships);

// generate random strikes for computer
const computerStrike = (matrix) => {
  const randNum = max => Math.floor(Math.random() * max);

  let i = randNum(matrix.length);
  let j = randNum(matrix[0].length);

  if (matrix[i][j] === 0){
    matrix[i][j] = 3;
    console.log('computer missed: ', i, j);

  } else if (matrix[i][j] === 3) {
    console.log('already hit here: ', i, j);
    computerStrike(matrix);

  } else if (matrix[i][j] && matrix[i][j][1] === 1) {
    matrix[i][j][1] = 2;
    console.log('hit: ', i, j);

  } else if (matrix[i][j] && matrix[i][j][1] === 2) {
    matrix[i][j][1] = 2;
    console.log('already hit : ', i, j);
    computerStrike(matrix);

  } 

  console.log(matrix, i, j);
}

// Determine if strike is a hit, miss, or already hit
const strike = (row, col, message, node) => {
  // console.log(row, col, matrix)
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
      computerStrike(playerMatrix);   
    } 

  });
}

let strikeComputerBoard = chooseSquare(table2, messages);

// displayMessage(messages.ship[0]);




// let strikePlayerBoard = chooseSquare(table1);





const changeMessage = (message) => {
  const button = document.querySelector('.button');
  const span = document.querySelector('.confirm');
  const p = document.querySelector('.messages');

  // button.addEventListener('click', event => {
  //   clearMessage();
  //   displayMessage(message.carrier, message.next);
  // })
}

// changeMessage(messages);
