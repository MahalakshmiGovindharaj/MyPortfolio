
(function ($) {
  "use strict"
  var ALX = {};

  $(document).ready(function () {
    // Correct the selector: use '.portfolio-filter-item' instead of the misspelled '.portfolio-fliter-item'
    var portfolioWork = $('.portfolio-filter-item');
    $(portfolioWork).isotope({
      resizable: false,
      itemSelector: '.portfolio-item',
      layoutMode: 'masonry',
      filter: '*'
    });

    // Filtering items on portfolio.html
    var portfolioFilter = $('.filter li');

    // filter items on button click
    $(portfolioFilter).on('click', function () {
      var filterValue = $(this).attr('data-filter');
      portfolioWork.isotope({ filter: filterValue });
    });

    // Add/remove class on filter list
    $(portfolioFilter).on('click', function () {
      $(this).addClass('active').siblings().removeClass('active');
    });
  });


  ALX.mTypeIt = function () {
    new TypeIt('#type-it', {
      speed: 200,
      loop: true,
      strings: [
        'Designer',
        'Developer'
      ],
      breakLines: false
    });
  }


  // portfolio animation
  // Get all image elements with class "portfolio-img img"
  const images = document.querySelectorAll(".portfolio-img img");

  // Loop through each image
  images.forEach(function (image) {
    // Add event listener for hover
    image.addEventListener("mouseover", function (event) {
      // Get the image height
      const imageHeight = image.clientHeight;

      // Get the container height (adjust selector if needed)
      const containerHeight = event.target.parentElement.clientHeight;

      // Calculate scroll offset based on image and container heights
      const scrollOffset = (imageHeight - containerHeight) / imageHeight;

      // Set the transform property dynamically using calculated offset
      image.style.transform = `translateY(-${scrollOffset * 100}%)`;
    });

    // Add event listener for mouseout (optional)
    image.addEventListener("mouseout", function () {
      // Reset the transform property (optional)
      image.style.transform = "";
    });
  });

  // Get references to all icon elements
  const emailIcon = document.getElementById("emailIcon");
  const phoneIcon = document.getElementById("phoneIcon");
  const linkedinIcon = document.getElementById("linkedinIcon");

  // Add click event listeners with appropriate actions
  emailIcon.addEventListener("click", function () {
    window.location.href = "mailto:grajs.mahalakshmi@gmail.com";
  });

  phoneIcon.addEventListener("click", function () {
    window.location.href = "tel:9344048705";
  });

  linkedinIcon.addEventListener("click", function () {
    window.open("https://www.linkedin.com/in/mahalakshmi-govindharaj-6090a323a/", "_blank");
  });

  // Window on Load

  $(document).ready(function () {

    ALX.mTypeIt();
  });
  //body height
  function calculateVh() {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
    console.log(vh);
  }
  
  // Initial calculation
  calculateVh();
  
  // Re-calculate on resize
  window.addEventListener('resize', calculateVh);
  
  // Re-calculate on device orientation change
  window.addEventListener('orientationchange', calculateVh);


})(jQuery);


