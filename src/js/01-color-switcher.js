const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

let timerId = null;
refs.stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

refs.startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    if (refs.startBtn) {
      document.body.style.backgroundColor = getRandomHexColor();
      refs.startBtn.disabled = true;
      refs.stopBtn.disabled = false;
    }
  }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  refs.startBtn.disabled = false;
});
