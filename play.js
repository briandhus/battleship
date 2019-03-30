
const table1 = document.createElement('table');
table1.classList.add('table1');
const table2 = document.createElement('table');
table2.classList.add('table2');


createTables(table1);
createTables(table2);

const boardOne = document.getElementById('board_one');
const boardTwo = document.getElementById('board_two');

boardOne.appendChild(table1);
boardTwo.appendChild(table2);

let matrix = shipMatrix();
let playerMatrix = shipMatrix();

placePlayerShips();

loopShips(ships);