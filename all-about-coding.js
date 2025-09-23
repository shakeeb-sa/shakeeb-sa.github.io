/**
 * All About Coding Website JavaScript
 * Handles theme switching, navigation, video filtering, sorting, and other interactive features
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize DOM elements
  const elements = {
    themeToggle: document.getElementById("themeToggle"),
    menuToggle: document.getElementById("menuToggle"),
    navMenu: document.getElementById("nav-menu"),
    backToTop: document.getElementById("back-to-top"),
    toast: document.getElementById("toast"),
    categoryNav: document.querySelector(".category-nav"),
    categoryLinks: document.querySelectorAll(".category-link"),
    saveButtons: document.querySelectorAll(".save-btn"),
    filterButtons: document.querySelectorAll(".filter-controls .control-btn"),
    sortButtons: document.querySelectorAll(".sort-controls .control-btn"),
    videoGrids: document.querySelectorAll(".video-grid"),
    videoSections: document.querySelectorAll(".video-section"),
    thumbnails: document.querySelectorAll(".video-thumbnail img"),
    navLinks: document.querySelectorAll('nav a[href^="#"]'),
  };

  // Initialize state
  const state = {
    savedTheme: localStorage.getItem("theme") || "light",
    savedVideos: JSON.parse(localStorage.getItem("savedVideos")) || [],
    activeSection: null,
  };

  // Initialize the application
  function init() {
    setupTheme();
    setupThumbnailErrorHandling();
    setupEventListeners();
    setupIntersectionObserver();
    setupKeyboardNavigation();
    updateSavedVideoButtons();
  }

  // Theme setup and handling
  function setupTheme() {
    if (state.savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }

  // Handle thumbnail loading errors with fallback
  function setupThumbnailErrorHandling() {
    elements.thumbnails.forEach((thumbnail) => {
      // Extract video ID if not already present
      if (!thumbnail.hasAttribute("data-video-id")) {
        const src = thumbnail.getAttribute("src");
        const match = src.match(/\/vi\/([^\/]+)\//);
        if (match) {
          thumbnail.setAttribute("data-video-id", match[1]);
        }
      }

      // Set error handler
      thumbnail.addEventListener("error", function () {
        handleThumbnailError(this);
      });

      // Check if image is already broken
      if (thumbnail.naturalWidth === 0) {
        handleThumbnailError(thumbnail);
      }
    });
  }

  // Handle thumbnail error with fallback images
  function handleThumbnailError(img) {
    const videoId = img.getAttribute("data-video-id");
    if (!videoId) return;

    // Get current thumbnail size from the URL
    const currentSrc = img.getAttribute("src");
    const currentSizeMatch = currentSrc.match(/\/([^\/]+)\.jpg$/);

    // If we can't determine the current size, start with maxresdefault
    if (!currentSizeMatch) {
      img.setAttribute(
        "src",
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      );
      return;
    }

    // Define thumbnail sizes in order of preference (highest to lowest quality)
    const thumbnailSizes = [
      "maxresdefault",
      "sddefault",
      "hqdefault",
      "mqdefault",
      "default",
    ];

    // Find the current size in the array
    const currentSize = currentSizeMatch[1];
    const currentIndex = thumbnailSizes.indexOf(currentSize);

    // Try the next size in the array
    if (currentIndex < thumbnailSizes.length - 1) {
      const nextSize = thumbnailSizes[currentIndex + 1];
      img.setAttribute(
        "src",
        `https://img.youtube.com/vi/${videoId}/${nextSize}.jpg`
      );
    } else {
      // All thumbnail sizes failed, use a placeholder
      img.onerror = null; // Prevent infinite loop
      const title = img.getAttribute("alt") || "Video";
      img.setAttribute(
        "src",
        `https://via.placeholder.com/320x180?text=${encodeURIComponent(title)}`
      );
    }
  }

  // Setup all event listeners
  function setupEventListeners() {
    // Theme toggle
    elements.themeToggle.addEventListener("click", toggleTheme);

    // Mobile menu toggle
    elements.menuToggle.addEventListener("click", toggleMobileMenu);

    // Back to top button
    window.addEventListener("scroll", handleScroll);
    elements.backToTop.addEventListener("click", scrollToTop);

    // Save video buttons
    elements.saveButtons.forEach((button) => {
      button.addEventListener("click", handleSaveVideo);
    });

    // Filter buttons
    elements.filterButtons.forEach((button) => {
      button.addEventListener("click", handleFilter);
    });

    // Sort buttons
    elements.sortButtons.forEach((button) => {
      button.addEventListener("click", handleSort);
    });

    // Navigation links for smooth scrolling
    elements.navLinks.forEach((link) => {
      link.addEventListener("click", handleNavClick);
    });

    // Category navigation links
    elements.categoryLinks.forEach((link) => {
      link.addEventListener("click", handleCategoryClick);
    });
  }

  // Toggle between light and dark theme
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      elements.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    showToast(`Switched to ${newTheme} mode`);
  }

  // Toggle mobile menu
  function toggleMobileMenu() {
    const isExpanded =
      elements.menuToggle.getAttribute("aria-expanded") === "true";

    elements.navMenu.classList.toggle("active");
    elements.menuToggle.setAttribute("aria-expanded", !isExpanded);

    if (!isExpanded) {
      elements.menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      elements.menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  }

  // Handle scroll events for back-to-top button
  function handleScroll() {
    if (window.pageYOffset > 300) {
      elements.backToTop.classList.add("visible");
    } else {
      elements.backToTop.classList.remove("visible");
    }
  }

  // Scroll to top of page
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Handle save video button clicks
  function handleSaveVideo(e) {
    const button = e.currentTarget;
    const videoCard = button.closest(".video-card");
    const videoTitle = videoCard.getAttribute("data-title");

    const isSaved = button.classList.contains("saved");

    if (isSaved) {
      // Remove from saved
      button.classList.remove("saved");
      button.innerHTML = '<i class="far fa-bookmark"></i><span>Save</span>';

      const index = state.savedVideos.indexOf(videoTitle);
      if (index > -1) {
        state.savedVideos.splice(index, 1);
      }

      showToast("Removed from saved videos");
    } else {
      // Add to saved
      button.classList.add("saved");
      button.innerHTML = '<i class="fas fa-bookmark"></i><span>Saved</span>';
      state.savedVideos.push(videoTitle);

      showToast("Saved for later");
    }

    localStorage.setItem("savedVideos", JSON.stringify(state.savedVideos));
  }

  // Update saved video buttons on page load
  function updateSavedVideoButtons() {
    elements.saveButtons.forEach((button) => {
      const videoCard = button.closest(".video-card");
      const videoTitle = videoCard.getAttribute("data-title");

      if (state.savedVideos.includes(videoTitle)) {
        button.classList.add("saved");
        button.innerHTML = '<i class="fas fa-bookmark"></i><span>Saved</span>';
      }
    });
  }

  // Handle filter button clicks
  function handleFilter(e) {
    const button = e.currentTarget;
    const filter = button.getAttribute("data-filter");
    const section = button.closest(".video-section");
    const videoCards = section.querySelectorAll(".video-card");

    // Update active button
    const filterControls = button.parentElement;
    filterControls.querySelectorAll(".control-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");

    // Filter videos
    videoCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Handle sort button clicks
  function handleSort(e) {
    const button = e.currentTarget;
    const sort = button.getAttribute("data-sort");
    const section = button.closest(".video-section");
    const videoGrid = section.querySelector(".video-grid");
    const videoCards = Array.from(section.querySelectorAll(".video-card"));

    // Update active button
    const sortControls = button.parentElement;
    sortControls.querySelectorAll(".control-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");

    // Sort videos based on selected criteria
    if (sort === "newest") {
      // Sort by views (descending) as a proxy for newest
      videoCards.sort((a, b) => {
        const viewsA = parseInt(
          a.querySelector(".video-meta span").textContent.replace(/[^\d]/g, "")
        );
        const viewsB = parseInt(
          b.querySelector(".video-meta span").textContent.replace(/[^\d]/g, "")
        );
        return viewsB - viewsA;
      });
    } else if (sort === "oldest") {
      // Sort by views (ascending) as a proxy for oldest
      videoCards.sort((a, b) => {
        const viewsA = parseInt(
          a.querySelector(".video-meta span").textContent.replace(/[^\d]/g, "")
        );
        const viewsB = parseInt(
          b.querySelector(".video-meta span").textContent.replace(/[^\d]/g, "")
        );
        return viewsA - viewsB;
      });
    }

    // Re-append sorted cards
    videoCards.forEach((card) => {
      videoGrid.appendChild(card);
    });
  }

  // Handle navigation link clicks for smooth scrolling
  function handleNavClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Close mobile menu if open
      if (elements.navMenu.classList.contains("active")) {
        toggleMobileMenu();
      }

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  // Handle category navigation clicks
  function handleCategoryClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Close mobile menu if open
      if (elements.navMenu.classList.contains("active")) {
        toggleMobileMenu();
      }

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Update active state
      elements.categoryLinks.forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    }
  }

  // Setup Intersection Observer for lazy loading and section highlighting
  function setupIntersectionObserver() {
    if ("IntersectionObserver" in window) {
      // Lazy loading for images
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
        img.classList.add("lazy");
        imageObserver.observe(img);
      });

      // Section highlighting in category nav
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const sectionId = entry.target.id;
              state.activeSection = sectionId;

              // Update active category link
              elements.categoryLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${sectionId}`) {
                  link.classList.add("active");
                }
              });
            }
          });
        },
        { threshold: 0.3 }
      );

      elements.videoSections.forEach((section) => {
        sectionObserver.observe(section);
      });
    }
  }

  // Setup keyboard navigation
  function setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      // Escape key to close mobile menu
      if (e.key === "Escape" && elements.navMenu.classList.contains("active")) {
        toggleMobileMenu();
      }
    });
  }

  // Show toast notification
  function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add("show");

    setTimeout(() => {
      elements.toast.classList.remove("show");
    }, 3000);
  }

  // Initialize the application
  init();
});
