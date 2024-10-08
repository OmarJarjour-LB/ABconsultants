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
  
/* Contact forms */

  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactus-form');
    const submitButton = document.querySelector('.contactus__button');
    const immediateFeedback = document.getElementById('immediate-feedback');

    // Set up initial styles for the feedback element
    immediateFeedback.style.transition = 'opacity 1s ease-out'; // 1s fade-out duration

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

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

                // Show and animate the success message
                immediateFeedback.textContent = 'Message has been sent successfully.';
                immediateFeedback.style.backgroundColor = 'hsl(120, 100%, 90%)'; // Light green
                immediateFeedback.style.color = 'darkgreen';
                immediateFeedback.style.borderRadius = '0';
                immediateFeedback.style.display = 'block';
                setTimeout(() => {
                    immediateFeedback.style.opacity = '1';
                }, 0); // Start fade-in effect

                // Fade out the success message after 5 seconds
                setTimeout(() => {
                    immediateFeedback.style.opacity = '0'; // Trigger the fade-out
                    setTimeout(() => {
                        immediateFeedback.style.display = 'none';
                    }, 1000); // Ensure it hides after the fade-out completes (1s)
                }, 5000); // Wait 5 seconds before starting to fade out

                form.reset(); // Reset the form fields
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Error:', error);

            // Show and animate the error message
            immediateFeedback.textContent = 'Error sending query. Please try again later.';
            immediateFeedback.style.backgroundColor = 'hsl(0, 100%, 90%)'; // Light red
            immediateFeedback.style.color = 'darkred';
            immediateFeedback.style.borderRadius = '0';
            immediateFeedback.style.display = 'block';
            setTimeout(() => {
                immediateFeedback.style.opacity = '1';
            }, 0); // Start fade-in effect

            // Fade out the error message after 5 seconds
            setTimeout(() => {
                immediateFeedback.style.opacity = '0'; // Trigger the fade-out
                setTimeout(() => {
                    immediateFeedback.style.display = 'none';
                }, 1000); // Ensure it hides after the fade-out completes (1s)
            }, 5000); // Wait 5 seconds before starting to fade out
        })
        .finally(() => {
            // Re-enable the submit button and reset its text
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });
    });
});


/* carousel  touch  support */

document.addEventListener('DOMContentLoaded', function () {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach((carousel) => {
        let startX;
        let currentX;
        let isDragging = false;

        const imagesContainer = carousel.querySelector('.carousel-images');
        const items = carousel.querySelectorAll('.carousel-item');
        const totalItems = items.length;
        let index = 0;

        // Touch start event
        carousel.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
            isDragging = true;
            imagesContainer.style.transition = 'none'; // Disable transition for dragging
        });

        // Touch move event
        carousel.addEventListener('touchmove', function (e) {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            imagesContainer.style.transform = `translateX(calc(${-index * 100}% + ${diff}px))`;
        });

        // Touch end event
        carousel.addEventListener('touchend', function (e) {
            isDragging = false;
            imagesContainer.style.transition = ''; // Re-enable transition

            const diff = currentX - startX;
            const threshold = 50; // Swipe threshold to change the slide

            if (diff > threshold) {
                // Swipe right
                index = (index === 0) ? totalItems - 1 : index - 1;
            } else if (diff < -threshold) {
                // Swipe left
                index = (index === totalItems - 1) ? 0 : index + 1;
            }

            updateCarousel(index);
        });

        function updateCarousel(index) {
            // Move the carousel to the correct position
            imagesContainer.style.transform = `translateX(-${index * 100}%)`;

            // Update active class for items and descriptions
            items.forEach((item, i) => {
                if (i === index) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }

        // Initialize carousel
        updateCarousel(0);
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach((carousel) => {
        let startX;
        let currentX;
        let isDragging = false;

        const imagesContainer = carousel.querySelector('.carousel-images');
        const items = carousel.querySelectorAll('.carousel-item');
        const totalItems = items.length;
        let index = 0;

        // Touch start event
        carousel.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
            isDragging = true;
            imagesContainer.style.transition = 'none'; // Disable transition for dragging
        });

        // Touch move event
        carousel.addEventListener('touchmove', function (e) {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            const diff = currentX - startX;
            imagesContainer.style.transform = `translateX(calc(${-index * 100}% + ${diff}px))`;
        });

        // Touch end event
        carousel.addEventListener('touchend', function (e) {
            isDragging = false;
            imagesContainer.style.transition = ''; // Re-enable transition

            const diff = currentX - startX;
            const threshold = 50; // Swipe threshold to change the slide

            if (diff > threshold) {
                // Swipe right
                index = (index === 0) ? totalItems - 1 : index - 1;
            } else if (diff < -threshold) {
                // Swipe left
                index = (index === totalItems - 1) ? 0 : index + 1;
            }

            updateCarousel(index);
        });

        function updateCarousel(index) {
            // Move the carousel to the correct position
            imagesContainer.style.transform = `translateX(-${index * 100}%)`;

            // Update active class for items and descriptions
            items.forEach((item, i) => {
                if (i === index) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }

        // Initialize carousel
        updateCarousel(0);
    });
});



/* Highlight phone nummbers */


document.addEventListener('DOMContentLoaded', function() {
    const phoneNumbers = document.querySelectorAll('#phone-numbers');

    document.getElementById('contactus-message').addEventListener('click', function(e) {
        // The page will automatically scroll to the phone numbers due to the href link.
        
        // Highlight and flash the phone numbers
        phoneNumbers.forEach(function(phoneNumber) {
            phoneNumber.classList.add('highlighted');

            // Flash effect
            phoneNumber.style.animation = 'flash 1s';

            // Remove the highlight and flash after the animation
            setTimeout(() => {
                phoneNumber.style.animation = ''; // Clear the animation
                phoneNumber.classList.remove('highlighted');
            }, 1000); // Duration of the flash animation
        });
    });
});
