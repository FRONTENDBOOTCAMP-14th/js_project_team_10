import planetData from "./planetData.json";
import "/src/components/page-3-solar/modal.css";
import { setupSatelliteModal } from "./satelite";

function createModal(planetId) {
  const planet = planetData[planetId] || {
    class: "알 수 없는 행성",
    image: "url('/public/planet/planet.svg')",
    name: "알 수 없는 행성",
    type: "정보 없음",
    planetType: "정보 없음",
    decription: "정보 없음",
    diameter: "정보 없음",
    au: "정보 없음",
    distance: "정보 없음",
    orbitalPeriod: "정보 없음",
    rotationPeriod: "정보 없음",
    sateliteImage: "url('/public/planet/planet.svg')",
  };

  const modalHTML = `
    <div class="system__modal-overlay" id="planetModal">
      <div class="system__modal-content">
        <button class="system__modal-close" id="closeModal">&times;</button>
        <h2>${planet.class}</h2>
        <div class="system__modal-image-container">
          <img src="${planet.image}" class="system__modal-image" alt="${planet.name}">
          <button class="system__modal-satelite-button" aria-label="위성 정보 보기">
            <img src="${planet.sateliteImage}" class="system__modal-satelite-image" alt="${planet.name} 위성">
          </button>
        </div>
        <div class="system__modal-body">
          <div class="system__modal-info">
            <div class="system__modal-info-name">${planet.name}</div>
            <div class="system__modal-info-type">${planet.type}</div>
            <div class="system__modal-info-planetType">${planet.planetType}</div>
          </div>
          <p class="system__modal-description">
            ${planet.decription}
          </p>
          <div class="system__modal-diameter">지름 : "${planet.diameter}"</div>
          <div class="system__modal-orbit-wrapper">
            <div class="system__modal-orbit">"${planet.distance}"</div>
            <span>공전 궤도 반지름</span>
          </div>
          <div class="system__modal-info-etc">
            <div>태양에서의 거리 : "${planet.au}"AU</div>
            <div>공전 주기 : "${planet.orbitalPeriod}"</div>
            <div>회전 주기 : "${planet.rotationPeriod}"</div>
          </div>
        </div>
      </div>
    </div>
  `;

  const existingModal = document.getElementById("planetModal");
  if (existingModal) {
    existingModal.remove();
  }
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  setupSatelliteModal();

  const closeButton = document.getElementById("closeModal");
  const modal = document.getElementById("planetModal");

  closeButton.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", handleEscape);
}
function closeModal() {
  const modal = document.getElementById("planetModal");
  if (modal) {
    modal.style.animation = "fadeOut 0.3s forwards";
    setTimeout(() => {
      modal.remove();
    }, 300);
    document.removeEventListener("keydown", handleEscape);
  }
}

function handleEscape(e) {
  if (e.key === "Escape") {
    closeModal();
  }
}

export function initModal() {
  const planetButtons = document.querySelectorAll(".system__button");

  planetButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const planetClass = Array.from(button.classList).find(
        (cls) => cls !== "system__button" && cls !== "active"
      );
      if (planetClass) {
        createModal(planetClass);
      }
    });
  });
}
