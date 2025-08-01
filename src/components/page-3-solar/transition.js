export async function initSolarSystem() {
    const response = await fetch("/src/components/page-3-solar/planetPositions.json");
  const planetPositions = await response.json();

  const sun = document.querySelector(".system__button.solar");
  if (!sun) return;

  const isDesktop = window.matchMedia("(min-width: 1280px)").matches;
  const { sun: sunPositions, planets: planetConfigs } = isDesktop
    ? planetPositions.desktop
    : planetPositions.mobile;

  const planets = planetConfigs.map((config) => ({
    element: document.querySelector(`.system__button.${config.name}`),
    targetTop: config.targetTop,
    targetLeft: config.targetLeft,
  }));

  const sunInitialTop = sunPositions.initialTop;
  const sunTargetTop = sunPositions.targetTop;

  sun.style.position = "absolute";
  sun.style.top = `${sunInitialTop}%`;
  sun.style.left = "50%";
  sun.style.transform = "translate(-50%, 0)";
  sun.style.transition = "transform 0.5s ease-out, opacity 0.5s ease-out";
  sun.style.opacity = "1";
  sun.style.willChange = "transform";

  planets.forEach((planet) => {
    if (planet.element) {
      planet.startTop = 450;
      planet.startLeft = 30;
      planet.element.style.position = "absolute";
      planet.element.style.top = "0";
      planet.element.style.left = "50%";
      planet.element.style.transform = "translate(-50%, 0)";
      planet.element.style.willChange = "transform";
      planet.element.style.transition =
        "transform 0.5s ease-out, opacity 0.5s ease-out";
      planet.element.style.opacity = "1";
    }
  });

  const handleResize = () => {
    const newIsDesktop = window.matchMedia("(min-width: 1280px)").matches;
    if (newIsDesktop !== isDesktop) {
      window.location.reload();
    }
  };

  let lastScrollTime = 0;
  const THROTTLE_DELAY = 16;

  const updatePositions = (scrollY) => {
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(scrollY / maxScroll, 1); // window.scrollY

    const currentSunTop =
      sunInitialTop - (sunInitialTop - sunTargetTop) * scrollProgress;
    sun.style.transform = `translate(-50%, ${currentSunTop}%)`;

    planets.forEach((planet) => {
      if (!planet.element) return;

      const currentTop =
        planet.startTop + (planet.targetTop - planet.startTop) * scrollProgress;
      const currentLeft =
        planet.targetLeft * scrollProgress +
        (1 - scrollProgress) * planet.startLeft;
      planet.element.style.transform = `translate(calc(${currentLeft}vw - 50%), ${currentTop}vh)`;
    });
  };

  const handleScroll = () => {
    const now = new Date().getTime();
    if (now - lastScrollTime >= THROTTLE_DELAY) {
      updatePositions(window.scrollY);
      lastScrollTime = now;
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleResize);

  updatePositions(window.scrollY);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
  };
}

export function lightStars() {
  const stars = document.querySelectorAll(".shooting-star");

  stars.forEach((star) => {
    function animateStar() {
      const pageHeight = document.documentElement.scrollHeight;
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * pageHeight;
      const endX = startX - 1200;
      const endY = startY + 1200;

      gsap.set(star, { x: startX, y: startY, opacity: 1 });
      gsap.to(star, {
        x: endX,
        y: endY,
        opacity: 0,
        duration: 4 + Math.random(),
        ease: "power2.out",
        onComplete: animateStar,
      });
    }

    animateStar();
  });
}
