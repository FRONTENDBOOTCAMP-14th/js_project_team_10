import HeroSection from "../components/layouts/HeroSection.js";
import IntroSection from "../components/layouts/IntroSection.js";

document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.getElementById("hero");
  const introSection = document.getElementById("intro");

  if (heroSection) heroSection.innerHTML = HeroSection;
  if (introSection) introSection.innerHTML = IntroSection;
});
