gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();
const mmover = gsap.matchMedia();
const planetContents = document.querySelector(".planet__contents");

let planets = gsap.utils.toArray(".planet__contents .planet");
let scrollTween = gsap.to(planets, {
  scrollTrigger: {
    trigger: ".page_5-container",
    start: "top top",
    end: "+=20000",
    pin: true,
    scrub: true,
    // markers: true,
  },
});

// 수성 기준 scale 설정

gsap.set(".mercury", { scale: 1, transformOrigin: "bottom left" });
gsap.set(".mars", { scale: 1.25, transformOrigin: "bottom left" });
gsap.set(".venus", { scale: 2.25, transformOrigin: "bottom left" });
gsap.set(".earth", { scale: 2.7, transformOrigin: "bottom left" });
gsap.set(".neptune", { scale: 9.75, transformOrigin: "bottom left" });
gsap.set(".uranus", { scale: 10, transformOrigin: "bottom left" });
gsap.set(".saturn", { scale: 23.5, transformOrigin: "bottom left" });
gsap.set(".jupiter", { scale: 28, transformOrigin: "bottom left" });
gsap.set(".sun", {
  scale: 272.5,
  transformOrigin: "bottom left",
  y: -5000,
  x: -175000,
  opacity: 0,
});
gsap.set(".sun p", { opacity: 0 });
// gsap.set(".planet__contents", { scale: 1.8 });

// 스케일 타임라인
// 모바일-----------------------------------------------------------------------
mm.add("(max-width : 1279px", () => {
  gsap.set(".planet__contents", { scale: 2 });
  gsap.set(".title", { x: centerPlanet(".title") * 0.5 });

  const t2 = gsap.timeline();

  t2.to(".title h1 p:nth-child(1)", { opacity: 1, duration: 0.1 })
    .to(".title h1 p:nth-child(1)", { opacity: 0, duration: 0.1 })
    .to(".title h1 p:nth-child(2)", { opacity: 1, duration: 0.1 })
    .to(".title h1 p:nth-child(2)", { opacity: 0, duration: 0.1 })
    .to(".title", { x: centerPlanet(".title"), duration: 2 })
    // .to(".planet__contents", { scale: 5, x: -3000, duration: 2 });

  // ScrollTrigger.create({
  //   trigger: ".page_5-container",
  //   start: "top top",
  //   end: "+=15000",
  //   scrub: 0.5,
  //   animation: t2,
  // });
});

// ------------------------------- 데스크탑, 테블릿 --------------------
mmover.add("(min-width: 1280px)", () => {
  gsap.set(".planet__contents", { scale: 1.8 });
  gsap.set(".title", { x: centerPlanet(".title") * 0.4 });

  const tl = gsap.timeline();

  tl.to(".title h1 p:nth-child(1)", { opacity: 1, duration: 2 })
    .to(".title h1 p:nth-child(1)", { opacity: 0, duration: 1 })
    .to(".title h1 p:nth-child(2)", { opacity: 1, duration: 2 })
    .to(".title h1 p:nth-child(2)", { opacity: 0, duration: 1 })
    // 수성
    .to(".planet__contents", { x: centerPlanet(".mercury"), duration: 3 })
    .to(".mercury .is-active", { opacity: 1, duration: 2 })
    // 화성
    .to(".planet__contents", {
      x: centerPlanet(".mars") * 0.74,
      scale: 1.4,
      duration: 2,
    })
    .to(".mars .is-active", { opacity: 1, duration: 2 })
    // 금성
    .to(".planet__contents", {
      x: centerPlanet(".venus") * 0.38,
      scale: 0.8,
      duration: 2,
    })
    .to(".venus .is-active", { opacity: 1, duration: 2 })
    // 지구
    .to(".planet__contents", {
      x: centerPlanet(".earth") * 0.34,
      scale: 0.7,
      duration: 2,
    })
    .to(".earth .is-active", { opacity: 1, duration: 2 })
    // 해왕성
    .to(".planet__contents", {
      x: centerPlanet(".neptune") * 0.065,
      scale: 0.187,
      duration: 2,
    })
    .to(".neptune .is-active", { opacity: 1, duration: 2 })
    // 천왕성
    .to(".planet__contents", {
      x: centerPlanet(".uranus") * 0.044,
      scale: 0.118,
      duration: 2,
    })
    .to(".uranus .is-active", { opacity: 1, duration: 2 })
    // 토성
    .to(".planet__contents", {
      x: centerPlanet(".saturn") * 0.0295,
      scale: 0.078,
      duration: 2,
    })
    .to(".saturn .is-active", { opacity: 1, duration: 2 })
    // 목성
    .to(".planet__contents", {
      x: centerPlanet(".jupiter") * 0.0248,
      scale: 0.06,
      duration: 2,
    })
    .to(".jupiter .is-active", { opacity: 1, duration: 2 })
    .to(".planet__contents", { x: 1000, scale: 0.0065, duration: 2 })
    .to(".sun", { y: -20000, opacity: 1, duration: 2 })
    .to(".sun p", { opacity: 1, duration: 2 })
    .to(".sun .is-active", { opacity: 1, duration: 2 })
    .to(".sun img", { rotation: 360, repeat: 0.1, duration: 2 });

  ScrollTrigger.create({
    trigger: ".page_5-container",
    start: "top top",
    end: "+=20000",
    scrub: 0.5,
    animation: tl,
  });
});

gsap.to(".planet img", {
  scrollTrigger: {
    trigger: ".planet",
    start: "top top",
    end: "center center",
    toggleAction: "play pause play pause",
    horizontal: true,
    containerAnimation: scrollTween,
  },
  rotation: 360,
  repeat: -1,
  // duration: 30,
  ease: "none",
  // transformOrigin: "center center",
});

// 행성 중심 PX 값
function centerPlanet(planetSelector) {
  const planet = document.querySelector(planetSelector);
  const rect = planet.getBoundingClientRect();
  const planetCenter = rect.left + rect.width / 2;
  const viewprotCenter = window.innerWidth / 2;
  const offset = planetCenter - viewprotCenter;

  return Math.floor(-offset);
}

function classAdd(selector, className) {
  const element = document.querySelector(selector);
  element.classList.add(className);
}

function classRemove(selector, className) {
  const element = document.querySelector(selector);
  element.classList.remove(className);
}
