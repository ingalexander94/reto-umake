const generateNumberAleatory = () => {
  let numeroAleatorio = Math.random();
  numeroAleatorio = numeroAleatorio + 1;
  numeroAleatorio = Math.round(numeroAleatorio);
  return numeroAleatorio;
};

const getPositionsChallengeOne = (index) => {
  const movements = [
    [220, 75],
    [290, 370],
    [140, 150],
    [160, 300],
    [370, 180],
  ];
  return movements[index];
};

const getPositionsChallengeTwo = (index) => {
  const movements = [
    [295, 360],
    [355, 220],
    [100, 150],
    [300, 90],
    [10, 400],
  ];
  return movements[index];
};

const getPositionsGems = (index) => {
  const movements = [
    [220, 85],
    [140, 360],
    [20, 240],
  ];
  return movements[index];
};

export {
  generateNumberAleatory,
  getPositionsChallengeOne,
  getPositionsChallengeTwo,
  getPositionsGems,
};
