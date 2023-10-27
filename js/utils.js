const generateNumberAleatory = () => {
  let numeroAleatorio = Math.random();
  numeroAleatorio = numeroAleatorio + 1;
  numeroAleatorio = Math.round(numeroAleatorio);
  return numeroAleatorio;
};

export { generateNumberAleatory };
