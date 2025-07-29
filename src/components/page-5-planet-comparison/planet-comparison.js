gsap.registerPlugin(ScrollTrigger);

const planetContents = document.querySelector(".planet__contents");

let planets = gsap.utils.toArray(".planet__contents .planet");
let scrollTween = gsap.to(planets, {
  scrollTrigger: {
    trigger: ".page_5-container",
    start: "300px top",
    pin: true,
    scrub: true,
    end: () => "+=3000",
    // markers: true,
  },
  x: () => -1000,
});

// 수성 기준 scale 설정
gsap.set(".mercury", {
  scale: 1,
  transformOrigin: "bottom left",
  rotate: "360deg",
  repeat: -1,
});

gsap.set(".mars", { scale: 1.2, transformOrigin: "bottom left" });
gsap.set(".venus", { scale: 2, transformOrigin: "bottom left" });
gsap.set(".earth", { scale: 3, transformOrigin: "bottom left" });
gsap.set(".neptune", { scale: 6, transformOrigin: "bottom left" });
gsap.set(".uranus", { scale: 10, transformOrigin: "bottom left" });
gsap.set(".saturn", { scale: 20, transformOrigin: "bottom left" });
gsap.set(".jupiter", { scale: 28, transformOrigin: "bottom left" });
gsap.set(".sun", { scale: 200, transformOrigin: "bottom left" });
gsap.set(".planet__contents", { scale: 1.8 });

gsap.to(".planet img", {
  ScrollTrigger: {
    trigger: ".page_5-contents",
    start: "top center",
    toggleAction: "play pause play puase",
    markers: true,
  },
  rotation: 360,
  repeat: -1,
  duration: 10,
  ease: "none",
  transformOrigin: "center center",
});

// 스케일 타임라인
const tl = gsap.timeline();

tl.to(".planet__contents", {
  opacity: 1,
  scale: 0.01,
  ease: "none",
  duration: 10,
  ease: "power1.inOut",
  onEnter: () => console.log("start"),
});

ScrollTrigger.create({
  trigger: ".page_5-container",
  start: "top top",
  end: "+=3000",
  scrub: 0.3,
  animation: tl,
});
