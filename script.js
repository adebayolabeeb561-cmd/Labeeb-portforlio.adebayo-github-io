// ---------- 1. YOUR DETAILS: edit this part ----------
const CONFIG = {
  whatsappNumber: "+2349028295701", // 234 + your number WITHOUT the leading 0 (e.g. 0801 234 5678 becomes 2348012345678)
  email: "adebayolabeeb561@gmail.com",
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-username",
  // Leave a link as "" until the project is online. Paste the real URL when ready.
  projects: {
    tracker:    { demo: "", source: "" },
    calculator: { demo: "", source: "" },
    stopwatch:  { demo: "", source: "" },
    portfolio:  { demo: "", source: "" }
  }
};

// ---------- 2. Contact links ----------
const contactUrls = {
  whatsapp: "https://wa.me/" + CONFIG.whatsappNumber,
  email: "mailto: " + CONFIG.email,
  github: CONFIG.github,
  linkedin: CONFIG.linkedin
};

document.querySelectorAll("[data-contact]").forEach(function (link) {
  link.href = contactUrls[link.dataset.contact];
});

// ---------- 3. Project buttons ----------
const note = document.getElementById("note");

document.querySelectorAll("[data-project]").forEach(function (link) {
  const url = CONFIG.projects[link.dataset.project][link.dataset.kind];

  if (url) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
  } else {
    // No real link yet: show a friendly message instead of a dead link
    link.addEventListener("click", function (event) {
      event.preventDefault();
      note.textContent = "This link is not added yet. Add it in script.js under CONFIG.projects.";
    });
  }
});

// ---------- 4. Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", function () {
  const isOpen = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", function (event) {
  if (event.target.tagName === "A") {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// ---------- 5. Scroll reveal and progress bars ----------
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;

    entry.target.classList.add("visible");

    const bar = entry.target.querySelector("[data-progress]");
    if (bar) {
      bar.style.width = bar.dataset.progress + "%";
      bar.style.transform = "scaleX(1)";
    }
    observer.unobserve(entry.target); // animate once only
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(function (item) {
  observer.observe(item);
});

// ---------- 6. Glow that follows the pointer ----------
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const spotlight = document.getElementById("spotlight");

if (!reducedMotion) {
  window.addEventListener("pointermove", function (event) {
    spotlight.style.transform = "translate(" + event.clientX + "px, " + event.clientY + "px)";
  });
}

// ---------- 7. Contact form (opens your email app) ----------
document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;
  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(message);
  window.location.href = "mailto:" + CONFIG.email + "?subject=" + subject + "&body=" + body;
});

// ---------- 8. Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
