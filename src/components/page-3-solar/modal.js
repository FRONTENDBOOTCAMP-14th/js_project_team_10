import planetData from "./planetData.json";
import "/src/components/page-3-solar/modal.css";

function createModal(planetId) {
  const planet = planetData[planetId] || {
    name: "알 수 없는 행성",
    type: "정보 없음",
    diameter: "정보 없음",
    mass: "정보 없음",
    distance: "정보 없음",
  };

  const modalHTML = `
    <div class="system__modal-overlay" id="planetModal">
      <div class="system__modal-content">
        <button class="system__modal-close" id="closeModal">&times;</button>
        <h2>${planet.name}</h2>
        <div class="system__modal-body">
          <table class="system__modal-table">
            <tr>
              <th>분류</th>
              <td>${planet.type}</td>
            </tr>
            <tr>
              <th>지름</th>
              <td>${planet.diameter}</td>
            </tr>
            <tr>
              <th>질량</th>
              <td>${planet.mass}</td>
            </tr>
            <tr>
              <th>공전 궤도 반지름</th>
              <td>${planet.distance}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  `;

  const existingModal = document.getElementById("planetModal");
  if (existingModal) {
    existingModal.remove();
  }
  document.body.insertAdjacentHTML("beforeend", modalHTML);

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
