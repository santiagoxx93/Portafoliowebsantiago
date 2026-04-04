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




  // --- 6. Contact Form (mailto via JS) ---
  const sendBtn = document.getElementById('send-email-btn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const name = document.getElementById('name').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !message) {
        alert('Por favor, completa todos los campos.');
        return;
      }
      
      const subject = encodeURIComponent(`Contacto desde Portafolio - ${name}`);
      const body = encodeURIComponent(`Hola Santiago,\n\nMi nombre es ${name}.\n\n${message}`);
      window.open(`mailto:santiagochez193@gmail.com?subject=${subject}&body=${body}`, '_blank');
    });
  }

});
