function ToggleMenu(){
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".main-icon");

  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener('DOMContentLoaded', function() {
  const sliders = document.querySelectorAll('.slider');
  
  sliders.forEach((slider, index) => {
    const images = slider.querySelectorAll('img');
    const navDots = slider.parentElement.querySelectorAll('.nav-dot');
    const imageCount = images.length;
    let currentIndex = 0;

    function showNextImage() {
      currentIndex = (currentIndex + 1) % imageCount;
      slider.scrollLeft = slider.offsetWidth * currentIndex;
      updateNavDots();
    }

    function updateNavDots() {
      navDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    navDots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = i;
        slider.scrollLeft = slider.offsetWidth * currentIndex;
        updateNavDots();
      });
    });

    // Change image every 2 seconds
    setInterval(showNextImage, 2000);
  });
});

const svg = document.getElementById('ocean');

    // Generates a soft ocean blue shade
    const randomBlueShade = () => {
      const r = 0;
      const g = Math.floor(Math.random() * 100) + 100; // Lighter blue-green shades
      const b = Math.floor(Math.random() * 200) + 55; // Deeper blues with some variations
      const a = Math.random() * 0.4 + 0.4; // Opacity between 0.4 and 0.8 for soft waves
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    };

    const createWave = (y, amplitude, frequency, phase, color) => {
      const wave = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      wave.setAttribute('fill', color);
      svg.appendChild(wave);
      return { wave, y, amplitude, frequency, phase, color };
    };

    const waves = Array.from({ length: 80 }, () =>  // Reduced number of waves for smoother look
      createWave(
        Math.random() * window.innerHeight, // Random Y position
        Math.random() * 40 + 30, // Random amplitude for smaller, gentle waves
        Math.random() * 250 + 150, // Random frequency for more relaxed motion
        Math.random() * Math.PI * 2, // Random phase for variation
        randomBlueShade() // Use new soothing blue shades
      )
    );

    const updateWavePath = (waveObj, time) => {
      const { wave, y, amplitude, frequency, phase } = waveObj;
      let path = `M 0 ${y}`;
      for (let x = 0; x <= window.innerWidth; x += 10) {
        const offsetY = amplitude * Math.sin((x / frequency) + phase + time);
        path += ` L ${x} ${y + offsetY}`;
      }
      path += ` L ${window.innerWidth} ${window.innerHeight} L 0 ${window.innerHeight} Z`;
      wave.setAttribute('d', path);
    };

    const animate = () => {
      const time = Date.now() * 0.002;
      waves.forEach(waveObj => {
        updateWavePath(waveObj, time);
        waveObj.phase += Math.random() * 0.02 - 0.01; // Slightly randomize movement
      });
      requestAnimationFrame(animate);
    };

    const init = () => {
      svg.setAttribute('width', window.innerWidth);
      svg.setAttribute('height', window.innerHeight);
      animate();
    };

    window.addEventListener('resize', () => {
      svg.innerHTML = ''; // Clear existing waves
      waves.length = 0;
      waves.push(...Array.from({ length: 80 }, () => 
        createWave(
          Math.random() * window.innerHeight,
          Math.random() * 40 + 30,
          Math.random() * 250 + 150,
          Math.random() * Math.PI * 2,
          randomBlueShade()
        )
      ));
      init();
    });

    init();


// let intervalId;

// function startSlider() {
//   intervalId = setInterval(showNextImage, 2000);
// }

// function stopSlider() {
//   clearInterval(intervalId);
// }

// slider.addEventListener('mouseover', stopSlider);
// slider.addEventListener('mouseout', startSlider);

// startSlider();