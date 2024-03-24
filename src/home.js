// window.onscroll = function() {stickyNavbar()};

// var navbar = document.querySelector('header');
// var sticky = navbar.offsetTop;

// function stickyNavbar() {
//   if (window.pageYOffset >= sticky) {
//     navbar.classList.add("sticky")
//   } else {
//     navbar.classList.remove("sticky");
//   }
// }
document.addEventListener("DOMContentLoaded", function() {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showSlide(index) {
      // Ensure index is within bounds
      if (index < 0) {
          index = slides.length - 1;
      } else if (index >= slides.length) {
          index = 0;
      }

      // Update currentSlide
      currentSlide = index;

      // Calculate the transform value to center the active slide
      const activeSlideWidth = slides[currentSlide].offsetWidth;
      const sliderWidth = slider.offsetWidth;
      const offsetX = -(slides[currentSlide].offsetLeft - (sliderWidth - activeSlideWidth) / 2);
      slider.style.transform = "translateX(" + offsetX + "px)";

      // Update opacity for all slides
      slides.forEach((slide, i) => {
          if (i === currentSlide) {
              slide.classList.add("active");
              slide.classList.remove("blur");
          } else {
              slide.classList.remove("active");
              slide.classList.add("blur");
          }
      });
  }

  function nextSlide() {
      showSlide(currentSlide + 1);
  }

  function prevSlide() {
      showSlide(currentSlide - 1);
  }

  let autoSlideInterval = setInterval(nextSlide, 5000);

  document.querySelector(".slider-container").addEventListener("mouseenter", function() {
      clearInterval(autoSlideInterval);
  });

  document.querySelector(".slider-container").addEventListener("mouseleave", function() {
      autoSlideInterval = setInterval(nextSlide, 5000);
  });

  document.querySelector(".prev").addEventListener("click", function() {
      prevSlide();
      clearInterval(autoSlideInterval);
  });

  document.querySelector(".next").addEventListener("click", function() {
      nextSlide();
      clearInterval(autoSlideInterval);
  });

  // Show initial slide
  showSlide(currentSlide);

  // Update slide position on window resize
  window.addEventListener("resize", function() {
      showSlide(currentSlide);
  });
});
