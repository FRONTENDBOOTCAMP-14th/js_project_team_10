import { createModal } from "./modal.js";

// 태양계 천체 순서 정의 (태양부터 시작)
const PLANET_ORDER = [
  "solar",  // 태양 (sun 대신 solar 키 사용)
  "mercury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune"
];

let currentPlanetIndex = 0;

// 현재 행성 ID 가져오기
const getCurrentPlanetId = () => {
  const modal = document.querySelector(".system__modal-content");
  if (!modal) return null;
  
  const modalClass = Array.from(modal.classList).find(cls => 
    cls.startsWith("modal-")
  );
  if (!modalClass) return null;
  
  return modalClass.replace("modal-", "");
};

// 현재 행성 인덱스 업데이트
const updateCurrentPlanetIndex = () => {
  const currentPlanetId = getCurrentPlanetId();
  if (!currentPlanetId) return;
  
  const index = PLANET_ORDER.indexOf(currentPlanetId);
  if (index !== -1) {
    currentPlanetIndex = index;
  }
};

// 행성 이동 함수
const navigatePlanet = (direction) => {
  console.log(`navigatePlanet called with direction: ${direction}`);
  
  const modal = document.getElementById("planetModal");
  if (!modal) {
    console.error("Modal element not found!");
    return;
  }
  
  updateCurrentPlanetIndex();
  console.log(`Current planet index: ${currentPlanetIndex}, ID: ${PLANET_ORDER[currentPlanetIndex]}`);
  
  let newIndex;
  if (direction === "next") {
    newIndex = (currentPlanetIndex + 1) % PLANET_ORDER.length;
  } else {
    newIndex = (currentPlanetIndex - 1 + PLANET_ORDER.length) % PLANET_ORDER.length;
  }
  
  const newPlanetId = PLANET_ORDER[newIndex];
  console.log(`Navigating to: ${newPlanetId} (index: ${newIndex})`);
  
  // 현재 모달 닫기
  const closeButton = modal.querySelector(".system__modal-close");
  if (closeButton) {
    console.log("Closing current modal...");
    closeButton.click();
  } else {
    console.warn("Close button not found!");
  }
  
  // 새 모달 열기
  setTimeout(() => {
    console.log("Attempting to open new modal for planet:", newPlanetId);
    if (typeof createModal === 'function') {
      console.log("createModal function found, executing...");
      createModal(newPlanetId);
    } else {
      console.error("createModal function is not available!");
    }
  }, 300);
};

// 키보드 이벤트 핸들러
const handleKeyDown = (e) => {
  if (!document.getElementById("planetModal") || 
      document.activeElement.tagName === "INPUT" || 
      document.activeElement.tagName === "TEXTAREA") {
    return;
  }
  
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    navigatePlanet("prev");
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    navigatePlanet("next");
  }
};

// 캐러셀 초기화
const initCarousel = () => {
  console.log("Initializing carousel...");
  
  const modal = document.getElementById("planetModal");
  if (!modal) {
    console.error("Modal not found for carousel initialization!");
    return;
  }
  
  // 화살표 버튼에 이벤트 리스너 추가
  const leftArrow = modal.querySelector(".carousel-arrow--left");
  const rightArrow = modal.querySelector(".carousel-arrow--right");
  
  console.log("Arrow elements found:", { leftArrow: !!leftArrow, rightArrow: !!rightArrow });
  
  if (leftArrow) {
    leftArrow.addEventListener("click", (e) => {
      console.log("Left arrow clicked");
      e.stopPropagation();
      navigatePlanet("prev");
    }, { once: false });
  } else {
    console.warn("Left arrow not found in modal!");
  }
  
  if (rightArrow) {
    rightArrow.addEventListener("click", (e) => {
      console.log("Right arrow clicked");
      e.stopPropagation();
      e.preventDefault();
      console.log("Navigating to next planet...");
      navigatePlanet("next");
    }, { once: false });
  } else {
    console.warn("Right arrow not found in modal!");
  }
  
  // 키보드 이벤트 리스너 추가
  document.addEventListener("keydown", handleKeyDown);
  
  // 모달이 닫힐 때 이벤트 리스너 정리
  const observer = new MutationObserver((mutations) => {
    if (!document.body.contains(modal)) {
      document.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
};

// 모달 캐러셀 초기화 함수
export const initModalCarousel = () => {
  // 모달이 완전히 렌더링된 후 초기화
  const observer = new MutationObserver((mutations, obs) => {
    const modal = document.getElementById("planetModal");
    if (modal) {
      initCarousel();
      obs.disconnect();
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
};

// DOM이 완전히 로드되면 초기화
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initModalCarousel);
} else {
  initModalCarousel();
}
