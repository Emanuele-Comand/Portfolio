import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

export function initScrolltracker() {
  const tracker = document.getElementById("scroll-tracker");
  if (!tracker) return;

  const scroller = document.querySelector("main");
  if (!scroller) {
    console.warn("main non trovato");
  }

  tracker.style.overflow = "hidden";

  let fill = document.querySelector(".scroll-fill");
  if (!fill) {
    fill = document.createElement("div");
    fill.className = "scroll-fill";
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

  ScrollTrigger.getAll().forEach((st) => st.kill());

  const st = ScrollTrigger.create({
    scroller: scroller,
    trigger: scroller,
    start: "top top",
    end: () => scroller.scrollHeight - scroller.clientHeight,
    scrub: 0.7,
    onUpdate: (self) => {
      const prog = Number.isFinite(self.progress) ? self.progress : 0;
      fill.style.height = `${(prog * 100).toFixed(3)}%`;
    },
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
  window.addEventListener("resize", () => ScrollTrigger.refresh());
}
