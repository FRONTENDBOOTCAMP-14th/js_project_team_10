gsap.registerPlugin(ScrollTrigger);
const profileTimeLine = gsap.timeline();

gsap.set(".team-section-intro", { scale: 0.8 });
gsap.set(".team-section-wrap", { opacity: 0.2 });
gsap.set(".text-2, .text-3, .text-4", { opacity: 0 });
gsap.set(".panel-text", { color: "#white" });
profileTimeLine
  .to(".team-section-intro", {
    scale: 1.02,
    opacity: 1,
    duration: 2,
  })
  .to(".team-section-wrap", {
    opacity: 1,
    duration: 2,
  })
  .to(".p-wrap .panel, .text-wrap .panel-text", {
    y: -603,
    duration: 2,
  })
  .to(".text-2", { opacity: 1, duration: 2 })
  .to(".p-wrap .panel, .text-wrap .panel-text", {
    y: -1206,
    duration: 2,
  })
  .to(".text-3", { opacity: 1, duration: 2 })
  .to(".p-wrap .panel, .text-wrap .panel-text", {
    y: -1809,
    duration: 2,
  })
  .to(".text-4", { opacity: 1, duration: 1 });

ScrollTrigger.create({
  trigger: ".team-section-intro, .text-wrap, .p-wrap",
  start: () => {
    const a = document.querySelector(".intro-div-box").scrollHeight;
    const scaleDownA = a * 0.8;
    const resulte = (a - scaleDownA) / 2;
    return "-=" + resulte;
  },
  end: "+=4000",
  pin: true,
  scrub: 3,
  animation: profileTimeLine,
  // markers: true,
  // scroller: document.body,
});

const spacingBox = document.querySelector(".element-spacing");
spacingBox.style.setProperty("height", () => {
  const introBoxHight = document.querySelector(
    ".team-section-intro"
  ).scrollHeight;

  console.log(introBoxHight);
  return introBoxHight + "px";
});

// ------- project-intro
const projectIntro = gsap.timeline();

gsap.set(".intro-list-1, .intro-list-2, .intro-list-3, .intro-list-4", {
  opacity: 0,
  x: 3300,
  y: -300,
});

projectIntro
  .to(".project-intro", { backgroundColor: "black", duration: 1 })
  .to(".project-intro", { backgroundColor: "#fa8072", duration: 1 })
  .to(".intro-list-1", { opacity: 1, duration: 1 }, 3)
  .to(
    ".project-intro ul",
    {
      x: () => {
        const a =
          document.querySelector(".project-intro-box").scrollWidth - 1700;
        return "-" + a;
      },
      duration: 30,
    },
    3
  )
  .to(".project-intro ul", { opacity: 0, duration: 2 })
  // 동시 효과
  .to(".intro-list-1", { opacity: 0, duration: 1 }, 8.5)
  .to(".intro-list-2", { opacity: 1, duration: 1 }, 6)
  .to(".intro-list-3", { opacity: 1, duration: 1 }, 10)
  .to(".intro-list-2", { opacity: 0, duration: 1 }, 12)
  .to(".intro-list-4", { opacity: 1, duration: 1 }, 14)
  .to(".intro-list-3", { opacity: 0, duration: 1 }, 18.5);

ScrollTrigger.create({
  trigger: ".project-intro",
  start: () => {
    return "top top";
  },
  end: "+=5000",
  pin: true,
  scrub: 3,
  animation: projectIntro,
  // markers: true,
  // scroller: document.body,
});

gsap.set(".description-box", { opacity: 0 });
gsap.set(".link-guide", { opacity: 0 });
gsap.set(".division-box h1,.division-box p", { color: "#000000" });
const description = gsap.timeline();

description
  // .to(".division-box", { backgroundColor: "#ffffff", duration: 2 }, 0)
  .to(".division-box h1, p", { color: "#ffffff", duration: 2 }, 0)
  .to(".description-box", { opacity: 1, duration: 2 }, 0)
  .to(".division-box p", { y: 200, duration: 2 }, 0)
  .to(".user", { borderRadius: 300, duration: 3 }, 1)
  .to(".kdk", { x: -750, duration: 2 }, 3)
  .to(".name1", { x: 750, duration: 2 }, 3)
  .to(".name2", { x: -250, duration: 2 }, 4)
  .to(".name3", { x: 250, duration: 2 }, 4)
  .to(".link-guide", { opacity: 1, duration: 2 });

ScrollTrigger.create({
  trigger: ".division-box",
  start: "+20 top",
  end: "+=1700",
  pin: true,
  scrub: 3,
  animation: description,
  // markers: true,
  // scroller: document.body,
});

// 초기 스타일 설정
gsap.set(".solar-page .overlay", { backgroundColor: "black" });
gsap.set(".solar-page .content", { opacity: 0, y: 40 });

// h1 텍스트 문자 분할
const title = document.querySelector(".solar-page h1");
const chars = title.textContent.split("");
title.innerHTML = chars
  .map((char) => `<span class="char">${char}</span>`)
  .join("");

// ScrollTrigger 애니메이션 타임라인
const solarPage = gsap.timeline({
  scrollTrigger: {
    trigger: ".solar-page",
    start: "top top",
    end: "+=100",
    toggleActions: "play none none reverse",
    // markers: true,
  },
});

// 애니메이션 순차 실행
solarPage
  .to(
    ".solar-page .overlay",
    {
      backgroundColor: "#ffffff",
      duration: 2,
      ease: "power2.inOut",
    },
    0
  )
  .to(
    ".solar-page .content",
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    },
    "-=1.5"
  ) // 겹쳐서 등장

  // 문자 stagger 애니메이션 (이건 .content가 다 나온 후 실행)
  .from(
    ".solar-page .char",
    {
      opacity: 0,
      y: -30,
      stagger: 0.05,
      duration: 0.6,
      ease: "back.out(1.7)",
    },
    "-=0.2"
  ); // 바로 이어서 실행
