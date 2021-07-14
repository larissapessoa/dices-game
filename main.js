//Dado (retirado da internet e adaptado)
//select the classes we require

let currentClass = '';

//this function will generate a random number between 1 and 6 (or whatever value you send it)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//dice roller function. 
function rollDice(i) {
    let randNum = getRandomInt(1, 7);
    console.log(randNum);
    let rollString = "";
    let diceString = "";

    if (randNum == 1) {
        rollString = "one";
    }
    else if (randNum == 2) {
        rollString = "two";
    }
    else if (randNum == 3) {
        rollString = "three";
    }
    else if (randNum == 4) {
        rollString = "four";
    }
    else if (randNum == 5) {
        rollString = "five";
    }
    else {
        rollString = "six";
    }

    if (i == 0) {
        document.getElementsByClassName("fas fa-dice-one")[0].className = "fas fa-dice-" + rollString;
        setTimeout(function () { document.getElementsByClassName("fas fa-dice-" + rollString)[0].className = "fas fa-dice-one"; }, 2000);
    }
    else if (i == 1) {
        document.getElementsByClassName("fas fa-dice-two")[0].className = "fas fa-dice-" + rollString;
        if (randNum < 2) {
            setTimeout(function () { document.getElementsByClassName("fas fa-dice-" + rollString)[1].className = "fas fa-dice-two"; }, 2000 + i * 50);
        }
        else {
            setTimeout(function () { document.getElementsByClassName("fas fa-dice-" + rollString)[0].className = "fas fa-dice-two"; }, 2000 + i * 50);

        }
    }
    else {
        document.getElementsByClassName("fas fa-dice-three")[0].className = "fas fa-dice-" + rollString;
        if (randNum < 3) {
            setTimeout(function () { document.getElementsByClassName("fas fa-dice-" + rollString)[1].className = "fas fa-dice-three"; }, 2000 + i*50);
        }
        else {
            setTimeout(function () { document.getElementsByClassName("fas fa-dice-" + rollString)[0].className = "fas fa-dice-three"; }, 2000 + i * 50);
        }
    }
    return randNum;
}

//creates new player for tournament
function jogador(nome) {
    this.nome = nome;
    this.pontuacao = 0;
}

//declares player list
let listaJogadores = [];

//adds new player
function adicionarJogador(NovoJogador){ //max 4 jogadores
    if(listaJogadores.length <= 3){
        listaJogadores.push(new jogador(NovoJogador));
    }else{
        //mensagem de lista cheia
    }
    console.log(listaJogadores);
}

//removes player from players list
function removerJogador(index) {
    listaJogadores.splice(index, 1);
}



let rodadaAtual = 1;
let indexJogadorAtual = 0; //current player

//updates score for user
function atualizarPlacar() {
    if (indexJogadorAtual == 0) {
        document.getElementById("player-one-score").innerHTML = listaJogadores[indexJogadorAtual].pontuacao.toString() + " pontos";
    }
    else if (indexJogadorAtual == 1) {
        document.getElementById("player-two-score").innerHTML = listaJogadores[indexJogadorAtual].pontuacao.toString() + " pontos";
    }
    else if (indexJogadorAtual == 2) {
        document.getElementById("player-three-score").innerHTML = listaJogadores[indexJogadorAtual].pontuacao.toString() + " pontos";
    }
    else {
        document.getElementById("player-four-score").innerHTML = listaJogadores[indexJogadorAtual].pontuacao.toString() + " pontos";
    }
}

//updates rounds count for user
function atualizarRodada() {
    document.getElementById("rodada-atual").innerHTML = "Rodada " + rodadaAtual.toString() + " de " + numRodadas.toString();
}

//changes current player
function proximoJogador(){
    if(indexJogadorAtual+1 < listaJogadores.length){
        indexJogadorAtual = indexJogadorAtual + 1;
    }else{
        indexJogadorAtual = 0;
        rodadaAtual = rodadaAtual + 1;
        if (rodadaAtual <= numRodadas) {
            atualizarRodada();
        }
    }
    console.log("Jogador atual: " + listaJogadores[indexJogadorAtual].nome);
}

//returns highest scoring player and removes him from player list
function vencedor() {
    let maiorPontuacao = 0;
    let indexMaior = 0;
    for (i = 0; i < listaJogadores.length; i++) {
        if (listaJogadores[i].pontuacao > maiorPontuacao) {
            maiorPontuacao = listaJogadores[i].pontuacao;
            indexMaior = i;
        }
    }
    let vencedor = listaJogadores[indexMaior];
    removerJogador(indexMaior);
    console.log(vencedor);
    return vencedor;
    //tratar empate*

}

//final results needed variables
let primeiroColocado;
let segundoColocado;
let terceiroColocado;
let quartoColocado;


//This function saves all players names and scores and switches html page to the final results
function fimDeJogo() {
    primeiroColocado = vencedor();
    localStorage.setItem("primeiroColocadoNome", primeiroColocado.nome);
    localStorage.setItem("primeiroColocadoPontuacao", primeiroColocado.pontuacao);
    if (numJogadores == 4) {
        segundoColocado = vencedor();
        terceiroColocado = vencedor();
        quartoColocado = vencedor();

        localStorage.setItem("segundoColocadoNome", segundoColocado.nome);
        localStorage.setItem("terceiroColocadoNome", terceiroColocado.nome);
        localStorage.setItem("quartoColocadoNome", quartoColocado.nome);
        localStorage.setItem("segundoColocadoPontuacao", segundoColocado.pontuacao);
        localStorage.setItem("terceiroColocadoPontuacao", terceiroColocado.pontuacao);
        localStorage.setItem("quartoColocadoPontuacao", quartoColocado.pontuacao);
    }
    else if (numJogadores == 3) {
        segundoColocado = vencedor();
        terceiroColocado = vencedor();
        localStorage.setItem("segundoColocadoNome", segundoColocado.nome);
        localStorage.setItem("terceiroColocadoNome", terceiroColocado.nome);
        localStorage.setItem("segundoColocadoPontuacao", segundoColocado.pontuacao);
        localStorage.setItem("terceiroColocadoPontuacao", terceiroColocado.pontuacao);
    }
    else {
        segundoColocado = vencedor();
        localStorage.setItem("segundoColocadoNome", segundoColocado.nome);
        localStorage.setItem("segundoColocadoPontuacao", segundoColocado.nome);
    }


    window.location.href = "finalresults.html";

}


//dice rolls and score calculation function
function lancarDado(){
    if (listaJogadores.length > 0) {
        if (rodadaAtual <= numRodadas) {
            let i = 0;
            let ultimoLancamento = 0;
            while (i < numDados) {
                ultimoLancamento = rollDice(i);
                listaJogadores[indexJogadorAtual].pontuacao = listaJogadores[indexJogadorAtual].pontuacao + ultimoLancamento;
                i = i + 1;
            }  
            atualizarPlacar();
            proximoJogador(); 
        }
        else {
            fimDeJogo();
        } 
    }else{
        //faz nada
        console.log("Sem jogadores!");
    }
}

//default values
let numDados = 1;
let numJogadores = 2;
let numRodadas = 5;
let nomeJogador1 = "";
let nomeJogador2 = "";
let nomeJogador3 = "";
let nomeJogador4 = "";

//start page game settings detection
document.getElementById("one-dice").onclick = function (e) {
    numDados = 1;
    localStorage.setItem("numDados", numDados);
};

document.getElementById("two-dices").onclick = function (e) {
    numDados = 2;
    localStorage.setItem("numDados", numDados);
};

document.getElementById("three-dices").onclick = function (e) {
    numDados = 3;
    localStorage.setItem("numDados", numDados);
};

document.getElementById("five-rounds").onclick = function (e) {
    numRodadas = 5;
    localStorage.setItem("numRodadas", numRodadas);
};

document.getElementById("six-rounds").onclick = function (e) {
    numRodadas = 6;
    localStorage.setItem("numRodadas", numRodadas);
};

document.getElementById("seven-rounds").onclick = function (e) {
    numRodadas = 7;
    localStorage.setItem("numRodadas", numRodadas);
};

document.getElementById("eight-rounds").onclick = function (e) {
    numRodadas = 8;
    localStorage.setItem("numRodadas", numRodadas);
};

document.getElementById("nine-rounds").onclick = function (e) {
    numRodadas = 9;
    localStorage.setItem("numRodadas", numRodadas);
};

document.getElementById("ten-rounds").onclick = function (e) {
    numRodadas = 10;
    localStorage.setItem("numRodadas", numRodadas);
};

document.getElementById("two-players").onclick = function (e) {
    numJogadores = 2;
    localStorage.setItem("numJogadores", numJogadores);
};

document.getElementById("three-players").onclick = function (e) {
    numJogadores = 3;
    localStorage.setItem("numJogadores", numJogadores);
};

document.getElementById("four-players").onclick = function (e) {
    numJogadores = 4;
    localStorage.setItem("numJogadores", numJogadores);
};

function adicionarJogadores() { //max 4 jogadores
    nomeJogador1 = document.getElementById("player-one").value;
    nomeJogador2 = document.getElementById("player-two").value;
    nomeJogador3 = document.getElementById("player-three").value;
    nomeJogador4 = document.getElementById("player-four").value;

    localStorage.setItem("nomeJogador1", nomeJogador1);
    localStorage.setItem("nomeJogador2", nomeJogador2);
    localStorage.setItem("nomeJogador3", nomeJogador3);
    localStorage.setItem("nomeJogador4", nomeJogador4);
}

//loads all settings from start page
function onloadTournamentData() {
    nomeJogador1 = localStorage.getItem("nomeJogador1");
    nomeJogador2 = localStorage.getItem("nomeJogador2");
    nomeJogador3 = localStorage.getItem("nomeJogador3");
    nomeJogador4 = localStorage.getItem("nomeJogador4");
    numDados = parseInt(localStorage.getItem("numDados"));
    numJogadores = parseInt(localStorage.getItem("numJogadores"));
    numRodadas = parseInt(localStorage.getItem("numRodadas"));
   
    document.getElementById("rodada-atual").innerHTML = "Rodada 1 de " + numRodadas.toString();
    
    if (numDados == 2) {
        document.getElementsByClassName("fas fa-dice-three")[0].className = "";
    }
    else if (numDados == 1) {
        document.getElementsByClassName("fas fa-dice-three")[0].className = "";
        document.getElementsByClassName("fas fa-dice-two")[0].className = "";
    }

    document.getElementById("player-one").innerHTML = nomeJogador1;
    if (numJogadores == 4) {
        document.getElementById("player-four").innerHTML = nomeJogador4;
        document.getElementById("player-three").innerHTML = nomeJogador3;
        document.getElementById("player-two").innerHTML = nomeJogador2;
        adicionarJogador(nomeJogador1);
        adicionarJogador(nomeJogador2);
        adicionarJogador(nomeJogador3);
        adicionarJogador(nomeJogador4);
    }
    else if (numJogadores == 3) {
        document.getElementById("player-four").innerHTML = "";
        document.getElementById("player-four-score").innerHTML = "";
        document.getElementById("player-three").innerHTML = nomeJogador3;
        document.getElementById("player-two").innerHTML = nomeJogador2;
        adicionarJogador(nomeJogador1);
        adicionarJogador(nomeJogador2);
        adicionarJogador(nomeJogador3);
    }
    else {
        document.getElementById("player-four").innerHTML = "";
        document.getElementById("player-four-score").innerHTML = "";
        document.getElementById("player-three").innerHTML = "";
        document.getElementById("player-three-score").innerHTML = "";
        document.getElementById("player-two").innerHTML = nomeJogador2;
        adicionarJogador(nomeJogador1);
        adicionarJogador(nomeJogador2);
    }

    console.log(numJogadores);
    console.log(nomeJogador1);
    console.log(nomeJogador2);
    console.log(nomeJogador3);
    console.log(nomeJogador4);
    console.log(numDados);
    console.log(numRodadas);
    console.log(listaJogadores);
}

//loads all players names and scores from tournament html page
function onloadFinalResultsData() {
    numJogadores = parseInt(localStorage.getItem("numJogadores"));
    primeiroColocado = [localStorage.getItem("primeiroColocadoNome"), localStorage.getItem("primeiroColocadoPontuacao")];

    document.getElementById("first-place").innerHTML = primeiroColocado[0];
    document.getElementById("first-place-score").innerHTML = primeiroColocado[1] + " pontos";


    if (numJogadores == 4) {
        quartoColocado = [localStorage.getItem("quartoColocadoNome"), localStorage.getItem("quartoColocadoPontuacao")];
        terceiroColocado = [localStorage.getItem("terceiroColocadoNome"), localStorage.getItem("terceiroColocadoPontuacao")];
        segundoColocado = [localStorage.getItem("segundoColocadoNome"), localStorage.getItem("segundoColocadoPontuacao")];

        document.getElementById("fourth-place").innerHTML = quartoColocado[0];
        document.getElementById("third-place").innerHTML = terceiroColocado[0];
        document.getElementById("second-place").innerHTML = segundoColocado[0];
        document.getElementById("fourth-place-score").innerHTML = quartoColocado[1] + " pontos";
        document.getElementById("third-place-score").innerHTML = terceiroColocado[1] + " pontos";
        document.getElementById("second-place-score").innerHTML = segundoColocado[1] + " pontos";
    }
    else if (numJogadores == 3) {
        terceiroColocado = [localStorage.getItem("terceiroColocadoNome"), localStorage.getItem("terceiroColocadoPontuacao")];
        segundoColocado = [localStorage.getItem("segundoColocadoNome"), localStorage.getItem("segundoColocadoPontuacao")];

        document.getElementById("fourth-place").innerHTML = "";
        document.getElementById("fourth-place-score").innerHTML = "";

        document.getElementById("third-place").innerHTML = terceiroColocado[0];
        document.getElementById("second-place").innerHTML = segundoColocado[0];
        document.getElementById("third-place-score").innerHTML = terceiroColocado[1] + " pontos";
        document.getElementById("second-place-score").innerHTML = segundoColocado[1] + " pontos";
    }
    else {
        segundoColocado = [localStorage.getItem("segundoColocadoNome"), localStorage.getItem("segundoColocadoPontuacao")];

        document.getElementById("fourth-place").innerHTML = "";
        document.getElementById("fourth-place-score").innerHTML = "";
        document.getElementById("third-place").innerHTML = "";
        document.getElementById("third-place-score").innerHTML = "";

        document.getElementById("second-place").innerHTML = segundoColocado[0];
        document.getElementById("second-place-score").innerHTML = segundoColocado[1] + " pontos";
    }
}