export function initSolarSystem() {
  const sun = document.querySelector(".system__button.solar");

  if (!sun) {
    return;
  }

  const planets = [
    {
      element: document.querySelector(".system__button.mercury"),
      targetTop: 25,
      targetLeft: 20,
    },
    {
      element: document.querySelector(".system__button.venus"),
      targetTop: 32,
      targetLeft: 30,
    },
    {
      element: document.querySelector(".system__button.earth"),
      targetTop: 40,
      targetLeft: 50,
    },
    {
      element: document.querySelector(".system__button.mars"),
      targetTop: 48,
      targetLeft: 70,
    },
    {
      element: document.querySelector(".system__button.jupiter"),
      targetTop: 58,
      targetLeft: 60,
    },
    {
      element: document.querySelector(".system__button.saturn"),
      targetTop: 72,
      targetLeft: 20,
    },
    {
      element: document.querySelector(".system__button.uranus"),
      targetTop: 80,
      targetLeft: 50,
    },
    {
      element: document.querySelector(".system__button.neptune"),
      targetTop: 90,
      targetLeft: 70,
    },
  ];

  const sunInitialTop = 100;
  const sunTargetTop = -60;

  sun.style.top = `${sunInitialTop}%`;
  sun.style.transition = "all 0.5s ease-out";
  sun.style.opacity = "1";

  planets.forEach((planet) => {
    if (planet.element) {
      planet.startTop = 100;
      planet.startLeft = 50;

      planet.element.style.position = "absolute";
      planet.element.style.top = `${planet.startTop}%`;
      planet.element.style.left = `${planet.startLeft}%`;
      planet.element.style.transform = "translate(-50%, 0)";
      planet.element.style.transition = "all 0.5s ease-out";
      planet.element.style.opacity = "1";
    }
  });

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    let scrollProgress = Math.min(scrollY / maxScroll, 1);
    const currentSunTop =
      sunInitialTop - (sunInitialTop - sunTargetTop) * scrollProgress;
    sun.style.top = `${currentSunTop}%`;

    planets.forEach((planet) => {
      if (!planet.element) return;

      const currentTop =
        planet.startTop + (planet.targetTop - planet.startTop) * scrollProgress;
      const currentLeft =
        planet.startLeft +
        (planet.targetLeft - planet.startLeft) * scrollProgress;

      planet.element.style.top = `${currentTop}%`;
      planet.element.style.left = `${currentLeft}%`;
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}
