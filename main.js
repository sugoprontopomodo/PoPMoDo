// PO MO DO Pop V2 — main.js

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile burger menu
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Smooth-scroll offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-h')) || 72;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

// Intersection Observer: fade-in sections
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(sec => {
  sec.classList.add('fade-in');
  observer.observe(sec);
});

// Mobile tab bar active state
document.querySelectorAll('.mobile-tab-bar .tab-item').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.mobile-tab-bar .tab-item').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});

// Product jar size and price toggle
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    // Remove active from peers
    const parent = this.closest('.size-toggle');
    parent.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    // Update price
    const targetId = this.getAttribute('data-target');
    const priceDisplay = document.getElementById('price-' + targetId);
    if(priceDisplay) priceDisplay.textContent = this.getAttribute('data-price');

    // Update jar size
    const card = this.closest('.product-card');
    const jar = card.querySelector('.jar-dynamic');
    if (this.getAttribute('data-size') === '300g') {
      jar.classList.add('jar-large-state');
    } else {
      jar.classList.remove('jar-large-state');
    }
  });
});
