const $d = document;

let minutes = 0;
let seconds = 0;
let minutesText = "";
let secondText = "";

const timer = $d.querySelector("div.timer span");
const gems = $d.querySelector("span#show_gemas");

const startTimer = () => {
  setInterval(() => {
    seconds = seconds < 59 ? seconds + 1 : 0;
    minutes = seconds === 0 ? minutes + 1 : minutes;
    minutesText = minutes.toString().padStart(2, 0);
    secondText = seconds.toString().padStart(2, 0);
    timer.innerHTML = `${minutesText}:${secondText}`;
  }, 1000);
};

const setGemsText = (number) => {
  gems.textContent = `${number}/3`;
};

export { startTimer, setGemsText };
