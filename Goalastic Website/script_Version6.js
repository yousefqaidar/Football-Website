// Hamburger menu toggle
const menuBtn = document.getElementById('menuBtn');
const sideNav = document.getElementById('sideNav');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  if(menuOpen) {
    sideNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    sideNav.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Close nav when clicking outside
document.body.addEventListener('click', function(e) {
  if (menuOpen && !sideNav.contains(e.target) && !menuBtn.contains(e.target)) {
    sideNav.classList.remove('open');
    document.body.style.overflow = '';
    menuOpen = false;
  }
}, true);

// Animated hamburger icon
menuBtn.addEventListener('mousedown', () => {
  menuBtn.querySelectorAll('span')[1].style.width = '20px';
});
menuBtn.addEventListener('mouseup', () => {
  menuBtn.querySelectorAll('span')[1].style.width = '';
});