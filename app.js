document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 1500);

  initParallax();
  initScrollReveal();
  initNavigation();
  initParticles();
  initStatCounters();
  initLightbox();
});

function initParallax() {
  const parallaxLayers = document.querySelectorAll(".parallax-layer");
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    parallaxLayers.forEach((layer) => {
      const speed = parseFloat(layer.dataset.speed) || 0.02;
      const xMove = x * 100 * speed;
      const yMove = y * 100 * speed;
      layer.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
  });
}

function initScrollReveal() {
  const reveals = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right",
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("active");
          }, index * 50);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );
  reveals.forEach((reveal) => observer.observe(reveal));
}

function initNavigation() {
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavClose = document.getElementById("mobileNavClose");
  const mobileLinks = mobileNav.querySelectorAll("a");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    mobileNav.classList.add("active");
  });

  mobileNavClose.addEventListener("click", () => {
    navToggle.classList.remove("active");
    mobileNav.classList.remove("active");
  });

  mobileLinks.forEach((link, index) => {
    link.style.transitionDelay = `${index * 0.1}s`;
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      mobileNav.classList.remove("active");
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function initParticles() {
  const container = document.getElementById("heroParticles");
  if (!container) return;
  const colors = ["#6366f1", "#ec4899", "#06b6d4", "#8b5cf6"];
  for (let i = 0; i < 40; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: particleFloat ${
              Math.random() * 10 + 10
            }s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
          `;
    container.appendChild(particle);
  }
  const style = document.createElement("style");
  style.textContent = `
          @keyframes particleFloat {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(${Math.random() * 50 - 25}px, ${
              Math.random() * 50 - 25
            }px) scale(1.1); }
            50% { transform: translate(${Math.random() * 50 - 25}px, ${
              Math.random() * 50 - 25
            }px) scale(0.9); }
            75% { transform: translate(${Math.random() * 50 - 25}px, ${
              Math.random() * 50 - 25
            }px) scale(1.05); }
          }
        `;
  document.head.appendChild(style);
}

function initStatCounters() {
  const stats = document.querySelectorAll(".stat-number");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const count = parseInt(target.dataset.count);
          animateCount(target, count);
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.5 },
  );
  stats.forEach((stat) => observer.observe(stat));
}

function animateCount(element, target) {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + "+";
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + "+";
    }
  }, 25);
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxImage = document.getElementById("lightboxImage");
  const showcaseItems = document.querySelectorAll(".showcase-item");

  showcaseItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector(".showcase-image");
      if (img) {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      lightbox.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}
