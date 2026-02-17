// ===== Smooth Navigation & Scrolling =====

document.querySelectorAll('.main-nav a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== Timeline Item Reveal on Scroll =====

const items = document.querySelectorAll('.timeline-item');
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Stagger animation by adding a delay based on position
      const index = Array.from(items).indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
    }
  });
}, observerOptions);

items.forEach(item => observer.observe(item));

// ===== Keyboard Navigation =====

const panels = Array.from(document.querySelectorAll('main .panel'));
let currentPanelIndex = 0;

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown' || e.key === 'j') {
    currentPanelIndex = Math.min(panels.length - 1, currentPanelIndex + 1);
    panels[currentPanelIndex].scrollIntoView({ behavior: 'smooth' });
  }
  if (e.key === 'ArrowUp' || e.key === 'k') {
    currentPanelIndex = Math.max(0, currentPanelIndex - 1);
    panels[currentPanelIndex].scrollIntoView({ behavior: 'smooth' });
  }
});

// ===== Smooth Scroll Behavior on Page Load =====

window.addEventListener('load', () => {
  if (window.location.hash) {
    const id = window.location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }
});

// ===== Add Active Link State =====

const navLinks = document.querySelectorAll('.main-nav a');

window.addEventListener('scroll', () => {
  let current = '';
  
  panels.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// ===== Portfolio Flipbook =====

document.querySelectorAll('.flipbook').forEach(flipbook => {
  const pages = Array.from(flipbook.querySelectorAll('.page'));
  const prevBtn = flipbook.querySelector('.flip-prev');
  const nextBtn = flipbook.querySelector('.flip-next');
  const currentEl = flipbook.querySelector('.flip-current');
  const totalEl = flipbook.querySelector('.flip-total');
  let currentIndex = 0;

  if (!pages.length) return;
  if (totalEl) totalEl.textContent = String(pages.length);

  const update = () => {
    pages.forEach((page, idx) => {
      page.classList.toggle('is-active', idx === currentIndex);
      page.classList.toggle('is-flipped', idx < currentIndex);
      if (idx < currentIndex) {
        page.style.zIndex = String(idx + 1);
      } else {
        page.style.zIndex = String(pages.length + (pages.length - idx));
      }
    });
    if (currentEl) currentEl.textContent = String(currentIndex + 1);
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === pages.length - 1;
  };

  const goNext = () => {
    if (currentIndex < pages.length - 1) {
      currentIndex += 1;
      update();
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      update();
    }
  };

  if (nextBtn) nextBtn.addEventListener('click', goNext);
  if (prevBtn) prevBtn.addEventListener('click', goPrev);

  const stage = flipbook.querySelector('.flipbook-stage');
  if (stage) {
    stage.addEventListener('click', () => {
      goNext();
    });
  }

  update();
});

// ===== 3D Cube Drag Interaction =====

const cube = document.getElementById('techCube');
if (cube) {
  let isDragging = false;
  let startX, startY;
  let currentRotationX = 0;
  let currentRotationY = 0;

  cube.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    cube.classList.add('dragging');
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    currentRotationY += deltaX * 0.5;
    currentRotationX -= deltaY * 0.5;
    
    cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
    
    startX = e.clientX;
    startY = e.clientY;
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      
      // Resume auto-rotation after 2 seconds
      setTimeout(() => {
        cube.classList.remove('dragging');
        cube.style.transform = '';
        currentRotationX = 0;
        currentRotationY = 0;
      }, 2000);
    }
  });

  // Touch support for mobile
  cube.addEventListener('touchstart', (e) => {
    isDragging = true;
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    cube.classList.add('dragging');
    e.preventDefault();
  });

  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    
    currentRotationY += deltaX * 0.5;
    currentRotationX -= deltaY * 0.5;
    
    cube.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
    
    startX = touch.clientX;
    startY = touch.clientY;
  });

  document.addEventListener('touchend', () => {
    if (isDragging) {
      isDragging = false;
      
      setTimeout(() => {
        cube.classList.remove('dragging');
        cube.style.transform = '';
        currentRotationX = 0;
        currentRotationY = 0;
      }, 2000);
    }
  });
}

// ===== Parallax Scroll Effects =====

let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  
  // Parallax shapes
  const shapes = document.querySelectorAll('.parallax-shape');
  shapes.forEach((shape, index) => {
    const speed = 0.3 + (index * 0.15);
    shape.style.transform = `translateY(${scrolled * speed}px)`;
  });
  
  // Section headers
  const headers = document.querySelectorAll('.panel h2');
  headers.forEach((header) => {
    const rect = header.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top < windowHeight && rect.bottom > 0) {
      const scrollProgress = (windowHeight - rect.top) / windowHeight;
      const translateY = Math.max(-30, -30 + (scrollProgress * 30));
      header.style.transform = `translateY(${translateY}px)`;
      header.style.opacity = Math.min(1, 0.5 + scrollProgress);
    }
  });
  
  // Project cards - subtle float effect
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top < windowHeight && rect.bottom > 0) {
      const center = rect.top + rect.height / 2;
      const distanceFromCenter = (windowHeight / 2) - center;
      const parallaxAmount = distanceFromCenter * 0.03;
      card.style.transform = `translateY(${parallaxAmount}px)`;
    }
  });
  
  ticking = false;
}

function requestParallaxUpdate() {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

window.addEventListener('scroll', requestParallaxUpdate);
window.addEventListener('load', updateParallax);

// Add parallax shapes to main sections
document.addEventListener('DOMContentLoaded', () => {
  const mainSections = ['about', 'experience', 'education', 'projects'];
  
  mainSections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      const bgDiv = document.createElement('div');
      bgDiv.className = 'parallax-bg';
      
      for (let i = 0; i < 3; i++) {
        const shape = document.createElement('div');
        shape.className = 'parallax-shape';
        bgDiv.appendChild(shape);
      }
      
      section.insertBefore(bgDiv, section.firstChild);
    }
  });
});