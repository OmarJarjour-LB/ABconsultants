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
  carousel3: 0
};

function showSlide(carouselId, index) {
  const carousel = document.getElementById(carouselId);
  const slides = carousel.querySelectorAll('.carousel-image');
  const totalSlides = slides.length;

  if (index >= totalSlides) {
    carouselIndices[carouselId] = 0;
  } else if (index < 0) {
    carouselIndices[carouselId] = totalSlides - 1;
  } else {
    carouselIndices[carouselId] = index;
  }

  const offset = -carouselIndices[carouselId] * 100;
  carousel.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
}

function nextSlide(carouselId) {
  showSlide(carouselId, carouselIndices[carouselId] + 1);
}

function prevSlide(carouselId) {
  showSlide(carouselId, carouselIndices[carouselId] - 1);
}
