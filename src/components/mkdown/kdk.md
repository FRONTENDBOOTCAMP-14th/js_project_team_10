# 🌌 프로젝트 작업 페이지

## 1. 메인 페이지

### 1-1) 시안

#### 🎨 디자인 구성

![시안 이미지](/md-img/kdk/image-1.png)

- 중심 원을 기준으로 좌우 교차 선 구성
- 하단 `SOLAR SYSTEM`은 SVG 사용
- `span`을 이용한 마크업 구성
- 타원의 궤도를 따라 행성이 공전
- 데스크탑/모바일 함께 구현 (중단점: 1280px)

#### ⚙️ 핵심 구현 포인트

- GSAP + JavaScript로 자연스러운 공전 애니메이션
- 모바일 해상도 다양성 대응

---

### 1-2) 페이지 결과물 & 제작 과정

#### ✅ 결과물

![결과 이미지1](/md-img/kdk/img-2.png)  
![결과 이미지2](/md-img/kdk/img-3.png)

- 서로 다른 크기의 두 개의 공전 궤도 구현
- `<span>` 기반 마크업 + GSAP 애니메이션
- 데스크탑 중심, 모바일은 media query로 대응

#### 🧱 제작 과정

##### 🔸 마크업

- 컴포넌트 기반 구조
- 각 `span`에 class 부여, CSS 디자인 적용
- 마지막 `span`: SVG로 구성된 행성 궤도 포함 (2 path + 2 circle)

##### 🔸 CSS

![CSS 이미지](/md-img/kdk/img-4.png)  
![CSS 이미지](/md-img/kdk/img-5.png)

- 중심 원을 기준으로 요소 배치
- 커스텀 속성 활용 → 위치 계산 자동화

```css
.extend-line-x {
  left: calc(var(--center-left) + var(--center-circle) / 2 - (가로선 너비 / 2));
}
```

##### 🔸 JavaScript

- `GSAP` + `JavaScript`로 SVG 좌표 애니메이션 구현
- 타원 궤도 회전을 수학적으로 보정

```js
// 중심점 회전 좌표 계산
const dx = x - rotateOrigin.x;
const dy = y - rotateOrigin.y;
const rotatedX = rotateOrigin.x + dx * cos - dy * sin;
const rotatedY = rotateOrigin.y + dx * sin + dy * cos;
```

- 경로 진행률 기반 위치 계산
- GSAP timeline으로 등장 애니메이션 설정

---

### 1-3) 어려웠던 점 & 해결 방법

#### 1. 유료 플러그인 문제

- `MotionPathPlugin` → 유료
- 순수 JS + SVG path 좌표 계산으로 대체

#### 2. 궤도 회전 문제

- 각 행성 궤도의 회전 각도가 달라 좌표 어긋남
- 수학적 회전 좌표계 도입으로 해결

---

### 1-4) 개선점 & 아쉬운 점

#### ❗ 렌더링 최적화 부족

- `top/left` 기반 → 리플로우 발생
- `transform` 기반 설계 필요성 느꼈음

#### ❗ 미디어 쿼리 대응의 한계

- 데스크탑 중심 → 모바일 구조화 어려움
- SVG 텍스트 뷰포트 벗어나는 문제 발생

#### 🔧 개선 제안

| 항목            | 개선 방향                                                      |
| --------------- | -------------------------------------------------------------- |
| 레이아웃 렌더링 | `top/left` → `transform: translate` 기반 변경                  |
| 반응형 설계     | `mobile-first` 또는 양방향 대응 구조 설계                      |
| SVG 텍스트      | HTML 요소 또는 `object-fit`, `viewBox` 등 SVG 뷰포트 제한 고려 |

---

## 2. Planet Comparison (행성 비교 페이지)

### 2-1) 시안

#### 🎬 디자인 구성

[행성 비교 시안 영상](/md-img/kdk/img-8.mp4)

- 수성 → 목성 → 태양 순
- 크기 비율 기반 `scale` + `x축 이동` 연출
- 각 행성 회전 애니메이션 포함

---

### 2-2) 페이지 결과물 & 제작 과정

#### ✅ 결과 이미지

![행성 비교1](/md-img/kdk/img-9.png)  
![행성 비교2](/md-img/kdk/img-10.png)  
![행성 비교3](/md-img/kdk/img-11.png)

#### 🔸 마크업

- `<section>` + `<ul>`, `<li>`
- 각 행성: `.planet 행성이름` 클래스 부여

#### 🔸 CSS

![행성 CSS](/md-img/kdk/img-14.png)

```css
.page_5-container::before {
  background-image: url(/planet/universe-background-4.jpg);
  filter: brightness(40%);
}
```

```css
.planet__contents {
  width: max-content;
  display: flex;
  gap: var(--planet-gap);
  padding-left: 20vw;
}
```

- 각 행성의 간격 → 겹침 방지를 위한 margin 조정  
  ![중단점 위치 설정](/md-img/kdk/img-15.png)

#### 🔸 JavaScript

- `ScrollTrigger` → 좌우 스크롤 구현
- 수성 기준 `scale(1)` → 태양 `scale(109)`
- 데스크탑/모바일 애니메이션 로직 분리

![scrolltrigger 코드](/md-img/kdk/img-16.png)  
![행성 회전](/md-img/kdk/img-17.png)  
![기본 set값](/md-img/kdk/img-18.png)  
![타임라인 예시](/md-img/kdk/img-19.png)

---

### 2-3) 어려웠던 점

#### 🚀 새로운 구조 도전

- 수평 스크롤 + 스케일 기반 UI
- scale(1) ~ scale(250)까지 요소 크기 다양
- `transform-origin`으로 위치 기준 조정

#### 🧠 구조 재정립 & 학습

- GSAP의 `ScrollTrigger`, `Timeline` 학습 및 적용
- layout 전면 재구성 3회 이상 반복

#### ⚠️ `scale` 및 좌표 문제

- scale 기준 좌표 제어 어려움
- `transform-origin: bottom left` 활용해 위치 기준 고정

#### ⚠️ drop-shadow 문제

- `drop-shadow` + `transform` 충돌로 성능 저하 발생
- shadow는 등장 시점에만 적용해 해결

---

### 2-4) 개선 방향

| 문제                         | 설명                                    | 개선 방향                            |
| ---------------------------- | --------------------------------------- | ------------------------------------ |
| 타임라인 과도함              | 너무 많은 애니메이션 → 유지 보수 어려움 | lazy load 또는 함수 분리             |
| 정적 좌표 계산               | 해상도 변화 대응 어려움                 | 동적 계산, 상대 좌표 활용            |
| 실물 기반 스케일 → 성능 문제 | 지나치게 큰 요소 생성                   | 정규화된 비율 or 시각 효과 위주 설계 |

---

## 💡 느낀점 및 소감

이번 프로젝트는 단순한 UI 구현을 넘어  
**움직임을 기반으로 한 사용자 경험**,  
**복잡한 좌표계의 설계**,  
**성능 고려한 애니메이션 제어**  
등을 직접 설계하고 경험할 수 있는 과정이었습니다.

GSAP, SVG, 반응형 설계 등 다양한 도구와 기법을 실제 작업에 녹여낼 수 있었으며,  
기술적 도전뿐 아니라 구조적 사고의 필요성을 크게 느낄 수 있는 의미 있는 작업이었습니다.
