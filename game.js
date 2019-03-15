const table1 = document.createElement('table');
const table2 = document.createElement('table');

const createTable = function(table) {

  for (let i = 0; i < 10; i++) {

    const tableRow = document.createElement('tr');
    tableRow.classList.add(`${i}`);

    for (let j = 0; j < 10; j++) {
      
      const tableData = document.createElement('td');
      tableData.classList.add(`${j}`);
      tableRow.appendChild(tableData);

    }

    table.appendChild(tableRow);
  }

}

createTable(table1);
createTable(table2);

const boardOne = document.getElementById('board_one');
const boardTwo = document.getElementById('board_two');

boardOne.appendChild(table1);
boardTwo.appendChild(table2);
