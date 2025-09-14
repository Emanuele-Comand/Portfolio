export default function initParticles(
  containerSelector,
  jsonPathOrOptions,
  cb
) {
  const id = (containerSelector || "").replace?.("#", "") ?? containerSelector;

  if (typeof particlesJS !== "undefined") {
    if (typeof jsonPathOrOptions === "string") {
      particlesJS.load(id, jsonPathOrOptions, () => {
        if (typeof cb === "function") cb();
      });
    } else if (typeof jsonPathOrOptions === "object") {
      particlesJS(id, jsonPathOrOptions);
      if (typeof cb === "function") cb();
    } else {
      console.warn(
        "initParticles: secondo argomento non valido (stringa o oggetto atteso)."
      );
    }
  } else {
    console.warn(
      "particles.js non trovato (includere la libreria prima di main.js)."
    );
  }
}
