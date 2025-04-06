const socket = io('https://rune-thread-crab.glitch.me', {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
});

// Проверка подключения
socket.on('connect', () => {
  console.log('Подключено к серверу');
  document.getElementById('connection-status').textContent = 'Онлайн';
});

socket.on('disconnect', () => {
  console.log('Отключено от сервера');
  document.getElementById('connection-status').textContent = 'Оффлайн';
});

// Обработчик ошибок
socket.on('connect_error', (err) => {
  console.error('Ошибка подключения:', err);
  alert('Не удалось подключиться к серверу. Попробуйте позже.');
});
