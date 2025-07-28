import planetData from "./planetData.json";
import "/src/components/page-3-solar/modal.css";
import { setupSatelliteModal } from "./satelite";
import '/src/style/common/_theme.css';

function createModal(planetId) {
  const lowerId = planetId.toLowerCase();
  const planet = planetData[lowerId] || {
    class: "알 수 없는 행성",
    image: "/public/planet/planet.svg",
    name: "알 수 없는 행성",
    type: "정보 없음",
    planetType: "정보 없음",
    decription: "정보 없음",
    diameter: "정보 없음",
    au: "정보 없음",
    distance: "정보 없음",
    orbitalPeriod: "정보 없음",
    rotationPeriod: "정보 없음",
    sateliteImage: null,
  };

  const modalHTML = `
    <div class="system__modal-overlay" id="planetModal">
      <div class="system__modal-content modal-${lowerId}">
        <button class="system__modal-close" id="closeModal">&times;</button>

        <h2 class="planet-eng-name">${planet.class}</h2>

        <div class="system__modal-image-container">
          <img src="${planet.fullImage || planet.image}" class="system__modal-image" alt="${planet.name}">
          <div class="planet-orbit-ring">
            <svg width="142" height="142" viewBox="0 0 142 142" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_263_352)">
                <path d="M70.8699 141.54L70.8599 137" stroke="currentColor" stroke-width="0.55"/>
                <path d="M52.5498 139.15L53.7198 134.77" stroke="currentColor" stroke-width="0.55"/>
                <path d="M35.4702 132.11L37.7302 128.18" stroke="currentColor" stroke-width="0.55"/>
                <path d="M20.7998 120.88L23.9998 117.67" stroke="currentColor" stroke-width="0.55"/>
                <path d="M9.52979 106.24L13.4498 103.97" stroke="currentColor" stroke-width="0.55"/>
                <path d="M2.43994 89.18L6.80994 88" stroke="currentColor" stroke-width="0.55"/>
                <path d="M0 70.8704L4.53 70.8604" stroke="currentColor" stroke-width="0.55"/>
                <path d="M2.39014 52.5498L6.77014 53.7198" stroke="currentColor" stroke-width="0.55"/>
                <path d="M9.43018 35.4697L13.3602 37.7297" stroke="currentColor" stroke-width="0.55"/>
                <path d="M20.6602 20.7998L23.8702 23.9998" stroke="currentColor" stroke-width="0.55"/>
                <path d="M35.2998 9.53027L37.5698 13.4503" stroke="currentColor" stroke-width="0.55"/>
                <path d="M52.3501 2.44043L53.5301 6.81043" stroke="currentColor" stroke-width="0.55"/>
                <path d="M70.6699 0V4.53" stroke="currentColor" stroke-width="0.55"/>
                <path d="M88.9898 2.38965L87.8198 6.76965" stroke="currentColor" stroke-width="0.55"/>
                <path d="M106.07 9.42969L103.81 13.3597" stroke="currentColor" stroke-width="0.55"/>
                <path d="M120.74 20.6602L117.54 23.8702" stroke="currentColor" stroke-width="0.55"/>
                <path d="M132.01 35.2998L128.08 37.5698" stroke="currentColor" stroke-width="0.55"/>
                <path d="M139.1 52.3496L134.72 53.5296" stroke="currentColor" stroke-width="0.55"/>
                <path d="M141.54 70.6699H137" stroke="currentColor" stroke-width="0.55"/>
                <path d="M139.15 88.9903L134.77 87.8203" stroke="currentColor" stroke-width="0.55"/>
                <path d="M132.11 106.07L128.18 103.81" stroke="currentColor" stroke-width="0.55"/>
                <path d="M120.88 120.74L117.67 117.54" stroke="currentColor" stroke-width="0.55"/>
                <path d="M106.24 132.01L103.97 128.08" stroke="currentColor" stroke-width="0.55"/>
                <path d="M89.18 139.1L88 134.72" stroke="currentColor" stroke-width="0.55"/>
              </g>
              <defs>
                <clipPath id="clip0_263_352">
                  <rect width="141.54" height="141.54" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          ${
            planet.sateliteImage
              ? `<button class="system__modal-satelite-button" aria-label="위성 정보 보기">
                  <img src="${planet.sateliteImage}" class="system__modal-satelite-image" alt="${planet.name} 위성">
                </button>`
              : ""
          }
        </div>

        <div class="system__modal-body">
          <div class="planet-header">
            <div class="planet-title-left">
              <div class="planet-title-group">
                <span class="planet-kor-name">${planet.name}</span>
                <span class="planet-type-label">${planet.type}</span>
                <div class="planet-title-underline"></div>
              </div>
            </div>
            <div class="planet-zone">${planet.planetType}</div>
          </div>

          <p class="system__modal-description">${planet.decription}</p>

          <div class="planet-diameter">지름 : ${planet.diameter}</div>

          <div class="planet-distance-row">
            <div class="planet-distance">${planet.distance}</div>
            <div class="planet-orbit-label">공전 궤도 반지름</div>
          </div>

          <div class="planet-metadata-row">
            <div class="metadata-col">태양에서의 거리 : ${planet.au}</div>
            <div class="metadata-col">공전주기 : ${planet.orbitalPeriod}</div>
            <div class="metadata-col">자전주기 : ${planet.rotationPeriod}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  const existingModal = document.getElementById("planetModal");
  if (existingModal) existingModal.remove();

  document.body.insertAdjacentHTML("beforeend", modalHTML);
  setupSatelliteModal();

  const closeButton = document.getElementById("closeModal");
  const modal = document.getElementById("planetModal");
  closeButton.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", handleEscape);
}

function closeModal() {
  const modal = document.getElementById("planetModal");
  if (modal) {
    modal.style.animation = "fadeOut 0.3s forwards";
    setTimeout(() => modal.remove(), 300);
    document.removeEventListener("keydown", handleEscape);
  }
}

function handleEscape(e) {
  if (e.key === "Escape") closeModal();
}

export function initModal() {
  const planetButtons = document.querySelectorAll(".system__button");
  planetButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const planetClass = Array.from(button.classList).find(
        (cls) => cls !== "system__button" && cls !== "active"
      );
      if (planetClass) createModal(planetClass.toLowerCase());
    });
  });
}
