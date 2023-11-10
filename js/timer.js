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

const setTrashIcon = () => {
  const icons = $d.querySelectorAll("g.blocklyTrash image");
  const clipPaths = $d.querySelectorAll("g.blocklyTrash clipPath rect");
  clipPaths[0].setAttribute("width", "90");
  clipPaths[0].setAttribute("height", "80");
  clipPaths[1].setAttribute("width", "90");
  clipPaths[1].setAttribute("height", "18");
  icons.forEach((icon) => {
    icon.setAttribute(
      "xlink:href",
      "https://cdn-umake.s3.us-east-2.amazonaws.com/wp-content/uploads/2023/11/09214958/trash.png"
    );
    icon.setAttribute("height", "150");
  });
};

export { startTimer, setGemsText, setTrashIcon };
