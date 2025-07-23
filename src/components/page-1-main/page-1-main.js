gsap.set(
  [
    ".main-span-circle",
    ".main-span-lineSm",
    ".main-span-lineM",
    ".orbit-path",
    ".planet",
    ".side-circle",
    ".main-span-extendLineX",
    ".main-span-extendLineY",
    ".solar-text",
  ],
  { opacity: 0 }
);

const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

// 중앙 태양
tl.fromTo(".circle", { scale: 0 }, { scale: 1, opacity: 1, duration: 1 });

// 방사형 선들
tl.fromTo(
  ".main-span-lineSm, .main-span-lineM",
  { scaleY: 0 },
  { scaleY: 1, opacity: 1, duration: 0.5, stagger: 0.05 },
  "-=0.5"
);

// 십자선
tl.fromTo(
  ".main-span-extendLineX",
  { scaleX: 0 },
  { scaleX: 1, opacity: 1, duration: 0.6 },
  "-=0.4"
);
tl.fromTo(
  ".main-span-extendLineY",
  { scaleY: 0 },
  { scaleY: 1, opacity: 1, duration: 0.6 },
  "-=0.6"
);

// 궤도
tl.fromTo(
  ".orbit-path",
  { drawSVG: "0% 0%" },
  { drawSVG: "0% 100%", opacity: 1, duration: 1 },
  "-=0.5"
);

// 행성
tl.fromTo(
  ".planet",
  { scale: 0 },
  { scale: 1, opacity: 1, duration: 0.5, stagger: 0.2 },
  "-=0.8"
);

// 양 옆 원
tl.fromTo(
  ".side-circle",
  { x: 100, opacity: 0 },
  { x: 0, opacity: 1, duration: 0.5, stagger: 0.2 },
  "-=0.5"
);

// 텍스트 (예: SOLAR SYSTEM에 .solar-text 클래스 부여 가정)
tl.fromTo(
  ".solar-text",
  { y: 50, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.8 },
  "-=0.5"
);

// 궤도 이동 애니메이션
gsap.registerPlugin(MotionPathPlugin);

gsap.to("#planet", {
  duration: 8,
  repeat: -1,
  ease: "none",
  motionPath: {
    path: "#orbit",
    align: "#orbit",
    alignOrigin: [0.5, 0.5],
    autoRotate: false,
  },
});

gsap.to("#planet2", {
  duration: 5,
  repeat: -1,
  ease: "none",
  motionPath: {
    path: "#orbit2",
    align: "#orbit2",
    alignOrigin: [0.5, 0.5],
    autoRotate: false,
  },
});
