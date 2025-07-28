import planetPositions from './planetPositions.json';

export function initSolarSystem() {
  const sun = document.querySelector(".system__button.solar");
  if (!sun) return;

  const isDesktop = window.matchMedia("(min-width: 1280px)").matches;
  const { sun: sunPositions, planets: planetConfigs } = isDesktop 
    ? planetPositions.desktop 
    : planetPositions.mobile;

  const planets = planetConfigs.map(config => ({
    element: document.querySelector(`.system__button.${config.name}`),
    targetTop: config.targetTop,
    targetLeft: config.targetLeft
  }));

  const sunInitialTop = sunPositions.initialTop;
  const sunTargetTop = sunPositions.targetTop;

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

  const handleResize = () => {
    const newIsDesktop = window.matchMedia("(min-width: 1280px)").matches;
    if (newIsDesktop !== isDesktop) {
      window.location.reload();
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(scrollY / maxScroll, 1);
    
    const currentSunTop = sunInitialTop - (sunInitialTop - sunTargetTop) * scrollProgress;
    sun.style.top = `${currentSunTop}%`;

    planets.forEach((planet) => {
      if (!planet.element) return;

      const currentTop = planet.startTop + (planet.targetTop - planet.startTop) * scrollProgress;
      const currentLeft = planet.startLeft + (planet.targetLeft - planet.startLeft) * scrollProgress;

      planet.element.style.top = `${currentTop}%`;
      planet.element.style.left = `${currentLeft}%`;
    });
  };

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);

  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
  };
}
