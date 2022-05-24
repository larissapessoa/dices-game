var dadosPositionImage = [
  "./images/d1.png",
  "./images/d2.png",
  "./images/d3.png",
  "./images/d4.png",
  "./images/d5.png",
  "./images/d6.png",
];

var dadosPositionNumber = [0, 0, 0, 0, 0, 0];

var numberPlayers = 0;

var actualPlayerIndex = 0;

var playerPoints = [];

var numberRodadas = 0;

var actualRodada = 0;

var indexRodada = 0;

var numberDados = 0;

var listDados = [];

let diceRollingSound = new Audio("diceRollingSound.wav");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function init() {
  console.log("Hola");
  numberPlayers = localStorage.getItem("numberPlayers");
  actualPlayerIndex = 0;
  playerPoints = Array.from({ length: numberPlayers }, (_, i) => 0);
  numberRodadas = localStorage.getItem("numberRounds");
  numberDados = localStorage.getItem("numberDices");

  listDados = Array.from({ length: numberDados }, (_, i) => 0);

  document.getElementById("current-round").innerHTML = `Rodada ${
    actualRodada + 1
  }`;

  for (var i = 0; i < numberDados; i++) {
    var image = document.createElement("img");
    image.src = "./images/d1.png";
    image.id = `numberdado-${i + 1}`;
    document.getElementById("dados").appendChild(image);
  }
  for (var i = 0; i < numberPlayers; i++) {
    var p = document.createElement(`p`);
    p.textContent = `Jogador ${i + 1} - 0 Pontos`;
    p.id = `player-${i + 1}`;
    document.getElementById("players").appendChild(p);
  }
}

function adicionarJogadores() {
  //max 4 jogadores
  playersNames = [];
  numberPlayers = document.getElementById("players").value;
  numberDices = document.getElementById("dices").value;
  numberRounds = document.getElementById("rounds").value;

  localStorage.setItem("numberPlayers", numberPlayers);
  localStorage.setItem("numberDices", numberDices);
  localStorage.setItem("numberRounds", numberRounds);
}

function playerWinnerName() {
  var indexPlayer = -1;
  var maxValue = -1;

  for (var i = 0; i < numberPlayers; i++) {
    if (playerPoints[i] > maxValue) {
      maxValue = playerPoints[i];
      indexPlayer = [i];
    }
  }
  return { index: parseInt(indexPlayer), pontos: maxValue };
}

async function rolarDados() {
  if (actualRodada >= numberRodadas - 1) {
    var player = playerWinnerName();
    window.alert(
      `Jogo acabou! Jogador ${player.index + 1}, pontos: ${player.pontos} `
    );
    return;
  }

  const waitFor = (delay) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < numberDados; j++) {
      var aleatorio = getRandomInt(1, 6);
      listDados[j] = aleatorio;

      document.getElementById(`numberdado-${j + 1}`).src =
        dadosPositionImage[aleatorio - 1];
      await waitFor(100);
    }
  }

  var soma = listDados.reduce(function (soma, i) {
    return soma + i;
  });

  playerPoints[actualPlayerIndex] += soma;

  document.getElementById(
    `player-${actualPlayerIndex + 1}`
  ).textContent = `Jogador ${actualPlayerIndex + 1} - ${
    playerPoints[actualPlayerIndex]
  } Pontos`;

  actualPlayerIndex += 1;

  if (actualPlayerIndex + 1 > numberPlayers) {
    actualRodada += 1;

    document.getElementById("current-round").innerHTML = `Rodada ${
      actualRodada + 1
    }`;
  }

  actualPlayerIndex = actualPlayerIndex % numberPlayers;
}
