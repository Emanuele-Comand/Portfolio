import "./style.css";
import initParticles from "./particles.js";
import { initScrolltracker } from "./scrollTracker.js";
import animateIntro from "./introAnimation.js";

document.addEventListener("DOMContentLoaded", () => {
  animateIntro()
    .then(() => {
      initParticles("#particles-js", "/particles.json", () => {
        initScrolltracker();
      });
    })
    .catch((err) => {
      console.error("Errore animateIntro:", err);
      initParticles("#particles-js", "/particles.json", () => {
        initScrolltracker();
      });
    });

  // NAV STYLE
  const items = document.querySelectorAll(".nav-item");

  function setActiveItem(targetItem) {
    items.forEach((item) => {
      item.classList.remove(
        "text-white",
        "pl-8",
        "py-1",
        "before:content-['']",
        "before:absolute",
        "before:left-0",
        "before:top-1/2",
        "before:-translate-y-1/2",
        "before:w-4",
        "before:h-1",
        "before:rounded-full",
        "before:bg-green-500"
      );
      item.classList.add("text-white/30");
    });
    targetItem.classList.remove("text-white/30", "before:opacity-0");
    targetItem.classList.add(
      "text-white",
      "pl-8",
      "py-1",
      "duration-300",
      "before:content-['']",
      "before:absolute",
      "before:left-0",
      "before:top-1/2",
      "before:-translate-y-1/2",
      "before:w-4",
      "before:h-1",
      "before:rounded-full",
      "before:bg-green-500",
      "before:opacity-100"
    );
  }

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      setActiveItem(item);
    });
  });

  // EXP/ED swap
  const headerBtn = document.querySelectorAll(".swap-btn");
  const swapContainer = document.querySelector(".swap-grid");
  const textContent = Array.from(document.querySelectorAll(".swap-content"));
  if (swapContainer) {
    const trackerEdu = swapContainer.children[0];
    const trackerExp = swapContainer.children[1];

    function setActiveBtn(targetBtn) {
      headerBtn.forEach((btn) => {
        btn.classList.remove("bg-[#2A3259]", "rounded-full", "p-2");
      });
      targetBtn.classList.add("bg-[#2A3259]", "rounded-full", "p-2");
    }

    headerBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        setActiveBtn(btn);
      });
    });

    function swapTextContent(targetId) {
      if (!textContent.length) return;
      if (targetId === "education") {
        textContent[0].classList.remove("hidden");
        textContent[1].classList.add("hidden");
        trackerEdu.classList.remove("hidden");
        trackerEdu.classList.add("flex");
        trackerExp.classList.add("hidden");
        trackerExp.classList.remove("flex");
      } else if (targetId === "experience") {
        textContent[1].classList.remove("hidden");
        textContent[0].classList.add("hidden");
        trackerExp.classList.remove("hidden");
        trackerExp.classList.add("flex");
        trackerEdu.classList.add("hidden");
        trackerEdu.classList.remove("flex");
      }
    }

    if (!textContent[0].classList.contains("hidden")) {
      swapTextContent("education");
    } else {
      swapTextContent("experience");
    }

    headerBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        setActiveBtn(btn);
        swapTextContent(btn.id);
      });
    });
  }

  // MAIN CONTAINER SCROLL WITH NAV
  document.querySelectorAll('nav a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      const id = this.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});

// Responsive Nav menu
(function () {
  const hamburger = document.getElementById("hamburgerBtn");
  const sidebar = document.getElementById("mobileSidebar");
  const overlay = document.getElementById("mobileMenuOverlay");
  const closeBtn = document.getElementById("closeMenuBtn");

  function openMenu() {
    sidebar.classList.remove("translate-x-full");
    sidebar.classList.add("translate-x-0");
    overlay.classList.remove("opacity-0", "pointer-events-none");
    overlay.classList.add("opacity-100");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    sidebar.classList.remove("translate-x-0");
    sidebar.classList.add("translate-x-full");
    overlay.classList.remove("opacity-100");
    overlay.classList.add("opacity-0", "pointer-events-none");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  hamburger && hamburger.addEventListener("click", openMenu);
  closeBtn && closeBtn.addEventListener("click", closeMenu);
  overlay && overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();
