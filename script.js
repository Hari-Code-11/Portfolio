const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("is-open");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
    });
  });
}

const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);

  if (!themeToggle) return;
  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-checked", String(isDark));
  themeToggle.classList.toggle("is-dark", isDark);

  const labelEl = themeToggle.querySelector(".toggle-label");
  if (labelEl) labelEl.textContent = isDark ? "Dark" : "Light";
}

function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") {
    setTheme(saved);
    return;
  }

  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme || "light";
    setTheme(current === "dark" ? "light" : "dark");
  });
}

initTheme();

// Used by CSS to only apply scroll-reveal styles when JS is available.
document.documentElement.classList.add("js-enabled");

// Scroll reveal (adds `is-visible` when elements enter the viewport)
function initReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  // Always ensure a starting state in case CSS isn't loaded yet.
  revealEls.forEach((el, idx) => {
    el.style.transitionDelay = `${Math.min(idx, 12) * 70}ms`;
  });

  // Make sure above-the-fold content is visible immediately (avoids a flash).
  revealEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      el.classList.add("is-visible");
    }
  });

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

initReveal();
