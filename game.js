// Create tables
const table1 = document.createElement('table');
table1.classList.add('table1');
const table2 = document.createElement('table');
table2.classList.add('table2');


const createTable = table => {

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

createTable(table1);
createTable(table2);

const rowCount = table1.childNodes.length;

const boardOne = document.getElementById('board_one');
const boardTwo = document.getElementById('board_two');

boardOne.appendChild(table1);
boardTwo.appendChild(table2);

// Ships
const ships = {
  carrier: [0, 0, 0, 0, 0],
  battleship: [0, 0, 0, 0],
  cruiser: [0, 0, 0],
  submarine: [0, 0, 0],
  destroyer: [0, 0]
};

// Random computer ship placing function
const placeComputerShips = (ship, coordinates) => {

  const randNum = max => Math.floor(Math.random() * max);
  const direction = ['vertical', 'horizontal'];
  let directionChoice = direction[randNum(direction.length)];
  let row = randNum(rowCount);

  if (directionChoice === 'vertical') {
    console.log('V', ship, coordinates)
  } else {
    console.log('H', ship)
  }
  // flag squares for a ship's length
}

for (let el in ships) {
  placeComputerShips(el, ships[el]);
}

// Game instructions and options


// Capture fired upon coordinates on click
const fire = table => {

  table.addEventListener("click", function( event ) {   
    // const coordinates = [event.target.className[0], event.target.className[1]];
    const coordinates = event.target.className;
    return Number(coordinates);
  });

}

fire(table1);
fire(table2);
