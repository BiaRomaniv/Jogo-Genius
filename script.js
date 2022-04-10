const buttonWelcome = document.querySelectorAll("button.go");
const buttonRestart = document.querySelectorAll("button.restart");

const modalHello = document.querySelector(".modal-wrapper");
const modalLose = document.querySelector(".modal-wrapper.lose");

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

let order = [];
let clickedOrder = [];
let score = 0;

//cria ordem aletoria de cores
let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4); //numeros inteiros aleatórios
  order[order.length] = colorOrder; //define a ordem das cores
  clickedOrder = []; // inicializa zerado

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
};

//acende a proxima cor
let lightColor = (element, number) => {
  number = number * 500;

  setTimeout(() => {
    element.classList.add("selected");
  }, number - 250);
  setTimeout(() => {
    element.classList.remove("selected");
  }, number - 100);
};

let click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add("selected");
  createColorElement(color).classList.remove("selected");

  checkOrder();
};
//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      gameOver();
      break;
    }
  }

  for (let i in clickedOrder) {
    if (clickedOrder.length == order.length) {
      alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
      nextLevel();
    }
  }
};

//funcao para o clique do usuario selecionar a cor e causar a opacity

//funcao que retorna a cor
let createColorElement = (color) => {
  if (color == 0) {
    return green;
  } else if (color == 1) {
    return red;
  } else if (color == 2) {
    return yellow;
  } else if (color == 3) {
    return blue;
  }
};

//funcao para proximo nivel do jogo
let nextLevel = () => {
  score++;
  shuffleOrder();
};

//funcao para game over
let gameOver = () => {
  modalLose.classList.add("active");
  point.innerHTML = `${score}`;

  buttonRestart.forEach((button) => {
    button.addEventListener("click", (event) => {
      modalLose.classList.remove("active");
    });
  });
  order = [];
  clickedOrder = [];
  playGame();
};

//funcao de inicio do jogo
let playGame = () => {
  modalHello.classList.add("active");
  score = 0;
};

let goGame = () => {
  modalHello.classList.remove("active");
  nextLevel();
};

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//inicio do jogo
playGame();
