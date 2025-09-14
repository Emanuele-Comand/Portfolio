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
  if (!items.length) return;

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

  // onClick listener
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      setActiveItem(item);
    });
  });
});
