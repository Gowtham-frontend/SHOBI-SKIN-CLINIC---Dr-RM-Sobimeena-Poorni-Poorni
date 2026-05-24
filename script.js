// ===========================
//  SHOBI SKIN CLINIC — SCRIPT
// ===========================

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  // Animate hamburger icon
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu on link click
document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ---- Reveal on scroll ----
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ---- Smooth scroll for all anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Form submission ----
function submitForm() {
  const name = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  const concern = document.getElementById('fconcern').value;
  const note = document.getElementById('formNote');

  if (!name) {
    showNote(note, 'Please enter your name.', 'error');
    document.getElementById('fname').focus();
    return;
  }
  if (!phone) {
    showNote(note, 'Please enter your phone number.', 'error');
    document.getElementById('fphone').focus();
    return;
  }
  if (!concern) {
    showNote(note, 'Please select your concern.', 'error');
    document.getElementById('fconcern').focus();
    return;
  }

  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  // Simulate a brief async send
  setTimeout(() => {
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#27ae60';
    showNote(note, `Thank you, ${name}! We'll contact you on ${phone} shortly.`, 'success');
    // Reset form after delay
    setTimeout(() => {
      document.getElementById('fname').value = '';
      document.getElementById('fphone').value = '';
      document.getElementById('fconcern').value = '';
      document.getElementById('fmsg').value = '';
      btn.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.opacity = '';
      btn.style.background = '';
      note.textContent = '';
    }, 5000);
  }, 1200);
}

function showNote(el, message, type) {
  el.textContent = message;
  el.className = 'form-note ' + type;
}

// ---- Stagger hero animations on load ----
window.addEventListener('load', () => {
  document.querySelectorAll('.animate-up').forEach((el, i) => {
    if (!el.style.animationDelay) {
      el.style.animationDelay = `${0.15 + i * 0.15}s`;
    }
  });
});

// ---- Active nav link highlighting ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));
