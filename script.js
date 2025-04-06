const socket = io('https://glitch.com/~rune-thread-crab');
const boardElement = document.getElementById('board');
const playerTurnElement = document.getElementById('player-turn');
const winnerElement = document.getElementById('winner');
const resetButton = document.getElementById('reset-btn');

let board = Array(10).fill().map(() => Array(10).fill(null));
let currentPlayer = 'red';
let gameOver = false;

// Инициализация игры
function initGame() {
  renderBoard();
  socket.on('update', (data) => {
    board = data.board;
    currentPlayer = data.currentPlayer;
    updateUI();
  });

  socket.on('gameOver', (data) => {
    gameOver = true;
    board = data.board;
    winnerElement.textContent = `Победили ${data.winner === 'red' ? 'Красные' : 'Синие'}!`;
    updateUI();
  });

  socket.on('reset', (data) => {
    board = data.board;
    currentPlayer = data.currentPlayer;
    gameOver = false;
    winnerElement.textContent = '';
    updateUI();
  });
}

// Отрисовка поля
function renderBoard() {
  boardElement.innerHTML = '';
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = row;
      cell.dataset.col = col;
      
      if (board[row][col]) {
        const ball = document.createElement('div');
        ball.className = `ball ${board[row][col]}`;
        cell.appendChild(ball);
      }
      
      cell.addEventListener('click', () => makeMove(row, col));
      boardElement.appendChild(cell);
    }
  }
}

// Ход игрока
function makeMove(row, col) {
  if (gameOver || board[row][col] !== null) return;
  socket.emit('move', { row, col, color: currentPlayer });
}

// Обновление интерфейса
function updateUI() {
  playerTurnElement.textContent = currentPlayer === 'red' ? 'Красные' : 'Синие';
  renderBoard();
}

// Сброс игры
resetButton.addEventListener('click', () => {
  socket.emit('reset');
});

// Запуск игры
initGame();
