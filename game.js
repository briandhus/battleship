var table = document.createElement('table');
var table2 = document.createElement('table');

for (var i = 0; i < 10; i++) {

  var tableRow = document.createElement('tr');

  for (var j = 0; j < 10; j++) {
    
    var tableData = document.createElement('td');
    tableRow.appendChild(tableData);

  }

  table.appendChild(tableRow);
}

for (var i = 0; i < 10; i++) {

  var tableRow = document.createElement('tr');

  for (var j = 0; j < 10; j++) {
    
    var tableData = document.createElement('td');
    tableRow.appendChild(tableData);

  }

  table2.appendChild(tableRow);
}

var boardOne = document.getElementById('board_one');
var boardTwo = document.getElementById('board_two');

boardOne.appendChild(table);
boardTwo.appendChild(table2);
// document.body.appendChild(table2);