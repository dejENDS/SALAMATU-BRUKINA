// Smooth scrolling for navigation links
// document.querySelectorAll('nav a').forEach(anchor => {
//   anchor.addEventListener('click', function (e) {
//     e.preventDefault();

//     document.querySelector(this.getAttribute('href')).scrollIntoView({
//       behavior: 'smooth'
//     });
//   });
// });

// Toggle active class on navigation links based on scroll position
window.addEventListener('scroll', function () {
  const navLinks = document.querySelectorAll('nav a');
  const currentSection = window.scrollY + 300;

  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section.offsetTop <= currentSection && section.offsetTop + section.offsetHeight > currentSection) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});