# 프로젝트 구조 및 기능 설명

## 1. 애플리케이션 구조

```
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
        └── satelliteData.json
```

## 2. 주요 파일별 기능 설명

### 2.1 page.html

- **위치**: `/src/routing/page.html`
- **역할**: 애플리케이션의 메인 진입점
- **주요 기능**:
  - 기본 HTML 구조 정의
  - 필요한 CSS/JS 파일 로드
  - 각 섹션을 위한 컨테이너 제공
  - GSAP 애니메이션 라이브러리 로드

### 2.2 routing.js (메인)

- **위치**: `/src/components/page-3-solar/routing.js`
- **역할**: 태양계 구성원 소개 페이지의 핵심 로직 처리
- **주요 기능**:
  - 페이지 초기화 및 직접DOM 조작을 통한 컴포넌트 마운트(innerHtml)
  - 이미지 로딩 대기 처리
  - 하위 컴포넌트 초기화 (hover 효과, 모달, 태양계 애니메이션)
  - `waitForImages` 함수를 통한 이미지 로딩 완료 보장
  - 각종 이벤트 리스너 초기화

### 2.3 modalCarousel.js

- **위치**: `/src/components/page-3-solar/modalCarousel.js`
- **역할**: 행성 모달 내 캐러셀 기능 처리
- **주요 기능**:
  - 행성 상세 정보 이미지 캐러셀 구현
  - 이미지 전환 애니메이션 처리
  - 터치/드래그 제스처 지원

### 2.4 layout.js

- **역할**: 태양계 시뮬레이션 페이지의 UI 구조 정의
- **주요 기능**:
  - HTML 템플릿 반환
  - 태양계 시각화를 위한 기본 구조 제공
  - 행성 및 위성 표시를 위한 컨테이너 구성

### 2.5 transition.js

- **역할**: 태양계 시뮬레이션 페이지의 UI 구조 정의
- **주요 기능**:
  - 태양계 애니메이션 초기화 및 관리
  - 행성 궤도 및 움직임 시뮬레이션

### 2.6 hover.js

- **주요 기능**:
  - 행성 호버 효과 처리
  - ::hover의 호버의 경우, 직접 DOM 조작을 통해 로드되어 있는 이미지 변환
  - 사용자 인터랙션에 따른 시각적 피드백 제공

### 2.7 modal.js

- **역할**: 행성 모달 처리 및 UI 구조 정의
- **주요 기능**:
  - 행성 클릭 시 상세 정보 모달 표시
  - 모달 열기/닫기 애니메이션 처리
  - 행성 관련 데이터 표시

### 2.8 satellite.js

- **역할**: 위성 모달 처리 및 UI 구조 정의
- **주요 기능**:
  - 행성 모달 내 위성 이미지 클릭 시 위성 모달 표시
  - 위성 모달 열기/닫기 애니메이션 처리
  - 위성 관련 데이터 표시

### 2.9 planetData.json / planetPositions.json / satelliteData.json

- **데이터 파일**:
  - 행성 및 위성의 위치, 궤도, 크기 등 물리적 특성 데이터 보관
  - 시뮬레이션에 필요한 정적 데이터 제공

### 3. 데이터 흐름

1. `routing.js`가 컴포넌트 초기화를 담당
2. `layout.js`에서 정의한 UI 구조를 DOM에 마운트
3. `waitForImages`를 통해 모든 이미지 로딩 대기
4. 이미지 로딩 완료 후 호버 효과 및 모달 초기화
5. `transition.js`에서 태양계 애니메이션 시작
6. 사용자 상호작용에 따라 `hover.js`와 `modal.js`가 반응
7. 필요한 데이터는 `planetData.json`, `satelliteData.json` 등에서 동적으로 로드

### 4. 주요 기술 스택

- **Vanilla JavaScript**: 핵심 로직 처리, 모듈화를 통한 DX 향상
- **CSS3**: 스타일링 및 간단한 전환 효과
- **JSON**: 정적 데이터 관리
