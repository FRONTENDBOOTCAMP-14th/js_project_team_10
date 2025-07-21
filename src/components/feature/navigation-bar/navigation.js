const navContainer = document.querySelector(".nav-container");

let scrollDown = false;
let lastScrollTop = 0;

const handleScroll = throttle(() => {
  console.log("스크롤 위치 = ", window.scrollY);
  const currentScroll = window.scrollY || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    if (!scrollDown) {
      scrollDown = true;
    }
    console.log("scroll Down");
  } else {
    if (scrollDown) {
      scrollDown = false;
    }
    console.log("scroll Up");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

  if (scrollDown) {
    navContainer.classList.add("hide-nav");
  } else {
    navContainer.classList.remove("hide-nav");
  }
});

window.addEventListener("scroll", handleScroll);

function throttle(callback, timeout = 300) {
  let timer = null;
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        callback(...args);
        timer = null;
      }, timeout);
    }
  };
}

// 섹션 이동시 네비게이션 focus 이동
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("div[id]");
  console.log(sections);
  const navLinks = document.querySelectorAll(".nav-link");
  console.log(navLinks);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        console.log(entries);
        const id = entry.target.getAttribute("id");
        const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("active"));
          if (navLink) navLink.classList.add("active");
        }
      });
    },
    {
      threshold: 0.6, // 섹션이 80% 이상 보이면 활성화
    }
  );

  sections.forEach((section) => observer.observe(section));
});
