const links = document.querySelectorAll('.main-nav a');
const sections = Array.from(document.querySelectorAll('main section[id]'));

links.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetId = link.getAttribute('href')?.slice(1);
    const section = targetId ? document.getElementById(targetId) : null;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

function syncActiveNav() {
  let currentId = '';
  sections.forEach((section) => {
    const top = section.offsetTop;
    if (window.scrollY >= top - 180) {
      currentId = section.id;
    }
  });

  links.forEach((link) => {
    const id = link.getAttribute('href')?.slice(1);
    link.classList.toggle('active', id === currentId);
  });
}

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealItems.forEach((item) => revealObserver.observe(item));
window.addEventListener('scroll', syncActiveNav);
window.addEventListener('load', syncActiveNav);
