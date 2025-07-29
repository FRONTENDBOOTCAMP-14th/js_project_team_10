gsap.registerPlugin(ScrollTrigger);

const planetContents = document.querySelector(".planet__contents");

let planets = gsap.utils.toArray(".planet__contents .planet");
let scrollTween = gsap.to(planets, {
  scrollTrigger: {
    trigger: ".page_5-container",
    start: "top top",
    end: () => "+=15000",
    pin: true,
    scrub: true,
    // markers: true,
  },
});

// 수성 기준 scale 설정
// gsap.set(".mercury", { scale: 1, transformOrigin: "bottom left" });
// gsap.set(".mars", { scale: 1.2, transformOrigin: "bottom left" });
// gsap.set(".venus", { scale: 2, transformOrigin: "bottom left" });
// gsap.set(".earth", { scale: 3, transformOrigin: "bottom left" });
// gsap.set(".neptune", { scale: 12, transformOrigin: "bottom left" });
// gsap.set(".uranus", { scale: 13, transformOrigin: "bottom left" });
// gsap.set(".saturn", { scale: 27, transformOrigin: "bottom left" });
// gsap.set(".jupiter", { scale: 28, transformOrigin: "bottom left" });
// gsap.set(".sun", { scale: 200, transformOrigin: "bottom left" });

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
gsap.set(".planet__contents", { scale: 1.8 });

// 스케일 타임라인
const tl = gsap.timeline();

// tl.to(".planet__contents", { scale: 1.5, x: -1450, duration: 3 })
//   .to(".planet__contents", { scale: 0.9, x: -1700, duration: 3 })
//   .to(".planet__contents", { scale: 0.65, x: -2350, duration: 3 })
//   .to(".planet__contents", { scale: 0.3, x: -1700, duration: 3 })
//   .to(".planet__contents", { scale: 0.13, x: -1200, duration: 3 })
//   .to(".planet__contents", { scale: 0.1, x: -1500, duration: 3 });

tl.to(".planet__contents", { scale: 1.4, x: -1220, duration: 2 })
  .to(".planet__contents", { scale: 0.8, x: -1560, duration: 2 })
  .to(".planet__contents", { scale: 0.7, x: -2800, duration: 2 })
  .to(".planet__contents", { scale: 0.187, x: -1100, duration: 2 })
  .to(".planet__contents", { scale: 0.118, x: -1550, duration: 2 })
  .to(".planet__contents", { scale: 0.078, x: -1800, duration: 2 })
  .to(".planet__contents", { scale: 0.06, x: -2600, duration: 2 })
  .to(".planet__contents", { scale: 0.0065, x: 1000, duration: 2 })
  .to(".sun", { y: -20000, duration: 3, opacity: 1, duration: 2 })
  .to(".sun p", { opacity: 1 })
  .to(".sun img", { rotation: 360, repeat: 0.1, duration: 5 });

ScrollTrigger.create({
  trigger: ".page_5-container",
  start: "top top",
  end: "+=12000",
  scrub: 0.5,
  animation: tl,
});

gsap.to(".mercury img", {
  scrollTrigger: {
    trigger: ".mercury",
    // start: "top top",
    // end: "center center",
    toggleAction: "play pause play pause",
    horizontal: true,
    containerAnimation: scrollTween,
  },
  rotation: 360,
  repeat: -1,
  duration: 30,
  ease: "none",
  // transformOrigin: "center center",
});

ScrollTrigger.create({
  trigger: ".mercury",
  // start: "top top",
  // end: "center center",
  toggleAction: "play pause play pause",

  // markers: true,
});
