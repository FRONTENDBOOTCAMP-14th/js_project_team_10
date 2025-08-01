

document.querySelectorAll('.space-box-1').forEach(spaceBox11 => {
  const infoBox11 = spaceBox11.querySelector('.info');

  spaceBox11.addEventListener('mouseenter', () => {
    infoBox11.style.display = 'block'; 
    fcall(infoBox11);
  });

  spaceBox11.addEventListener('mouseleave', () => {
    infoBox11.style.display = 'none';
    infoBox11.style.transform = 'translateX(-50%)'; 
  });
});

function fcall(infoBox11) {
  const rect = infoBox11.getBoundingClientRect();

  // 왼쪽 넘침
  if (rect.left < 0) {
    const minus = -rect.left + 15;  //여유분 15px
    infoBox11.style.transform = `translateX(calc(-50% + ${minus}px))`;
  }

  // 오른쪽 넘침
  else if (rect.right > window.innerWidth) {
    const minus = rect.right - window.innerWidth + 15;  //여유분 15px
    infoBox11.style.transform = `translateX(calc(-50% - ${minus}px))`;
  }
  else {
    infoBox11.style.transform = 'translateX(-50%)';
  }
}
