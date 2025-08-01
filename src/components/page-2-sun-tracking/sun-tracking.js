gsap.registerPlugin(ScrollTrigger);

const face = document.getElementById("face-group");
const leftEye = document.getElementById("left-eye");
const rightEye = document.getElementById("right-eye");

document.addEventListener("mousemove", (e) => {
  const svg = document.querySelector("svg");
  const rect = svg.getBoundingClientRect();

  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  moveEye(leftEye, 125, 130, mouseX, mouseY);
  moveEye(rightEye, 175, 130, mouseX, mouseY);

  const faceCenterX = 152.5;
  const faceCenterY = 152.5;

  const dx = (mouseX - faceCenterX) / 25;
  const dy = (mouseY - faceCenterY) / 25;

  face.setAttribute("transform", `translate(${dx}, ${dy})`);
});

function moveEye(eye, originX, originY, mouseX, mouseY) {
  const dx = mouseX - originX;
  const dy = mouseY - originY;
  const angle = Math.atan2(dy, dx);

  const maxDistance = 5;

  const newX = originX + Math.cos(angle) * maxDistance;
  const newY = originY + Math.sin(angle) * maxDistance;

  eye.setAttribute("cx", newX);
  eye.setAttribute("cy", newY);
}

const mmweb = gsap.matchMedia();
const sunDescription = document.querySelector(".sun-description");
const solar = document.querySelector(".sun-graphic");

gsap.to(sunDescription, {
  scrollTrigger: {
    trigger: ".sun-description",
    start: "top 70%",
    end: "top 40%",
    scrub: true,
  },
  x: 0,
  duration: 5,
  ease: "none",
  opacity: 1,
});

const hoverSolar = gsap.to(".sun-graphic", {
  paused: true,
  duration: 0.7,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
  y: 13,
});

solar.addEventListener("mouseenter", () => hoverSolar.play());
solar.addEventListener("mouseleave", () => hoverSolar.reverse());
