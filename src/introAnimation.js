import gsap from "gsap";

export function animateIntro({
  loaderSelector = "#intro",
  colSelector = ".intro-col",
  letterSelector = ".intro-letter",
  timeout = 15000,
} = {}) {
  return new Promise((resolve) => {
    const loader = document.querySelector(loaderSelector);
    if (!loader) {
      resolve();
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const cols = Array.from(loader.querySelectorAll(colSelector));
    const letters = Array.from(loader.querySelectorAll(letterSelector));

    if (!cols.length || !letters.length) {
      try {
        loader.remove();
      } catch (e) {}
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      resolve();
      return;
    }

    gsap.set(letters, { opacity: 0, y: 30 });
    gsap.set(cols, { yPercent: 0 });

    const tl = gsap.timeline();

    tl.to(letters, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.08,
    });

    tl.to({}, { duration: 0.8 });

    tl.to(cols, {
      yPercent: -100,
      duration: 0.6,
      ease: "power3.in",
      stagger: {
        each: 0.09,
        from: "start",
      },
    });

    tl.to(loader, {
      yPercent: -100,
      opacity: 0,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        try {
          loader.remove();
        } catch (e) {}
        html.style.overflow = prevHtmlOverflow;
        body.style.overflow = prevBodyOverflow;
        resolve();
      },
    });

    const safeguard = setTimeout(() => {
      if (document.querySelector(loaderSelector)) {
        try {
          document.querySelector(loaderSelector).remove();
        } catch (e) {}
      }
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      resolve();
    }, timeout);

    tl.eventCallback("onComplete", () => clearTimeout(safeguard));
  });
}

export default animateIntro;
