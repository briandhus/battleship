// Game instructions and options
const messages = {
  ship: ['Click on a square in Zone 1 to choose the location of your Carrier.', 
          'Click on a square in Zone 1 to choose the location of your Battleship.',
          'Click on a square in Zone 1 to choose the location of your Cruiser.',
          'Click on a square in Zone 1 to choose the location of your Submarine.',
          'Click on a square in Zone 1 to choose the location of your Destroyer.'],
  start: 'Click to start',
  attack: 'Click on a square in Zone 2 to fire at!',
  alreadyHit: 'You already hit this location! Target another spot.',
  hit: 'Direct HIT!',
  computerHit: 'Boom! I hit ya!',
  miss: 'Splash, you hit water.',
  playerSink: 'Shiver me timbers, you sank my ',
  computerSink: 'Yo-ho-ho Matey, I sank yer ',
  win: 'You sank my entire fleet! You WIN!',
  loss: 'Computer Pirate wins, better luck next time!'
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