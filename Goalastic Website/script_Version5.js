// Read more demo
document.querySelectorAll('.read-more').forEach(btn => {
  btn.addEventListener('click', function() {
    alert("This is a demo. Replace with your news article details or modal popup.");
  });
});

// Smooth scroll for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const id = this.getAttribute('href').slice(1);
    const section = document.getElementById(id);
    if (section) {
      window.scroll({
        top: section.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// Animated nav underline
const nav = document.querySelector('nav');
const underline = document.querySelector('.nav-underline');
const navLinks = document.querySelectorAll('nav ul li a');

function setUnderline(el) {
  if (!el) {
    underline.style.width = 0;
    return;
  }
  underline.style.left = el.offsetLeft + "px";
  underline.style.width = el.offsetWidth + "px";
}

navLinks.forEach(link => {
  link.addEventListener('mouseenter', e => setUnderline(link));
  link.addEventListener('focus', e => setUnderline(link));
});
nav.addEventListener('mouseleave', () => setUnderline(null));

// Set underline to active section on scroll
window.addEventListener('scroll', () => {
  let found = false;
  navLinks.forEach(link => {
    const sec = document.getElementById(link.getAttribute('href').slice(1));
    if (sec) {
      const rect = sec.getBoundingClientRect();
      if (!found && rect.top < 100 && rect.bottom > 100) {
        setUnderline(link);
        found = true;
      }
    }
  });
  if (!found) setUnderline(null);
});

// Reveal animations for teams and players
function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 350) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
});

// Football scroll animation
const football = document.getElementById('footballImg');
if (football) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight ? scrollTop / docHeight : 0;
    const maxX = window.innerWidth - 60; // 60px padding from right
    const ballX = scrollPercent * maxX;
    const rotation = scrollPercent * 360 * 4;
    football.style.transform = `translateX(${ballX}px) rotate(${rotation}deg)`;
  });
}