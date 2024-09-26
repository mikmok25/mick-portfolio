document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar ul");

  navbar.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      const links = navbar.querySelectorAll("a");
      links.forEach(link => link.classList.remove("active"));
      e.target.classList.add("active");
    }
  });

  const resumeBtn = document.querySelector('.resume-btn');

  resumeBtn.addEventListener('click', function () {
    window.open('./resume.pdf', '_blank');
  });

  const contactForm = document.querySelector(".contact-form");
  const footerText = document.querySelector(".footer-text");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  document.body.style.zoom="80%"

  footerText.innerHTML = `Made by <span style="color: #737373">Mick Manuit &copy;${new Date().getFullYear()}`;

  // Event delegation for viewing resume
  // const resumeBtn = document.querySelector(".resume-btn");

  // resumeBtn.addEventListener("click", () => {
  //   window.open('./resume.pdf', '_blank');
  // });
});
