(function () {
  const offCanvas = document.createElement("div");
  offCanvas.className = "donggle__offcanvas";
  offCanvas.innerHTML = `
    <div class="donggle__overlay"></div>
    <div class="donggle__content">
      <button class="donggle__close">&times;</button>
      <div class="donggle__header">
        <h2 class="donggle__title">Section 3 구조 및 기능 설명</h2>
      </div>
      <div class="donggle__body">
        <section class="donggle__section">
          <h3 class="donggle__section-title">1. 애플리케이션 구조</h3>
          <pre class="donggle__code">
page.html (진입점)
├── page-1-main/
│   ├── page-1-main.js
│   └── ...
├── page-2-sun-tracking/
│   ├── sun-tracking.js
│   └── ...
└── routing.js (라우팅 핵심 로직)
    └── page-3-solar/
        ├── routing.js (섹션3 컴포넌트 라우팅)
        ├── layout.js
        ├── transition.js
        ├── hover.js
        ├── modal.js
        ├── modalCarousel.js
        ├── modalCarousel.css
        ├── satellite.js
        ├── planetData.json
        ├── planetPositions.json
        └── satelliteData.json</pre>
        </section>

        <section class="donggle__section">
          <h3 class="donggle__section-title">2. 주요 파일별 기능</h3>
          
          <div class="donggle__file">
            <h4 class="donggle__file-title">2.1 routing.js (메인)</h4>
            <p class="donggle__file-desc">태양계 구성원 소개 페이지의 핵심 로직 처리</p>
            <ul class="donggle__file-features">
              <li>페이지 초기화 및 직접DOM 조작을 통한 컴포넌트 마운트</li>
              <li>이미지 로딩 대기 처리</li>
              <li>하위 컴포넌트 초기화 (hover 효과, 모달, 태양계 애니메이션)</li>
            </ul>
          </div>

          <div class="donggle__file">
            <h4 class="donggle__file-title">2.2 layout.js</h4>
            <p class="donggle__file-desc">태양계 UI의 기본 구조 정의</p>
            <ul class="donggle__file-features">
              <li>태양계 시뮬레이션을 위한 HTML 구조 제공</li>
              <li>행성 버튼 및 SVG 요소 생성</li>
              <li>반응형 레이아웃 구성</li>
            </ul>
          </div>

          <div class="donggle__file">
            <h4 class="donggle__file-title">2.3 transition.js</h4>
            <p class="donggle__file-desc">페이지 전환 및 애니메이션 처리</p>
            <ul class="donggle__file-features">
              <li>부드러운 페이지 전환 효과</li>
              <li>로딩 상태 관리</li>
              <li>애니메이션 타이밍 제어</li>
            </ul>
          </div>

          <div class="donggle__file">
            <h4 class="donggle__file-title">2.4 hover.js</h4>
            <p class="donggle__file-desc">행성 호버 효과 처리</p>
            <ul class="donggle__file-features">
              <li>마우스 오버 시 행성 이미지 전환</li>
              <li>사용자 인터랙션에 따른 시각적 피드백</li>
              <li>이미지 프리로딩으로 부드러운 전환</li>
            </ul>
          </div>

          <div class="donggle__file">
            <h4 class="donggle__file-title">2.5 modal.js</h4>
            <p class="donggle__file-desc">행성 모달 처리</p>
            <ul class="donggle__file-features">
              <li>행성 클릭 시 상세 정보 모달 표시</li>
              <li>모달 열기/닫기 애니메이션</li>
              <li>행성 관련 데이터 표시</li>
            </ul>
          </div>

          <div class="donggle__file">
            <h4 class="donggle__file-title">2.6 modalCarousel.js</h4>
            <p class="donggle__file-desc">행성 모달 내 캐러셀 기능</p>
            <ul class="donggle__file-features">
              <li>행성 상세 이미지 캐러셀 구현</li>
              <li>이미지 전환 애니메이션</li>
              <li>터치/드래그 제스처 지원</li>
            </ul>
          </div>

          <div class="donggle__file">
            <h4 class="donggle__file-title">2.7 satellite.js</h4>
            <p class="donggle__file-desc">위성 모달 처리</p>
            <ul class="donggle__file-features">
              <li>행성 모달 내 위성 이미지 클릭 시 모달 표시</li>
              <li>위성 관련 데이터 표시</li>
              <li>모달 전환 애니메이션</li>
            </ul>
          </div>

          <div class="donggle__file">
            <h4 class="donggle__file-title">2.8 데이터 파일</h4>
            <p class="donggle__file-desc">행성 및 위성 데이터 관리</p>
            <ul class="donggle__file-features">
              <li><strong>planetData.json</strong>: 행성 기본 정보</li>
              <li><strong>planetPositions.json</strong>: 행성 위치 데이터</li>
              <li><strong>satelliteData.json</strong>: 위성 정보</li>
              <li>시뮬레이션에 필요한 정적 데이터 제공</li>
            </ul>
          </div>
        </section>

        <section class="donggle__section">
          <h3 class="donggle__section-title">3. 데이터 흐름</h3>
          <ol class="donggle__flow">
            <li><code>routing.js</code>가 컴포넌트 초기화를 담당</li>
            <li><code>layout.js</code>에서 정의한 UI 구조를 DOM에 마운트</li>
            <li><code>waitForImages</code>를 통해 모든 이미지 로딩 대기</li>
            <li>이미지 로딩 완료 후 호버 효과 및 모달 초기화</li>
            <li><code>transition.js</code>에서 태양계 애니메이션 시작</li>
            <li>사용자 상호작용에 따라 <code>hover.js</code>와 <code>modal.js</code>가 반응</li>
            <li> 필요한 데이터는 <code>planetData.json</code>, <code>satelliteData.json</code> 등에서 동적으로 로드</li>
          </ol>
        </section>
        <section class="donggle__section">
          <h3 class="donggle__section-title">4. 주요 기술 스택</h3>
          <ul class="donggle__tech-list">
            <li><strong>Vanilla JavaScript</strong>: 핵심 로직 처리, 모듈화를 통한 DX 향상</li>
            <li><strong>CSS3</strong>: 스타일링 및 간단한 전환 효과</li>
            <li><strong>JSON</strong>: 정적 데이터 관리</li>
          </ul>
        </section>
      </div>
    </div>
  `;
  document.body.appendChild(offCanvas);

  const toggleButton = document.getElementById("donggle");
  const closeButton = offCanvas.querySelector(".donggle__close");
  const overlay = offCanvas.querySelector(".donggle__overlay");

  function toggleOffCanvas() {
    document.body.classList.toggle("donggle__body--active");
    offCanvas.classList.toggle("donggle__offcanvas--active");
  }

  toggleButton?.addEventListener("click", (e) => {
    e.preventDefault();
    toggleOffCanvas();
  });

  closeButton?.addEventListener("click", toggleOffCanvas);
  overlay?.addEventListener("click", toggleOffCanvas);

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      offCanvas.classList.contains("donggle__offcanvas--active")
    ) {
      toggleOffCanvas();
    }
  });
})();
