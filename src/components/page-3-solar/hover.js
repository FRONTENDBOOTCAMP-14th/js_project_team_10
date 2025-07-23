export function initHoverEffects() {
  const planetButtons = document.querySelectorAll(
    ".system__button:not(.solar)"
  );

  planetButtons.forEach((button) => {
    const img = button.querySelector("img");
    if (!img) return;

    const defaultSrc = img.getAttribute("data-default") || img.src;
    const hoverSrc = img.getAttribute("data-hover");

    if (!hoverSrc) return;

    button.addEventListener("mouseenter", () => {
      img.src = hoverSrc;
    });

    button.addEventListener("mouseleave", () => {
      img.src = defaultSrc;
    });
  });
}
