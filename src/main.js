import "./style.css";
import initParticles from "./particles.js";
import { initScrolltracker } from "./scrollTracker.js";

initParticles("#particles-js", "/particles.json", () => {
  console.log("particles.js inizializzato");
  initScrolltracker();
});

// NAV STYLE
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".nav-item");

  function setActiveItem(targetItem) {
    items.forEach((item) => {
      // inactive state
      item.classList.remove(
        "text-white",
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
    // active state
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

  // setActiveItem onClick listener
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      setActiveItem(item);
    });
  });
});

// EXPIRIENCE / EDUCATION COMPONENT

const headerBtn = document.querySelectorAll(".swap-btn");
const swapContainer = document.querySelector(".swap-grid");
const textContent = Array.from(document.querySelectorAll(".swap-content"));
const trackerEdu = swapContainer.children[0];
const trackerExp = swapContainer.children[1];

function setActiveBtn(targetBtn) {
  headerBtn.forEach((btn) => {
    // inactive state
    btn.classList.remove("bg-[#2A3259]", "rounded-full", "p-2");
  });
  // active state
  targetBtn.classList.add("bg-[#2A3259]", "rounded-full", "p-2");
}

// setActiveBtn onClick listener
headerBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveBtn(btn);
  });
});

// SWAP ED / EXP CONTENT

function swapTextContent(targetId) {
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
