// generate random strikes for computer
const computerStrike = (matrix) => {
  const randNum = max => Math.floor(Math.random() * max);

  let i = randNum(matrix.length);
  let j = randNum(matrix[0].length);

  let node = table1.rows[i].cells[j];

  if (matrix[i][j] === 0){
    matrix[i][j] = 3;
    node.classList.add('miss');

  } else if (matrix[i][j] === 3) {
    computerStrike(matrix);

  } else if (matrix[i][j] && matrix[i][j][1] === 1) {

    let shipName = matrix[i][j].ship;
    matrix[i][j][1] = 2;
    node.classList.remove('placed');
    node.classList.add('hit');
    ships[shipName]['playerHits']--;
    clearMessage();
    displayMessage(messages.computerHit, true);

    if (ships[shipName]['playerHits'] === 0) {
      ships['activePlayerShips']--;
      clearMessage();
      displayMessage(messages.computerSink + shipName + '!', true);
    }

    if (ships['activePlayerShips'] === 0) {
      clearMessage();
      displayMessage(messages.loss, true);
    } 

    return;

  } else if (matrix[i][j] && matrix[i][j][1] === 2) {
    matrix[i][j][1] = 2;
    computerStrike(matrix);
  } 

  console.log(matrix, i, j);
}

// Determine if strike is a hit, miss, or already hit
const strike = (row, col, node) => {

  let misses = 0;

  if (matrix[row][col][1] === 1) {
    let shipName = matrix[row][col]['ship'];
    matrix[row][col] = 2;
    ships[shipName]['hits']--;
    node.classList.add('hit');
    clearMessage();
    displayMessage(messages.hit, true);
    computerStrike(playerMatrix);

    if (ships[shipName]['hits'] === 0) {
      ships['activeShips']--;
      clearMessage();
      displayMessage(messages.playerSink + shipName + '!', true);
    }

    if (ships['activeShips'] === 0) {
      clearMessage();
      displayMessage(messages.win, true);
    } 
    return;
  } 

  if (matrix[row][col] > 1) {
    alert(messages.alreadyHit);
  }

  if (matrix[row][col] === 0) {
    matrix[row][col] = 3;
    misses++;
    node.classList.add('miss');
    clearMessage();
    displayMessage(messages.miss, true);
    computerStrike(playerMatrix);
    return misses;
  }
  console.log('computer: ', matrix);
}