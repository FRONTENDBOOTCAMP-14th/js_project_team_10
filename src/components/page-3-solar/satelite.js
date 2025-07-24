import "./satelite.css";
import planetData from "./satelliteData.json";

function createSatelliteModal(satelliteId) {
  const satellite = planetData[satelliteId] || {
    name: "알 수 없는 행성",
    sateliteName: "알 수 없는 위성",
    sateliteDescription: "위성 정보가 없습니다.",
  };

  const modalHTML = `
    <div class="satellite-modal-overlay" id="satelliteModal">
      <div class="satellite-modal-content">
        <button class="satellite-modal-close">&times;</button>
        <h2>${satellite.name}</h2>
        <div class="satellite-modal-info">
          <h3>${satellite.sateliteName || "위성 정보 없음"}</h3>
        </div>
      </div>
    </div>
  `;

  const existingModal = document.getElementById("satelliteModal");
  if (existingModal) existingModal.remove();

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modal = document.getElementById("satelliteModal");
  const closeBtn = modal.querySelector(".satellite-modal-close");

  closeBtn.onclick = () => modal.remove();
  modal.onclick = (e) => e.target === modal && modal.remove();
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
