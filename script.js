// Переменные для элементов
const progressBar = document.querySelector('.progress-bar');
const progressPercent = document.querySelector('.progress-percent');
const timerElement = document.querySelector('.timer');
const mainButton = document.querySelector('.main-button');
const pointsTotal = document.querySelector('.points-total');

// Стартовые значения
let progress = 0; // Текущий прогресс шкалы
let farming = false; // Состояние кнопки
let totalPoints = 226654; // Общий баланс пользователя
let currentPoints = 0; // Счетчик заработанных монет
let timer; // Для хранения таймера обратного отсчета

// Конфигурация
const totalTime = 60; // Таймер на 1 минуту (в секундах)
const coinsPerSecond = 0.5; // Количество монет за секунду

// Функция запуска фарма
function startFarming() {
  if (farming) return; // Если фарм уже запущен, ничего не делаем

  farming = true;
  currentPoints = 0; // Сброс текущих монет
  progress = 0; // Сброс прогресса
  let timeLeft = totalTime; // Устанавливаем время таймера
  updateProgressBar();
  updateTimer(timeLeft);

  // Обновляем кнопку
  mainButton.textContent = `Farming ${currentPoints}`;
  mainButton.style.backgroundColor = '#5E5E5E';
  mainButton.style.color = '#9B9B9B';

  // Таймер и прогресс
  timer = setInterval(() => {
    timeLeft -= 1; // Уменьшаем время
    progress = ((totalTime - timeLeft) / totalTime) * 100; // Прогресс в процентах
    currentPoints += coinsPerSecond; // Увеличиваем монеты
    mainButton.textContent = `Farming ${currentPoints}`;
    updateProgressBar();
    updateTimer(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timer);
      progress = 100;
      updateProgressBar();
      mainButton.textContent = 'Claim';
      mainButton.style.backgroundColor = '#2D7AB1';
      mainButton.style.color = '#FFFFFF';
      farming = false;
    }
  }, 1000); // Обновление каждую секунду
}

// Функция обновления шкалы
function updateProgressBar() {
  progressBar.style.width = `${progress}%`;

  // Цвет шкалы в зависимости от прогресса
  if (progress <= 50) {
    progressBar.style.backgroundColor = '#D46A00';
  } else if (progress <= 99) {
    progressBar.style.backgroundColor = '#0FAD00';
  } else {
    progressBar.style.backgroundColor = '#2D7AB1';
  }

  // Обновление текста процента
  progressPercent.textContent = `${Math.floor(progress)}%`;
}

// Функция обновления таймера
function updateTimer(timeLeft) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerElement.textContent = `${minutes.toString().padStart(2, '0')}m ${seconds
    .toString()
    .padStart(2, '0')}s`;
}

// Функция для нажатия кнопки Claim
function claimPoints() {
  if (progress < 100) return; // Нельзя нажать Claim, если шкала не заполнена

  totalPoints += currentPoints; // Добавляем монеты к общему балансу
  pointsTotal.textContent = totalPoints.toLocaleString(); // Обновляем текст с общим количеством
  currentPoints = 0; // Сбрасываем счетчик монет
  progress = 0; // Сбрасываем шкалу
  updateProgressBar();

  // Сбрасываем кнопку
  mainButton.textContent = 'Start';
  mainButton.style.backgroundColor = '#0FAD00';
  mainButton.style.color = '#FFFFFF';
}

// Событие для основной кнопки
mainButton.addEventListener('click', () => {
  if (mainButton.textContent === 'Start') {
    startFarming();
  } else if (mainButton.textContent === 'Claim') {
    claimPoints();
  }
});
