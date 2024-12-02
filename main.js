// main.js
import { initFarming } from './farming.js';
import { initStars } from './stars.js';

document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.querySelector('.progress-bar');
  const progressPercent = document.querySelector('.progress-percent');
  const timerElement = document.querySelector('.timer');
  const mainButton = document.querySelector('.main-button');
  const pointsTotal = document.querySelector('.points-total');

  const backgroundId = 'background';

  // Инициализация
  initFarming(progressBar, progressPercent, timerElement, mainButton, pointsTotal);
  initStars(backgroundId);
});
