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

const setTrashIcon = (challenge) => {
  const icons = $d.querySelectorAll("g.blocklyTrash image");
  const clipPaths = $d.querySelectorAll("g.blocklyTrash clipPath rect");
  const nameChallenge = $d.querySelector("div.injectionDiv");
  clipPaths[0].setAttribute("width", "90");
  clipPaths[0].setAttribute("height", "90");
  clipPaths[1].setAttribute("width", "90");
  clipPaths[1].setAttribute("height", "25");
  icons.forEach((icon) => {
    icon.setAttribute("xlink:href", "../assets/ui/borrar.png");
    icon.setAttribute("height", "60");
    icon.setAttribute("width", "60");
    icon.setAttribute("x", "0");
    icon.setAttribute("y", "0");
  });
  nameChallenge.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="name_challenge">
       RETO
       <span>${challenge}</span>
    </div>
  `
  );
};

export { startTimer, setGemsText, setTrashIcon };
