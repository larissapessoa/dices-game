//Dado (retirado da internet e adaptado)
//select the classes we require
let cube = document.querySelector('.cube');
let rollBtn = document.querySelector('.rollBtn');
let currentClass = '';

//this function will generate a random number between 1 and 6 (or whatever value you send it)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//our main roll dice function on click
/*function rollDice() {
    let randNum = getRandomInt(1,7); 
    console.log(randNum )
    let showClass = 'show-' + randNum;
    console.log(showClass)
    if ( currentClass ) {
        cube.classList.remove( currentClass );
    }
    //cube.classList.add( showClass );
    //set the current class to the randomly generated number
    currentClass = showClass;
    return randNum;
}*/

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
        setTimeout(function () { document.getElementsByClassName("fas fa-dice-" + rollString)[0].className = "fas fa-dice-one"; }, 5000);
    }
    else if (i == 1) {
        document.getElementsByClassName("fas fa-dice-two")[0].className = "fas fa-dice-" + rollString;
        if (randNum < 2) {
            setTimeout(function () { document.getElementsByClassName("fas fa-dice-" + rollString)[1].className = "fas fa-dice-two"; }, 5000);
        }
        else {
            setTimeout(function () { document.getElementsByClassName("fas fa-dice-" + rollString)[0].className = "fas fa-dice-two"; }, 5000);

        }
    }
    else {
        document.getElementsByClassName("fas fa-dice-three")[0].className = "fas fa-dice-" + rollString;
        if (randNum < 3) {
            setTimeout(function () { document.getElementsByClassName("fas fa-dice-" + rollString)[1].className = "fas fa-dice-three"; }, 5000);
        }
        else {
            setTimeout(function () { document.getElementsByClassName("fas fa-dice-" + rollString)[0].className = "fas fa-dice-three"; }, 5000);

        }
    }
    return randNum;
}
// set initial side
rollDice();
//----------------------------------------------------------------------------------------------------------------------//

//Jogadores
function jogador(nome) {
    this.nome = nome;
    this.pontuacao = 0;
}

let listaJogadores = [];

function adicionarJogador(NovoJogador){ //max 4 jogadores
    if(listaJogadores.length <= 3){
        listaJogadores.push(new jogador(NovoJogador));
    }else{
        //mensagem de lista cheia
    }
    console.log(listaJogadores);
}

function vencedor(){ //retorna o objeto do jogador com maior pontuacao
    let maiorPontuacao = 0;
    let indexMaior = 0;
    for(i=0; i<4; i++){
        if(listaJogadores[i].pontuacao > maiorPontuacao){
            maiorPontuacao = listaJogadores[i].pontuacao;
            indexMaior = i;
        }
    }
    return listaJogadores[indexMaior];
    //tratar empate*

}

//Lançamentos
let qtdLancamentos = 0; //parametro
let indexJogadorAtual = 0; //jogador jogando no momento]

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
        document.getElementById("player-one-score").innerHTML = listaJogadores[indexJogadorAtual].pontuacao.toString() + " pontos";
    }
}

function proximoJogador(){
    if(indexJogadorAtual+1 < listaJogadores.length){
        indexJogadorAtual = indexJogadorAtual + 1;
    }else{
        indexJogadorAtual = 0;
    }
    console.log("Jogador atual: " + listaJogadores[indexJogadorAtual].nome);
}

function lancarDado(){
    if(listaJogadores.length > 0){
        if(qtdLancamentos <= numRodadas*numDados*listaJogadores.length){
            let i = 0;
            let ultimoLancamento = 0;
            while (i < numDados) {
                ultimoLancamento = rollDice(i);
                listaJogadores[indexJogadorAtual].pontuacao = listaJogadores[indexJogadorAtual].pontuacao + ultimoLancamento;
                i = i + 1;
            }  
            qtdLancamentos = qtdLancamentos + numDados;
            atualizarPlacar();
            proximoJogador(); 
        }else{
            let vencedor = Vencedor();
            console.log("Vencedor é: " + vencedor);
        } 
    }else{
        //faz nada
        console.log("Sem jogadores!");
    }
}
//rollBtn.addEventListener("click", lancarDado); //listenter do clique

//geral
function ResetarJogo(){
    vencedor = [];
    indexJogadorAtual = 0;
    qtdLancamentos = 0;
}

let numDados = 2;
let numJogadores = 2;
let numRodadas = 5;
let nomeJogador1 = "";
let nomeJogador2 = "";
let nomeJogador3 = "";
let nomeJogador4 = "";

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

function onloadTournamentData() {
    nomeJogador1 = localStorage.getItem("nomeJogador1");
    nomeJogador2 = localStorage.getItem("nomeJogador2");
    nomeJogador3 = localStorage.getItem("nomeJogador3");
    nomeJogador4 = localStorage.getItem("nomeJogador4");
    numDados = localStorage.getItem("numDados");
    numJogadores = localStorage.getItem("numJogadores");
    numRodadas = localStorage.getItem("numRodadas");
   
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
    else if (numJogadores == 2) {
        document.getElementById("player-four").innerHTML = "";
        document.getElementById("player-four-score").innerHTML = "";
        document.getElementById("player-three").innerHTML = "";
        document.getElementById("player-three-score").innerHTML = "";
        document.getElementById("player-two").innerHTML = nomeJogador2;
        adicionarJogador(nomeJogador1);
        adicionarJogador(nomeJogador2);
    }
    else {
        document.getElementById("player-four").innerHTML = "";
        document.getElementById("player-four-score").innerHTML = "";
        document.getElementById("player-three").innerHTML = "";
        document.getElementById("player-three-score").innerHTML = "";
        document.getElementById("player-two").innerHTML = "";
        document.getElementById("player-two-score").innerHTML = "";
        adicionarJogador(nomeJogador1);
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