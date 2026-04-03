// 1. Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
});

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
}

// 2. Mobile Menu Logic
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Prevent scrolling when menu is open
    if(navLinks.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        body.style.overflow = 'auto';
    });
});

// 3. Scroll Reveal Animation
const reveal = () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 100;
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', reveal);
// Trigger reveal on load
window.addEventListener('load', reveal);

// 4. Header Dynamic Background
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'var(--bg)';
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'transparent';
        header.style.boxShadow = 'none';
    }
});

// Form Submission (Visual Only)
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerHTML = 'Sent Successfully! ✅';
    btn.style.background = '#22c55e';
    e.target.reset();
});

// Function to make the Form work
var form = document.getElementById("my-form");
    
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("form-status");
  var btn = document.getElementById("submit-btn");
  var data = new FormData(event.target);
  
  btn.innerHTML = "Sending...";
  
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Thanks! Message sent successfully. ✅";
      status.className = "success";
      form.reset();
      btn.innerHTML = "Send Message";
    } else {
      status.innerHTML = "Oops! There was a problem. ❌";
      status.className = "error";
      btn.innerHTML = "Try Again";
    }
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem. ❌";
    status.className = "error";
  });
}
form.addEventListener("submit", handleSubmit);