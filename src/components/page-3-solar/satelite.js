import "./satellite.css";
import planetData from "./satelliteData.json";

function createSatelliteModal(planetName) {
  const satellite = Object.values(planetData).find(
    (sat) => sat.planet === planetName.toLowerCase()
  ) || {
    name: `${planetName}의 위성`,
    diameter: "정보 없음",
    distance: "정보 없음",
    orbitalPeriod: "정보 없음",
    rotationPeriod: "정보 없음",
  };

  const modalHTML = `
    <div class="satellite-modal-overlay" id="satelliteModal">
      <div class="satellite-modal-content">
        <button class="satellite-modal-close">&times;</button>
        <h2>${satellite.name}</h2>
        <table class="satellite-info-table">
          <tr>
            <th>지름</th>
            <td>${satellite.diameter}</td>
          </tr>
          <tr>
            <th>행성에서의 거리</th>
            <td>${satellite.distance}</td>
          </tr>
          <tr>
            <th>공전 주기</th>
            <td>${satellite.orbitalPeriod}</td>
          </tr>
          <tr>
            <th>자전 주기</th>
            <td>${satellite.rotationPeriod}</td>
          </tr>
        </table>
      </div>
    </div>
  `;

  const existingModal = document.getElementById("satelliteModal");
  if (existingModal) existingModal.remove();

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modal = document.getElementById("satelliteModal");
  const closeBtn = modal.querySelector(".satellite-modal-close");

  const closeModal = () => {
    modal.remove();
    document.removeEventListener('keydown', handleEscape);
  };

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  closeBtn.onclick = closeModal;
  modal.onclick = (e) => e.target === modal && closeModal();
  document.addEventListener('keydown', handleEscape);
}

function setupSatelliteModal() {
  const satelliteButtons = document.querySelectorAll(
    ".system__modal-satelite-button"
  );
  if (!satelliteButtons.length) return;

  satelliteButtons.forEach((button) => {
    button.onclick = (e) => {
      e.stopPropagation();
      const satelliteClass =
        button.closest(".system__modal-content").querySelector("h2")
          ?.textContent || "";
      createSatelliteModal(satelliteClass);
    };
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupSatelliteModal);
} else {
  setupSatelliteModal();
}

export { setupSatelliteModal };
