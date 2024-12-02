// farming.js

export function initFarming(
    progressBar,
    progressPercent,
    timerElement,
    mainButton,
    pointsTotal
  ) {
    if (!progressBar || !progressPercent || !timerElement || !mainButton || !pointsTotal) {
      console.error('One or more required DOM elements are missing.');
      throw new Error('Initialization failed due to missing DOM elements.');
    }
  
    let progress = 0;
    let farming = false;
    let totalPoints = 0;
    let currentPoints = 0;
    let timer;
  
    const totalTime = 60;
    const coinsPerSecond = 0.5;
  
    function startFarming() {
      if (farming) return;
  
      farming = true;
      currentPoints = 0;
      progress = 0;
      let timeLeft = totalTime;
      updateProgressBar();
      updateTimer(timeLeft);
  
      mainButton.textContent = `Farming ${currentPoints.toFixed(2)}`;
      mainButton.style.backgroundColor = '#5E5E5E';
      mainButton.style.color = '#9B9B9B';
  
      timer = setInterval(() => {
        timeLeft -= 1;
        progress = ((totalTime - timeLeft) / totalTime) * 100;
        currentPoints += coinsPerSecond;
        mainButton.textContent = `Farming ${currentPoints.toFixed(2)}`;
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
      }, 1000);
    }
  
    function claimPoints() {
      if (progress < 100) return;
  
      clearInterval(timer);
      totalPoints += currentPoints;
      pointsTotal.textContent = totalPoints.toLocaleString();
      currentPoints = 0;
      progress = 0;
      updateProgressBar();
  
      mainButton.textContent = 'Start';
      mainButton.style.backgroundColor = '#0FAD00';
      mainButton.style.color = '#FFFFFF';
      farming = false;
    }
  
    function updateProgressBar() {
      progressBar.style.width = `${progress}%`;
  
      if (progress <= 50) {
        progressBar.style.backgroundColor = '#D46A00';
      } else if (progress <= 99) {
        progressBar.style.backgroundColor = '#0FAD00';
      } else {
        progressBar.style.backgroundColor = '#2D7AB1';
      }
  
      progressPercent.textContent = `${Math.floor(progress)}%`;
    }
  
    function updateTimer(timeLeft) {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerElement.textContent = `${minutes.toString().padStart(2, '0')}m ${seconds
        .toString()
        .padStart(2, '0')}s`;
    }
  
    mainButton.addEventListener('click', () => {
      if (mainButton.textContent === 'Start') {
        startFarming();
      } else if (mainButton.textContent === 'Claim') {
        claimPoints();
      }
    });
  }
  