const coinCircle = document.getElementById('coin-circle');
const balanceDisplay = document.getElementById('balance');
const startButton = document.getElementById('start-button');
const progressFill = document.getElementById('progress-fill');
const percentageDisplay = document.getElementById('percentage');
const timerDisplay = document.getElementById('timer');



let balance = localStorage.getItem('balance') ? parseInt(localStorage.getItem('balance')) : 0;  // Загружаем сохранённый баланс из localStorage, если он есть
let progress = 0;
let interval;

// Инициализация отображения баланса
function initializeBalance() {
  balanceDisplay.textContent = balance;
}

// Функция нажатия на монету
coinCircle.addEventListener('click', () => {
  balance += 1;  // Добавляем 1 монету при нажатии
  localStorage.setItem('balance', balance);  // Сохраняем новый баланс в localStorage
  balanceDisplay.textContent = balance;  // Обновляем отображение баланса
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
    localStorage.setItem('balance', balance);  // Сохраняем новый баланс в localStorage
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
// Инициализация баланса при загрузке страницы
window.onload = () => {
  initializeBalance();
};

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



function switchPage(selectedPage) {
  // Убираем класс active у всех иконок
  const icons = document.querySelectorAll(".menu-icon");
  icons.forEach((icon) => {
    icon.classList.remove("active");

    // Меняем изображение на неактивное
    if (icon.id === "home") icon.src = "img/home deactive.png";
    if (icon.id === "tasks") icon.src = "img/tasks deactive.png";
    if (icon.id === "referral") icon.src = "img/ref deactive.png";
    if (icon.id === "info") icon.src = "img/info deactive.png";
  });

  // Добавляем класс active к выбранной иконке
  const selectedIcon = document.getElementById(selectedPage);
  selectedIcon.classList.add("active");

  // Меняем изображение на активное
  if (selectedPage === "home") selectedIcon.src = "img/home active.png";
  if (selectedPage === "tasks") selectedIcon.src = "img/tasks active.png";
  if (selectedPage === "referral") selectedIcon.src = "img/ref active.png";
  if (selectedPage === "info") selectedIcon.src = "img/info active.png";

  // Логика переключения страниц
  console.log(`Переключение на страницу: ${selectedPage}`);
}

