var table1 = document.createElement('table');
var table2 = document.createElement('table');

var createTable = function(table) {

  for (var i = 0; i < 10; i++) {

    var tableRow = document.createElement('tr');

    for (var j = 0; j < 10; j++) {
      
      var tableData = document.createElement('td');
      tableRow.appendChild(tableData);

    }

    table.appendChild(tableRow);
  }

}

createTable(table1);
createTable(table2);

var boardOne = document.getElementById('board_one');
var boardTwo = document.getElementById('board_two');

boardOne.appendChild(table1);
boardTwo.appendChild(table2);
