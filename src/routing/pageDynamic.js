import { TitleTransition } from '../components/feature/hero/TitleTransition.js';

// HeroSection의 h1 요소에 TitleTransition 애니메이션 적용
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    const titleTransition = new TitleTransition('.hero__title', {
      duration: 800,    // 0.8초 동안 애니메이션
      delay: 300        // 0.3초 후에 애니메이션 시작
    });
    titleTransition.play();
  }
});