// stars.js

export function initStars(backgroundId) {
    const background = document.getElementById(backgroundId);
    if (!background) {
      console.error('Background element is missing.');
      throw new Error('Initialization failed due to missing background element.');
    }
  
    function createStar() {
      const star = document.createElement('div');
      star.style.position = 'absolute';
      star.style.width = `${Math.random() * 3 + 1}px`;
      star.style.height = star.style.width;
      star.style.backgroundColor = 'white';
      star.style.borderRadius = '50%';
  
      const rect = background.getBoundingClientRect();
      const randomX = Math.random() * rect.width;
      const randomY = Math.random() * rect.height;
  
      star.style.left = `${randomX}px`;
      star.style.top = `${randomY}px`;
      star.style.opacity = 0;
      star.style.transition = 'opacity 2s';
  
      background.appendChild(star);
  
      setTimeout(() => {
        star.style.opacity = 1;
      }, 10);
  
      setTimeout(() => {
        star.style.opacity = 0;
        star.remove();
      }, 4000);
    }
  
    setInterval(() => {
      if (background.childElementCount > 100) {
        background.firstChild.remove();
      }
      createStar();
    }, 300);
  }
  