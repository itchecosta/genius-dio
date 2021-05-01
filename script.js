let order = []; // ordem
let clickedOrder = []; //ordem dos cliques
let score = 0; // pontuação
let level = 1;

// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

const nivel = document.getElementById('nivel');
const pontos = document.getElementById('pontos');

// cria ordem aleatoria de cores
let shuffleOrder = () => {
    //variável para guardar o número a cada rodada
    let colorOrder = Math.floor(Math.random() * 4);
    //atribuir o valor na próxima posição do array order
    order[order.length] = colorOrder;
    //clique continua vazio
    clickedOrder = [];

    //acender o número sorteado
    for (let i in order) {

        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//acender a próxima cor
let lightColor = (element, number) => {
    number = number * 700;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 450);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number + 350);
}

// comparar se a order das cores clicadas é a mesma order das cores gerada no jogo
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length) {
        score++;
        //alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        scoreTela(score);
        levelTela(score);
        nextlevel();
    }
}

// função para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        soundColorPlay(color);
        checkOrder();
    }, 450);
}

// função que retorna a cor
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
}

// função para próximo nível do jogo
let nextlevel = () => {
    shuffleOrder();
}

// função para game over
let gameOver = () => {
    soundErrorPlay()
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo!`);
    order = [];
    clickedOrder = [];

    playGame();
}

// função de inicio do jogo
let playGame = () => {
    alert(`Bem vindo ao Genius! Iniciando novo jogo!`);
    score = 0;

    scoreTela(score);
    levelTela(score);
    nextlevel();
}

//atualiza pontuação na tela
let scoreTela = (score) => {
    pontos.innerHTML = '0' + score;
}

//atualiza pontuação na tela
let levelTela = (score) => {
    console.log((score / 5));
    level = ((score / 5) >= 1) ? (score / 5) + 1 : 1;
    nivel.innerHTML = '0' + Math.floor(level);
}

// evento de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


// som da cor
let soundColorPlay = (color) => {
    if (color == 0) {
        let audio = new Audio('./audio/blue.wav');
        audio.play();
    } else if (color == 1) {
        let audio = new Audio('./audio/red.wav');
        audio.play();
    } else if (color == 2) {
        let audio = new Audio('./audio/yellow.wav');
        audio.play();
    } else if (color == 3) {
        let audio = new Audio('./audio/green.wav');
        audio.play();
    }
}

let soundErrorPlay = () => {
    let audio = new Audio('./audio/error.wav');
    audio.play();
}

// inicio do jogo
playGame();