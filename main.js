/* SHOW MENU */
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* Menu show */

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu Hidden */

if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/* Remove Menu Mobile */

const navLink = document.querySelectorAll('.nav__link')
const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/* ADD BLUR HEADER */

const blurHeader = () =>{
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('blur-header') : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/* Scroll up */

const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


/* scroll section active link */

const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58; // Adjust the offset based on your header height
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav__menu a[href*="' + sectionId + '"]');

        if (sectionsClass) {
            if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link');
            } else {
                sectionsClass.classList.remove('active-link');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);


/* CURSOR */

// Query the cursor element once and store it in a variable
const cursor = document.querySelector('.cursor');
let timeout; // Declare timeout outside of the event listener

document.addEventListener('mousemove', (e) => {
    // Position the cursor element centered at the mouse pointer
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.display = "block";

    // Clear the previous timeout
    clearTimeout(timeout);

    // Set a new timeout to hide the cursor after 1 second of inactivity
    timeout = setTimeout(() => {
        cursor.style.display = "none";
    }, 1000);
});

// Hide the cursor when the mouse leaves the document
document.addEventListener('mouseout', () => {
    cursor.style.display = "none";

});




// Enlarge the cursor on hover and reset on click
const clickableElements = document.querySelectorAll('a, button, .clickable-element, i, input, textarea, nav__toggle, nav__close'); // Add other elements as needed

clickableElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('enlarged'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('enlarged'));
});

document.addEventListener('click', () => {
    cursor.classList.remove('enlarged');
    setTimeout(() => {
        const el = document.querySelector('a:hover, button:hover, .clickable-element:hover, i:hover, input:hover, textarea:hover, .nav__toggle:hover, .nav__close:hover');
        if (el) {
            cursor.classList.add('enlarged');
        }
    }, 100); // Reset duration to half (0.1s) of the CSS transition time (0.2s)
});





/* Carousel */
let carouselIndices = {
    carousel1: 0,
    carousel2: 0,
    carousel3: 0,
    carousel4: 0,
  };
  
  function showSlide(carouselId, index) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
  
    // Handle out-of-bounds indices
    if (index >= totalSlides) {
      carouselIndices[carouselId] = 0;
    } else if (index < 0) {
      carouselIndices[carouselId] = totalSlides - 1;
    } else {
      carouselIndices[carouselId] = index;
    }
  
    // Move the carousel to show the correct slide
    const offset = -carouselIndices[carouselId] * 100;
    carousel.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
  
    // Update active class for the correct slide and its description
    slides.forEach((slide, i) => {
      if (i === carouselIndices[carouselId]) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  }
  
  function nextSlide(carouselId) {
    showSlide(carouselId, carouselIndices[carouselId] + 1);
  }
  
  function prevSlide(carouselId) {
    showSlide(carouselId, carouselIndices[carouselId] - 1);
  }
  
  // Initialize the first slide
  document.addEventListener('DOMContentLoaded', () => {
    showSlide('carousel2', 0); // Initialize with the first slide for carousel2
  });
  


  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactus-form');
    const submitButton = document.querySelector('.contactus__button');
    const immediateFeedback = document.getElementById('immediate-feedback');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        // Display and animate the immediate feedback message
        immediateFeedback.style.display = 'block';
        setTimeout(() => {
            immediateFeedback.style.opacity = '1';
        }, 0); // Start fade-in effect

        // Disable the submit button to prevent multiple submissions
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                // Show alert after server confirms receipt
                alert('We have received your query and will reply to your email shortly.');

                // Fade out the immediate feedback message after the alert
                immediateFeedback.style.opacity = '0';
                setTimeout(() => {
                    immediateFeedback.style.display = 'none';
                }, 3000); // Wait 3 seconds before hiding the message

                form.reset(); // Reset the form fields
            } else {
                alert('There was a problem submitting your query. Please try again later.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while submitting your query. Please try again later.');
        })
        .finally(() => {
            // Re-enable the submit button and reset its text
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });
    });
});


/* carousel  touch  support */

document.addEventListener('DOMContentLoaded', () => {
    let startX = 0;
    let isDragging = false;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let currentIndex = 0;

    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const imagesContainer = carousel.querySelector('.carousel-images');
        const slides = carousel.querySelectorAll('.carousel-item');
        const totalSlides = slides.length;
        const slideWidth = imagesContainer.clientWidth;

        function setCarouselPosition() {
            imagesContainer.style.transform = `translateX(${currentTranslate}px)`;
        }

        function animation() {
            setCarouselPosition();
            if (isDragging) {
                requestAnimationFrame(animation);
            }
        }

        function handleTouchStart(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
            animationID = requestAnimationFrame(animation);
            prevTranslate = currentTranslate;
        }

        function handleTouchMove(e) {
            if (isDragging) {
                const currentX = e.touches[0].clientX;
                const diffX = currentX - startX;

                // Prevent dragging beyond the first and last slide
                if (currentIndex === 0 && diffX > 0) {
                    currentTranslate = prevTranslate + diffX / 3; // Reduce dragging effect on the first slide
                } else if (currentIndex === totalSlides - 1 && diffX < 0) {
                    currentTranslate = prevTranslate + diffX / 3; // Reduce dragging effect on the last slide
                } else {
                    currentTranslate = prevTranslate + diffX;
                }
            }
        }

        function handleTouchEnd() {
            isDragging = false;
            cancelAnimationFrame(animationID);

            const movedBy = currentTranslate - prevTranslate;

            // Only move if the slide is swiped by more than a third of its width
            if (movedBy < -slideWidth / 3) {
                // Swipe left
                currentIndex = (currentIndex + 1) % totalSlides;
            } else if (movedBy > slideWidth / 3) {
                // Swipe right
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            }

            // Snap to the nearest slide
            currentTranslate = -currentIndex * slideWidth;
            setCarouselPosition();

            // Reset translation values
            prevTranslate = currentTranslate;
        }

        imagesContainer.addEventListener('touchstart', handleTouchStart);
        imagesContainer.addEventListener('touchmove', handleTouchMove);
        imagesContainer.addEventListener('touchend', handleTouchEnd);

        // Initialize the first slide
        setCarouselPosition();
    });
});
