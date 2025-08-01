
import SolarSystemSection from "/src/components/page-3-solar/layout.js";
import { initSolarSystem } from "./transition.js";
import { lightStars } from "./transition.js";
import { initHoverEffects } from "./hover.js";
import { initModal } from "./modal.js";

function waitForImages(container) {
  return new Promise((resolve) => {
    const images = container.getElementsByTagName("img");
    let loadedCount = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
      resolve();
      return;
    }

    const imageLoaded = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        resolve();
      }
    };

    for (let img of images) {
      if (img.complete) {
        imageLoaded();
      } else {
        img.addEventListener("load", imageLoaded);
        img.addEventListener("error", imageLoaded);
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const solarSystemSection = document.getElementById("solarSystem");

  if (solarSystemSection) {
    solarSystemSection.innerHTML = SolarSystemSection;

    waitForImages(solarSystemSection).then(() => {
      initHoverEffects();
      initModal();
      setTimeout(async () => {
        await initSolarSystem();
        lightStars();
      }, 100);
    });
  }
});
