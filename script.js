document.addEventListener('DOMContentLoaded', function() {
  // Section Animations
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('active');
          }
      });
  }, { threshold: 0.1 });

  sections.forEach(section => {
      observer.observe(section);
  });

  // Image Slider
  const slider = document.querySelector('.slider');
  const sliderNavButtons = document.querySelectorAll('.slider-nav button');
  let currentSlide = 0;
  const totalSlides = sliderNavButtons.length;

  function showSlide(index) {
      slider.style.transform = `translateX(-${index * 100}%)`;
      sliderNavButtons.forEach(btn => btn.classList.remove('active'));
      sliderNavButtons[index].classList.add('active');
      currentSlide = index;
  }

  sliderNavButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
          showSlide(index);
      });
  });

  setInterval(function() {
      let nextSlide = (currentSlide + 1) % totalSlides;
      showSlide(nextSlide);
  }, 5000);

  // Project Filtering
  const projectCategories = document.querySelectorAll('.project-category');
  // const projectItems = document.querySelectorAll('.project-item');

  projectCategories.forEach(category => {
      category.addEventListener('click', () => {
          const selectedCategory = category.getAttribute('data-category');
          
          projectCategories.forEach(cat => cat.classList.remove('active'));
          category.classList.add('active');
          
          projectItems.forEach(item => {
              const itemCategory = item.getAttribute('data-category');
              
              if (selectedCategory === 'all' || selectedCategory === itemCategory) {
                  item.style.display = 'block';
              } else {
                  item.style.display = 'none';
              }
          });
      });
  });

  // Project Modal
  const projectItems = document.querySelectorAll('.project-item');
  const body = document.body;
  let modal;

  projectItems.forEach(item => {
      item.addEventListener('click', () => {

          // Add active class after a small delay for animation
          setTimeout(() => {
              modal.classList.add('active');
          }, 10);
          
      });
  });


  // Smooth Scrolling for Navigation
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          
          window.scrollTo({
              top: targetSection.offsetTop - 80,
              behavior: 'smooth'
          });
      });
  });

  // Form Submission
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const formData = new FormData(contactForm);
          const formValues = Object.fromEntries(formData.entries());
          
          // Here you would normally send the form data to a server
          console.log('Form submitted:', formValues);
          
          // Show success message
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.textContent = 'Your message has been sent successfully!';
          successMessage.style.color = 'green';
          successMessage.style.marginTop = '10px';
          
          contactForm.appendChild(successMessage);
          contactForm.reset();
          
          setTimeout(() => {
              contactForm.removeChild(successMessage);
          }, 5000);
      });
  }

  // Sticky Navigation
  const nav = document.querySelector('nav');
  const scrollWatcher = document.createElement('div');
  
  scrollWatcher.setAttribute('data-scroll-watcher', '');
  nav.before(scrollWatcher);
  
  const navObserver = new IntersectionObserver((entries) => {
      nav.classList.toggle('sticky', !entries[0].isIntersecting);
  }, { rootMargin: "50px 0px 0px 0px" });
  
  navObserver.observe(scrollWatcher);

  // Mobile Navigation Toggle
  const navContainer = document.querySelector('.nav-container');
  const mobileNavButton = document.createElement('div');
  mobileNavButton.className = 'mobile-nav-toggle';
  mobileNavButton.innerHTML = '<span></span><span></span><span></span>';
  navContainer.appendChild(mobileNavButton);

  mobileNavButton.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      navLinks.classList.toggle('active');
      mobileNavButton.classList.toggle('active');
  });

  // Add mobile navigation toggle styles
  const style = document.createElement('style');
  style.textContent = `
      .mobile-nav-toggle {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          height: 21px;
          cursor: pointer;
      }
      
      .mobile-nav-toggle span {
          width: 100%;
          height: 3px;
          background-color: var(--primary-color);
          transition: var(--transition);
      }
      
      .mobile-nav-toggle.active span:nth-child(1) {
          transform: translateY(9px) rotate(45deg);
      }
      
      .mobile-nav-toggle.active span:nth-child(2) {
          opacity: 0;
      }
      
      .mobile-nav-toggle.active span:nth-child(3) {
          transform: translateY(-9px) rotate(-45deg);
      }
      
      @media (max-width: 768px) {
          .mobile-nav-toggle {
              display: flex;
          }
          
          .nav-links {
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              background-color: white;
              flex-direction: column;
              padding: 20px;
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
              transform: translateY(-100%);
              opacity: 0;
              visibility: hidden;
              transition: all 0.3s ease;
          }
          
          .nav-links.active {
              transform: translateY(0);
              opacity: 1;
              visibility: visible;
          }
          
          .nav-links li {
              margin: 15px 0;
          }
          
          #about {
              flex-direction: column;
          }
          
          .about-content {
              padding-right: 0;
              margin-bottom: 40px;
          }
          
          .contact-container {
              flex-direction: column;
          }
          
          .edu-exp-item {
              flex-direction: column;
          }
          
          .edu-exp-image {
              order: -1;
          }
      }
  `;
  document.head.appendChild(style);
});