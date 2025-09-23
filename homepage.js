document.addEventListener("DOMContentLoaded", () => {
  // Get current year for footer
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  
  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("nav-menu");
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      const isExpanded = navMenu.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", isExpanded);
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
  
  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  const htmlElement = document.documentElement;
  
  if (themeToggle) {
    const themeIcon = themeToggle.querySelector("i");
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem("theme") || "light";
    htmlElement.setAttribute("data-theme", currentTheme);
    updateThemeIcon(themeIcon, currentTheme);
    
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      htmlElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(themeIcon, newTheme);
    });
  }
  
  function updateThemeIcon(themeIcon, theme) {
    if (themeIcon) {
      if (theme === "dark") {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
      } else {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
      }
    }
  }
  
  // Back to top button
  const backToTopButton = document.getElementById("backToTop");
  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
    });
    
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
  
  // Tutorial button
  const tutorialBtn = document.getElementById("tutorialbtn");
  if (tutorialBtn) {
    tutorialBtn.addEventListener("click", () => {
      window.location.href = "https://shakeeb-sa.github.io/tutorials/";
    });
  }
  
  // Tool buttons functionality
  
  
  buttons.forEach(({ id, url }) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", () => {
        window.open(url, "_blank", "noopener,noreferrer");
      });
    }
  });
  
  // Handle Guestbook Extractor button separately (due to duplicate ID issue)
  const guestbookBtn = document.querySelector("#seo-tools .tool-card:nth-child(3) .btn");
  if (guestbookBtn) {
    guestbookBtn.addEventListener("click", () => {
      window.open("http://shakeeb-sa.github.io/guestbook-extractor-chrome-extension/", "_blank", "noopener,noreferrer");
    });
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
});
