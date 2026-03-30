import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- 2. Intersection Observer (Fade-ins) ---
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  setTimeout(() => {
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }, 100);

  // --- 3. Typing Effect ---
  const phrases = ["Desarrollador Full-Stack", "Entusiasta de Vue.js y PHP", "Resolviendo problemas con código", "TSU en Informática"];
  const typeTarget = document.getElementById('typewriter');
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typeTarget.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typeTarget.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 100;

    // Pause at the end of the phrase
    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }
  
  // Only start typing if element exists
  if (typeTarget) {
    setTimeout(typeEffect, 500);
  }



  // --- 5. 3D Tilt Effect for Project Cards ---
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Only apply hover tilt on non-touch devices
    if (window.matchMedia("(min-width: 768px)").matches) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        // Get mouse position relative to the card's center
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Calculate rotation degrees (divisor controls intensity)
        const rotateX = (-y / 15).toFixed(2);
        const rotateY = (x / 20).toFixed(2);
        
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'none'; // prevent snappy jumps while moving
      });

      card.addEventListener('mouseleave', () => {
        // Reset transformation when mouse leaves
        card.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
      });
      
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none'; // remove transition for buttery smooth tracking immediately
      });
    }
  });

});
