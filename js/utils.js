import { movements } from "./movements.js";

const generateNumberAleatory = () => {
  let numeroAleatorio = Math.random();
  numeroAleatorio = numeroAleatorio + 1;
  numeroAleatorio = Math.round(numeroAleatorio);
  return numeroAleatorio;
};

const getPositionsChallengeOne = (index, random) => {
  const isMobile =
    window.innerWidth < 1100 && screen.orientation.type === "landscape-primary";
  const movs = isMobile
    ? movements.mobile.challengeOne[random]
    : movements.web.challengeOne[random];
  return movs[index];
};

const getPositionsChallengeTwo = (index, random) => {
  const isMobile =
    window.innerWidth < 1100 && screen.orientation.type === "landscape-primary";
  const movs = isMobile
    ? movements.mobile.challengeTwo[random]
    : movements.web.challengeTwo[random];
  return movs[index];
};

const getPositionsGems = (index, random) => {
  const isMobile =
    window.innerWidth < 1100 && screen.orientation.type === "landscape-primary";
  const movs = isMobile
    ? movements.mobile.gems[random]
    : movements.web.gems[random];
  return movs[index];
};

const getRefreshRate = () =>
  new Promise((resolve) =>
    requestAnimationFrame((t1) =>
      requestAnimationFrame((t2) => resolve(1000 / (t2 - t1)))
    )
  );

const getSpeed = async () => {
  let refreshRate = await getRefreshRate();
  const isMobile =
    window.innerWidth < 1100 && screen.orientation.type === "landscape-primary";
  if (isMobile) {
    return refreshRate < 65 ? 2600 : 4280;
  } else {
    return refreshRate < 65 ? 3450 : 4280;
  }
};

export {
  generateNumberAleatory,
  getPositionsChallengeOne,
  getPositionsChallengeTwo,
  getPositionsGems,
  getSpeed,
};
