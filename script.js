document.addEventListener("DOMContentLoaded", () => {
    // Проверяем доступность Telegram WebApp API
    if (typeof Telegram !== "undefined" && Telegram.WebApp) {
        // Устанавливаем цвет шапки приложения
        Telegram.WebApp.setHeaderColor("bg_color"); // Основной цвет фона шапки
        // Или: Telegram.WebApp.setHeaderColor("secondary_bg_color"); // Второстепенный цвет шапки
    } else {
        console.error("Telegram WebApp API недоступен.");
    }
});

// Получаем ссылки на элементы интерфейса
const coinCircle = document.getElementById('coin-circle'); // Круглая кнопка монеты
const balanceDisplay = document.getElementById('balance'); // Элемент отображения баланса
const startButton = document.getElementById('start-button'); // Кнопка запуска "фарминга"
const progressFill = document.getElementById('progress-fill'); // Элемент заполнения прогресса
const percentageDisplay = document.getElementById('percentage'); // Отображение процента прогресса
const timerDisplay = document.getElementById('timer'); // Таймер обратного отсчета

// Инициализируем баланс из localStorage или устанавливаем на 0, если данных нет
let balance = localStorage.getItem('balance') ? parseInt(localStorage.getItem('balance')) : 0;  
let progress = 0; // Прогресс заполнения
let interval; // Интервал для обновления таймера

// Функция для инициализации отображения баланса
function initializeBalance() {
    balanceDisplay.textContent = balance; // Отображаем текущий баланс
}

// Обработка нажатия на кнопку монеты
coinCircle.addEventListener('click', () => {
    balance += 1; // Увеличиваем баланс на 1
    localStorage.setItem('balance', balance); // Сохраняем баланс в localStorage
    balanceDisplay.textContent = balance; // Обновляем отображение баланса
});

// Логика кнопки "Start" или "Claim"
startButton.addEventListener('click', () => {
    if (startButton.textContent === 'Start') {
        // Запуск фарминга
        startButton.textContent = 'Farming'; 
        startButton.style.backgroundColor = '#7BD285'; // Меняем цвет кнопки
        startButton.style.color = '#0F2412'; 
        startFarming();
    } else if (startButton.textContent === 'Claim') {
        // Завершение фарминга и добавление награды
        balance += 4800; // Примерная награда
        localStorage.setItem('balance', balance); // Сохраняем баланс
        balanceDisplay.textContent = balance; // Обновляем отображение
        resetFarming(); // Сбрасываем состояние
    }
});

// Логика фарминга (таймер и прогресс)
function startFarming() {
    let timeRemaining = 8 * 60; // 8 минут в секундах
    interval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--; // Уменьшаем оставшееся время
            progress = ((480 - timeRemaining) / 480) * 100; // Рассчитываем прогресс
            progressFill.style.width = `${progress}%`; // Обновляем заполнение прогресса
            percentageDisplay.textContent = `${Math.floor(progress)}%`; // Отображаем процент
            timerDisplay.textContent = formatTime(timeRemaining); // Обновляем таймер
        } else {
            // Таймер завершён
            clearInterval(interval);
            startButton.textContent = 'Claim'; // Меняем текст кнопки
            startButton.style.backgroundColor = '#0F2412';
            startButton.style.color = '#7BD285';
        }
    }, 1000); // Интервал обновления - 1 секунда
}

// Сброс состояния фарминга
function resetFarming() {
    progress = 0; // Сбрасываем прогресс
    progressFill.style.width = '0%'; 
    percentageDisplay.textContent = '0%';
    timerDisplay.textContent = '08:00'; // Сбрасываем таймер
    startButton.textContent = 'Start'; // Возвращаем текст кнопки
    startButton.style.backgroundColor = '#0F2412';
    startButton.style.color = '#7BD285';
}

// Форматирование времени в mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60); // Минуты
    const remainingSeconds = seconds % 60; // Оставшиеся секунды
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Инициализация баланса при загрузке страницы
window.onload = () => {
    initializeBalance(); // Отображаем текущий баланс
};

// Анимация звезд
const starContainer = document.getElementById('stars');

// Функция для создания анимационных звезд
function createStar() {
    const star = document.createElement('div'); // Создаем элемент звезды
    star.classList.add('star'); // Добавляем CSS-класс для анимации
    
    // Случайное размещение на экране
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    
    starContainer.appendChild(star); // Добавляем звезду в контейнер

    // Удаляем звезду после завершения анимации
    setTimeout(() => {
        star.remove();
    }, 3000); // 3 секунды
}

// Создание звезд каждые 200 мс
setInterval(createStar, 200);

// Логика переключения страниц
function switchPage(selectedPage) {
    // Снимаем активный класс со всех иконок
    const icons = document.querySelectorAll(".menu-icon");
    icons.forEach((icon) => {
        icon.classList.remove("active"); // Убираем активный класс

        // Меняем изображение на неактивное
        if (icon.id === "home") icon.src = "img/home deactive.png";
        if (icon.id === "tasks") icon.src = "img/tasks deactive.png";
        if (icon.id === "referral") icon.src = "img/ref deactive.png";
        if (icon.id === "info") icon.src = "img/info deactive.png";
    });

    // Добавляем активный класс к выбранной иконке
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
