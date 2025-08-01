gsap.registerPlugin(ScrollTrigger);
const profileTimeLine = gsap.timeline();

gsap.set(".team-section-intro", { scale: 0.8, opacity: 0.3 });
gsap.set(".text-2, .text-3, .text-4", { opacity: 0 });
profileTimeLine
  .to(".team-section-intro", { scale: 1, opacity: 1, duration: 2 })
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
  .to(".text-4", { opacity: 1, duration: 2 });
// .to(".p-wrap .panel, .text-wrap .panel-text", {
//   y: -2412,
//   duration: 2,
// });

ScrollTrigger.create({
  trigger: ".team-section-intro, .text-wrap, .p-wrap",
  start: () => {
    const a = document.querySelector(".intro-div-box").scrollHeight;
    const scaleDownA = a * 0.8;
    const resulte = (a - scaleDownA) / 2;
    return "-=" + resulte;
  },
  end: "+=3000",
  pin: true,
  scrub: 0.3,
  animation: profileTimeLine,
  // markers: true,
});

// text Scroll
const pTag1 = document.querySelector(".first-parallel");
const textArr1 = "TenTrillion TenTrillion TenTrillion".split();
let count1 = 0;
initTexts(pTag1, textArr1);

function initTexts(element, textArray) {
  textArray.push(...textArray);
  for (let i = 0; i < textArray.length; i++) {
    element.innerText += `${textArray[i]}\u00A0\u00A0\u00A0\u00A0`;
  }
}

function marqueeText(count, element, direction) {
  if (count > element.scrollWidth / 2) {
    element.style.transform = `translate3d(0, 0, 0)`;
    count = 0;
  }
  element.style.transform = `translate3d(${direction * count}px, 0, 0)`;
  return count;
}

function animate() {
  count1++;
  count1 = marqueeText(count1, pTag1, -1);
  window.requestAnimationFrame(animate);
}

function scrollHandler() {
  count1 += 15;
}
window.addEventListener("scroll", scrollHandler);
// animate();

// ------- project-intro
const projectIntro = gsap.timeline();

projectIntro
  .to(".project-intro", { backgroundColor: "black", duration: 0.5 })
  .to(".project-intro", { backgroundColor: "#a17ed5", duration: 1 });

scrollTrigger.create({
  trigger: ".project-intro",
  start: "top top",
  // end: "+=1000",
  pin: true,
  scrub: 0.3,
  animation: projectIntro,
  markers: true,
});
