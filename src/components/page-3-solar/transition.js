import planetPositions from './planetPositions.json';

export function initSolarSystem() {
  const sun = document.querySelector(".system__button.solar");
  if (!sun) return;

  // 현재 디바이스 유형 확인 (데스크톱/모바일)
  const isDesktop = window.matchMedia("(min-width: 1280px)").matches;
  const { sun: sunPositions, planets: planetConfigs } = isDesktop 
    ? planetPositions.desktop 
    : planetPositions.mobile;

  // 행성 요소와 위치 정보 매핑
  const planets = planetConfigs.map(config => ({
    element: document.querySelector(`.system__button.${config.name}`),
    targetTop: config.targetTop,
    targetLeft: config.targetLeft
  }));

  const sunInitialTop = sunPositions.initialTop;
  const sunTargetTop = sunPositions.targetTop;

  // 초기 위치 설정
  sun.style.top = `${sunInitialTop}%`;
  sun.style.transition = "all 0.5s ease-out";
  sun.style.opacity = "1";

  // 행성 초기화
  planets.forEach((planet) => {
    if (planet.element) {
      planet.startTop = 100;
      planet.startLeft = 50;

      planet.element.style.position = "absolute";
      planet.element.style.top = `${planet.startTop}%`;
      planet.element.style.left = `${planet.startLeft}%`;
      planet.element.style.transform = "translate(-50%, 0)";
      planet.element.style.transition = "all 0.5s ease-out";
      planet.element.style.opacity = "1";
    }
  });

  // 창 크기 변경 감지
  const handleResize = () => {
    const newIsDesktop = window.matchMedia("(min-width: 1280px)").matches;
    if (newIsDesktop !== isDesktop) {
      // 화면 크기가 변경되면 페이지를 다시 로드하여 새 설정 적용
      window.location.reload();
    }
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(scrollY / maxScroll, 1);
    
    // 태양 위치 업데이트
    const currentSunTop = sunInitialTop - (sunInitialTop - sunTargetTop) * scrollProgress;
    sun.style.top = `${currentSunTop}%`;

    // 행성 위치 업데이트
    planets.forEach((planet) => {
      if (!planet.element) return;

      const currentTop = planet.startTop + (planet.targetTop - planet.startTop) * scrollProgress;
      const currentLeft = planet.startLeft + (planet.targetLeft - planet.startLeft) * scrollProgress;

      planet.element.style.top = `${currentTop}%`;
      planet.element.style.left = `${currentLeft}%`;
    });
  };

  // 이벤트 리스너 등록
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);

  // 초기 위치 설정
  handleScroll();

  // 클린업 함수 반환
  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
  };
}
