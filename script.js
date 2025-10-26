// Toggle mobile menu
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });
}

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu && navToggle) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }
  }
});

// Form submission
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // In a real application, you would send this data to a server
    // For this example, we'll just show an alert
    alert(`Terima kasih ${name}! Pesan Anda telah berhasil dikirim.`);

    // Reset form
    contactForm.reset();
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
});

// Animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".portfolio-item:not(.hidden-portfolio), .skill-icon-item, .contact-item",
  );

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (elementPosition < screenPosition) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

// Portfolio Show More Functionality
function initPortfolioShowMore() {
  const showMoreBtn = document.getElementById("showMoreBtn");
  const hiddenPortfolios = document.querySelectorAll(".hidden-portfolio");
  let isExpanded = false;

  console.log("Debug: Show More Button:", showMoreBtn);
  console.log("Debug: Hidden portfolios:", hiddenPortfolios.length);

  if (showMoreBtn && hiddenPortfolios.length > 0) {
    showMoreBtn.addEventListener("click", function () {
      console.log("Debug: Button clicked, current state:", isExpanded);

      if (!isExpanded) {
        // Show all portfolios
        hiddenPortfolios.forEach((portfolio) => {
          portfolio.style.display = "block";

          void portfolio.offsetWidth;
          portfolio.classList.add("visible");
          portfolio.style.opacity = "1";
          portfolio.style.transform = "translateY(0)";
        });

        showMoreBtn.innerHTML =
          '<span>Close</span><i class="fas fa-chevron-up"></i>';
        showMoreBtn.classList.add("expanded");
        isExpanded = true;
      } else {
        // Hide additional portfolios
        hiddenPortfolios.forEach((portfolio) => {
          portfolio.classList.remove("visible");
          portfolio.style.opacity = "0";
          portfolio.style.transform = "translateY(20px)";

          setTimeout(() => {
            portfolio.style.display = "none";
          }, 500);
        });

        showMoreBtn.innerHTML =
          '<span>See More</span><i class="fas fa-chevron-down"></i>';
        showMoreBtn.classList.remove("expanded");
        isExpanded = false;

        // Scroll back to portfolio section
        setTimeout(() => {
          const portfolioSection = document.getElementById("portfolio");
          if (portfolioSection) {
            portfolioSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 300);
      }
    });

    console.log(
      "Debug: Portfolio Show More functionality initialized successfully",
    );
  } else {
    console.warn("Debug: Show More button or hidden portfolios not found");
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("Debug: DOM Content Loaded");

  // Set initial state for animation
  const elements = document.querySelectorAll(
    ".portfolio-item:not(.hidden-portfolio), .skill-icon-item, .contact-item",
  );

  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  // Trigger animation on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Trigger once on load in case elements are already in view
  animateOnScroll();

  // Initialize portfolio show more functionality
  initPortfolioShowMore();
});

// Fallback initialization jika DOMContentLoaded sudah lewat
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPortfolioShowMore);
} else {
  initPortfolioShowMore();
}
document.getElementById("showMoreBtn").click();

// Data slider untuk semua popup
const sliders = {};
const totalSlidesArray = [3, 3, 2, 2, 2, 6, 4, 2]; // jumlah slide tiap slider

for (let i = 1; i <= 8; i++) {
  sliders[`slider${i}`] = {
    currentIndex: 0,
    totalSlides: totalSlidesArray[i - 1],
  };
}

// Fungsi untuk membuka popup
function openPopup(popupId) {
  document.getElementById(popupId).style.display = "flex";
  // Reset slider ke slide pertama saat popup dibuka
  const sliderNum = popupId.replace("popup", "");
  const sliderId = `slider${sliderNum}`;
  goToSlide(sliderId, 0);
}

// Fungsi untuk menutup popup
function closePopup(popupId) {
  document.getElementById(popupId).style.display = "none";
}

// Fungsi slider
function updateSlider(sliderId) {
  const slider = document.getElementById(sliderId);
  const sliderData = sliders[sliderId];
  const translateX = -sliderData.currentIndex * 100;
  slider.style.transform = `translateX(${translateX}%)`;

  // Update dots
  const sliderNum = sliderId.replace("slider", "");
  const dots = document.getElementById(`dots${sliderNum}`).children;
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.toggle("active", i === sliderData.currentIndex);
  }
}

function nextSlide(sliderId) {
  const sliderData = sliders[sliderId];
  sliderData.currentIndex =
    (sliderData.currentIndex + 1) % sliderData.totalSlides;
  updateSlider(sliderId);
}

function prevSlide(sliderId) {
  const sliderData = sliders[sliderId];
  sliderData.currentIndex =
    (sliderData.currentIndex - 1 + sliderData.totalSlides) %
    sliderData.totalSlides;
  updateSlider(sliderId);
}

function goToSlide(sliderId, index) {
  const sliderData = sliders[sliderId];
  sliderData.currentIndex = index;
  updateSlider(sliderId);
}

// Menutup popup ketika mengklik di luar konten
window.onclick = function (event) {
  if (event.target.classList.contains("popup-overlay")) {
    event.target.style.display = "none";
  }
};

// Menutup popup dengan tombol ESC
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const popups = document.querySelectorAll(".popup-overlay");
    popups.forEach((popup) => {
      popup.style.display = "none";
    });
  }
});
