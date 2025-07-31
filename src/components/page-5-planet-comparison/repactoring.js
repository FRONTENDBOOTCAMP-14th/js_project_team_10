// planet-comparison.js (리팩토링 버전)

gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();
const mmover = gsap.matchMedia();
const planetContents = document.querySelector(".planet__contents");

let planets = gsap.utils.toArray(".planet__contents .planet");

// === 공통 유틸 ===
function centerPlanet(selector) {
  const el = document.querySelector(selector);
  const rect = el.getBoundingClientRect();
  const planetCenter = rect.left + rect.width / 2;
  const viewportCenter = window.innerWidth / 2;
  return Math.floor(-(planetCenter - viewportCenter));
}

function centerPlanetRatio(selector, ratio = 1) {
  return centerPlanet(selector) * ratio;
}

function classAdd(selector, className) {
  const el = document.querySelector(selector);
  if (el) el.classList.add(className);
}

function classRemove(selector, className) {
  const el = document.querySelector(selector);
  if (el) el.classList.remove(className);
}

// === 크기 비율 기준 설정 ===
const SCALE_FACTOR = 0.04; // 전체 크기 축소 계수

const planetScales = {
  mercury: 1,
  mars: 1.25,
  venus: 2.25,
  earth: 2.7,
  neptune: 9.75,
  uranus: 10,
  saturn: 23.5,
  jupiter: 28,
  sun: 272.5,
};

Object.entries(planetScales).forEach(([name, scale]) => {
  gsap.set(`.${name}`, {
    scale: scale * SCALE_FACTOR,
    transformOrigin: "bottom left",
  });
});

// 태양 추가 셋업
gsap.set(".sun", {
  y: -2000,
  x: -6000,
  opacity: 0,
});

gsap.set(".sun p", { opacity: 0 });

// === 행성 회전 ===
gsap.to(".planet img", {
  scrollTrigger: {
    trigger: ".mercury",
    start: "top top",
    end: "center center",
    toggleActions: "play pause play pause",
    containerAnimation: gsap.to(planets, {
      scrollTrigger: {
        trigger: ".page_5-container",
        start: "top top",
        end: `+=${planets.length * 1000}`,
        pin: true,
        scrub: true,
      },
    }),
  },
  rotation: 360,
  repeat: -1,
  duration: 30,
  ease: "none",
});

// === 모바일 ===
mm.add("(max-width: 1279px)", () => {
  gsap.set(".planet__contents", { scale: 0.5 });
  const tlMobile = gsap.timeline();

  tlMobile
    .to(".title", { x: centerPlanet(".title"), duration: 2 })
    .to(".planet__contents", { x: -1500, scale: 0.3, duration: 2 });

  ScrollTrigger.create({
    trigger: ".page_5-container",
    start: "top top",
    end: "+=6000",
    scrub: 0.5,
    animation: tlMobile,
  });
});

// === 데스크탑 ===
mmover.add("(min-width: 1280px)", () => {
  gsap.set(".planet__contents", { scale: 1 });

  const tl = gsap.timeline();

  tl.to(".planet__contents", { x: centerPlanet(".title"), duration: 2 })
    .to(".planet__contents", {
      x: centerPlanet(".mercury"),
      duration: 2,
      onStart: () => classAdd(".mercury", "is-active"),
      onComplete: () => classRemove(".mercury", "is-active"),
    })
    .to(".planet__contents", {
      x: centerPlanetRatio(".mars", 0.9),
      scale: 0.9,
      duration: 2,
      onStart: () => classAdd(".mars", "is-active"),
    })
    .to(".planet__contents", {
      x: centerPlanetRatio(".venus", 0.6),
      scale: 0.7,
      duration: 2,
    })
    .to(".planet__contents", {
      x: centerPlanetRatio(".earth", 0.5),
      scale: 0.6,
      duration: 2,
    })
    .to(".planet__contents", {
      x: centerPlanetRatio(".neptune", 0.3),
      scale: 0.4,
      duration: 2,
    })
    .to(".planet__contents", {
      x: centerPlanetRatio(".uranus", 0.25),
      scale: 0.3,
      duration: 2,
    })
    .to(".planet__contents", {
      x: centerPlanetRatio(".saturn", 0.15),
      scale: 0.2,
      duration: 2,
    })
    .to(".planet__contents", {
      x: centerPlanetRatio(".jupiter", 0.12),
      scale: 0.1,
      duration: 2,
    })
    .to(".planet__contents", {
      x: centerPlanetRatio(".sun", 0.05),
      scale: 0.04,
      duration: 2,
    })
    .to(".sun", { y: -500, opacity: 1, duration: 2 })
    .to(".sun p", { opacity: 1, duration: 2 })
    .to(".sun img", { rotation: 360, duration: 2 });

  ScrollTrigger.create({
    trigger: ".page_5-container",
    start: "top top",
    end: `+=${planets.length * 1200}`,
    scrub: 0.3,
    animation: tl,
  });
});
