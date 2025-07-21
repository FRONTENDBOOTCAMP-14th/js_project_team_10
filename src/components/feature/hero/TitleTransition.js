export class TitleTransition {
  constructor(selector, options = {}) {
    this.element = document.querySelector(selector);
    this.duration = options.duration || 1000;
    this.delay = options.delay || 0;
    this.initialized = false;
  }

  init() {
    if (this.initialized || !this.element) return;

    // 초기 스타일 설정
    this.element.style.opacity = "0";
    this.element.style.transform = "translateY(20px)";
    this.element.style.transition = `
      opacity ${this.duration}ms ease-out ${this.delay}ms,
      transform ${this.duration}ms ease-out ${this.delay}ms
    `;

    this.initialized = true;
  }

  play() {
    this.init();

    // 리플로우 강제 발생
    void this.element.offsetWidth;

    // 애니메이션 시작
    this.element.style.opacity = "1";
    this.element.style.transform = "translateY(0)";

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, this.duration + this.delay);
    });
  }

  reset() {
    if (this.element) {
      this.element.style.opacity = "0";
      this.element.style.transform = "translateY(20px)";
    }
  }
}
