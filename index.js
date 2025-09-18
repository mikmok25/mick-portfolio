document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar ul");
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenuIcon = document.getElementById("mobile-menu-icon");
  const mobileNav = document.getElementById("mobile-nav");
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const themeText = document.getElementById("theme-text");
  const body = document.body;

  let mobileMenuOpen = false;

  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuOpen = !mobileMenuOpen;

    if (mobileMenuOpen) {
      mobileNav.classList.add("active");
      mobileMenuIcon.className = "fas fa-times";
      mobileMenuToggle.style.transform = "rotate(180deg)";
    } else {
      mobileNav.classList.remove("active");
      mobileMenuIcon.className = "fas fa-bars";
      mobileMenuToggle.style.transform = "rotate(0deg)";
    }
  });

  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuOpen = false;
      mobileNav.classList.remove("active");
      mobileMenuIcon.className = "fas fa-bars";
      mobileMenuToggle.style.transform = "rotate(0deg)";
    });
  });

  document.addEventListener("click", (e) => {
    if (
      mobileMenuOpen &&
      !mobileNav.contains(e.target) &&
      !mobileMenuToggle.contains(e.target)
    ) {
      mobileMenuOpen = false;
      mobileNav.classList.remove("active");
      mobileMenuIcon.className = "fas fa-bars";
      mobileMenuToggle.style.transform = "rotate(0deg)";
    }
  });

  const savedTheme = localStorage.getItem("theme") || "light";
  body.setAttribute("data-theme", savedTheme);
  updateThemeToggle(savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeToggle(newTheme);
  });

  function updateThemeToggle(theme) {
    if (theme === "dark") {
      themeIcon.className = "fas fa-sun";
      themeText.textContent = "Light";
    } else {
      themeIcon.className = "fas fa-moon";
      themeText.textContent = "Dark";
    }
  }

  if (navbar) {
    navbar.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        const links = navbar.querySelectorAll("a");
        links.forEach((link) => link.classList.remove("active"));
        e.target.classList.add("active");
      }
    });
  }

  const resumeBtn = document.querySelector(".resume-btn");

  resumeBtn.addEventListener("click", function () {
    window.open(
      "https://drive.google.com/file/d/13CGjf8_ZlS3szx5NdPA9T1Vw9V2AX0VN/view?usp=sharing",
      "_blank"
    );
  });

  const footerText = document.querySelector(".footer-text");

  const contactForm = document.querySelector(".contact-form");
  const submitBtn = document.querySelector(".submit-btn");
  const formStatus = document.getElementById("form-status");
  const loadingMessage = document.getElementById("loading-message");
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      formStatus.style.display = "block";
      loadingMessage.style.display = "block";
      successMessage.style.display = "none";
      errorMessage.style.display = "none";
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          loadingMessage.style.display = "none";
          successMessage.style.display = "block";
          contactForm.reset();

          setTimeout(() => {
            formStatus.style.display = "none";
          }, 5000);
        } else {
          throw new Error("Form Submission failed");
        }
      } catch (error) {
        loadingMessage.style.display = "none";
        errorMessage.style.display = "block";

        setTimeout(() => {
          formStatus.style.display = "none";
        }, 5000);
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
  document.body.style.zoom = "80%";

  footerText.innerHTML = `Made by <span style="color: #737373">Mick Manuit &copy;${new Date().getFullYear()}`;

  // Event delegation for viewing resume
  // const resumeBtn = document.querySelector(".resume-btn");

  // resumeBtn.addEventListener("click", () => {
  //   window.open('./resume.pdf', '_blank');
  // });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".flex-container").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
});
