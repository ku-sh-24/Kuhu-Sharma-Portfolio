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