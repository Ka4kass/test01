document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.getElementById("prevSlide");
  const nextButton = document.getElementById("nextSlide");
  let currentIndex = 0;
  let autoSlideInterval;

  function updateSlide() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide();
  }

  // Start the auto-slide feature
  function startAutoSlide() {
    // Clear any existing interval first to prevent multiple intervals
    stopAutoSlide();
    // Create a new interval that changes slides every 5 seconds
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  // Stop the auto-slide feature
  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
  }

//prevButton.addEventListener("click", function() {
 //   prevSlide();
 //   startAutoSlide();
 // });

 // nextButton.addEventListener("click", function() {
//    nextSlide();
    // Restart the timer when manually changing slides
 //   startAutoSlide();
 //S });

  // Touch Events for Swipe
  let startX = 0;
  slider.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
    // Temporarily stop auto-sliding when user begins interaction
    stopAutoSlide();
  });

  slider.addEventListener("touchend", (event) => {
    let endX = event.changedTouches[0].clientX;
    if (startX - endX > 50) nextSlide(); // Left swipe
    if (endX - startX > 50) prevSlide(); // Right swipe
    // Restart auto-sliding after user interaction
    startAutoSlide();
  });

  // Mouse events for better UX (optional)
  slider.addEventListener("mouseenter", stopAutoSlide);
  slider.addEventListener("mouseleave", startAutoSlide);

  // Initialize the auto-slide feature
  startAutoSlide();
});