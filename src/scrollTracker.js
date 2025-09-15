import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

export function initScrolltracker() {
  const tracker = document.getElementById("scroll-tracker");
  if (!tracker) return;

  tracker.style.overflow = "hidden";

  let fill = document.querySelector(".scroll-fill");
  if (!fill) {
    fill = document.createElement("div");
    fill.className = ".scroll-fill";
    tracker.prepend(fill);
  }

  Object.assign(fill.style, {
    position: "absolute",
    left: "0",
    right: "0",
    top: "0",
    height: "0%",
    background: "oklch(72.3% 0.219 149.579)",
    zIndex: "0",
    pointerEvents: "none",
    borderRadius: "999px",
  });

  gsap.to(fill, {
    height: "100%",
    ease: "none",
    scrollTrigger: {
      start: "top top",
      end: "bottom bottom",
      scrub: 0.7,
    },
  });
}
