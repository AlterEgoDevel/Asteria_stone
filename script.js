const coinCircle = document.getElementById('coin-circle');
const balanceDisplay = document.getElementById('balance');
const startButton = document.getElementById('start-button');
const progressFill = document.getElementById('progress-fill');
const percentageDisplay = document.getElementById('percentage');
const timerDisplay = document.getElementById('timer');

let balance = 0;
let progress = 0;
let interval;

// Функция нажатия на монету
coinCircle.addEventListener('click', () => {
  balance += 1;
  balanceDisplay.textContent = balance;
});

// Логика кнопки Start
startButton.addEventListener('click', () => {
  if (startButton.textContent === 'Start') {
    startButton.textContent = 'Farming';
    startButton.style.backgroundColor = '#7BD285';
    startButton.style.color = '#0F2412';
    startFarming();
  } else if (startButton.textContent === 'Claim') {
    balance += 4800; // Примерная награда
    balanceDisplay.textContent = balance;
    resetFarming();
  }
});

// Начало фарминга
function startFarming() {
  let timeRemaining = 8 * 60; // 8 минут
  interval = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      progress = ((480 - timeRemaining) / 480) * 100;
      progressFill.style.width = `${progress}%`;
      percentageDisplay.textContent = `${Math.floor(progress)}%`;
      timerDisplay.textContent = formatTime(timeRemaining);
    } else {
      clearInterval(interval);
      startButton.textContent = 'Claim';
      startButton.style.backgroundColor = '#0F2412';
      startButton.style.color = '#7BD285';
    }
  }, 1000);
}

// Сброс состояния
function resetFarming() {
  progress = 0;
  progressFill.style.width = '0%';
  percentageDisplay.textContent = '0%';
  timerDisplay.textContent = '08:00';
  startButton.textContent = 'Start';
  startButton.style.backgroundColor = '#0F2412';
  startButton.style.color = '#7BD285';
}

// Форматирование времени
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`;
}


const starContainer = document.getElementById('stars');

// Функция для создания звезд
function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  
  // Рандомное размещение
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  
  // Установка позиции
  star.style.left = `${x}px`;
  star.style.top = `${y}px`;
  
  // Добавление в контейнер
  starContainer.appendChild(star);

  // Удаление звезды после завершения анимации
  setTimeout(() => {
    star.remove();
  }, 3000);
}

// Создание звезд каждые 200 мс
setInterval(createStar, 200);
