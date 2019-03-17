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
    matrix.push(Array(rowCount).fill(1));
  }
  console.log(matrix)
  return matrix;
}
shipMatrix();

// Random computer ship placing function
const placeComputerShips = (ship, coordinates, hits) => {

  const randNum = max => Math.floor(Math.random() * max);

  const upOrDown = ['vertical', 'horizontal'];
  const leftOrRight = ['left', 'right'];

  let counter = coordinates.length;

  let upDownChoice = upOrDown[randNum(upOrDown.length)];
  let leftRightChoice = leftOrRight[randNum(leftOrRight.length)];

  let row = randNum(rowCount);
  let column = randNum(colCount);



  if (upDownChoice === 'vertical') {
    
    if (leftRightChoice === 'right' && column < 9) {
      console.log('V', 'R', ship, coordinates, hits, row, column);
    }

    if (leftRightChoice === 'left' && column > 0) {
      console.log('V', 'L', ship, coordinates, hits, row, column);
    }

  } else {
    
    if (leftRightChoice === 'right' && column < 9) {
      console.log('H', 'R', ship, coordinates, hits, row, column);
    }

    if (leftRightChoice === 'left' && column > 0) {
      console.log('H', 'L', ship, coordinates, hits, row, column);
    }
  }
  // flag squares for a ship's length
}

const pickDifferentSpots = () => {
  const usedNums = [];

  const randNum = max => Math.floor(Math.random() * max);

  // const upOrDown = ['vertical', 'horizontal'];
  // const leftOrRight = ['left', 'right'];

  // let counter = coordinates.length;

  let startNum = randNum(rowCount * colCount);
  startNum = startNum.toString();
  startNum = startNum.length < 2 ? '0'.concat(startNum) : startNum;

  let row = Number(startNum.split('')
                      .join('')[0]);

  let column = Number(startNum.split('')
                      .join('')[1]);

  console.log(startNum, row, column)

  if (!usedNums.includes(startNum)) {
    usedNums.push(startNum);
  }

  console.log(usedNums)

  // let upDownChoice = upOrDown[randNum(upOrDown.length)];
  // let leftRightChoice = leftOrRight[randNum(leftOrRight.length)];

  // let row = randNum(rowCount);
  // let column = randNum(colCount);

}

pickDifferentSpots()

for (let el in ships) {

  let coordinates = [];
  let missiles = 0;

  for (let stats in ships[el]) {

    if (stats === 'position') {
      coordinates = ships[el][stats];
    }
    if (stats === 'hits') {
      missiles = ships[el][stats];
    }

  }
  // console.log('ship loop', el, coordinates, missiles);
  placeComputerShips(el, coordinates, missiles);  
}

// Game instructions and options


// Capture coordinates on click
const chooseSquare = table => {

  table.addEventListener("click", event => {   
    // const coordinates = [event.target.className[0], event.target.className[1]];
    const coordinates = event.target.className;
    console.log(coordinates)
    return coordinates;
  });

}

chooseSquare(table1);
chooseSquare(table2);
