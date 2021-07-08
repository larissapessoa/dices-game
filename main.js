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
function rollDice() {
    let randNum = getRandomInt(1,7); 
    console.log(randNum )
    let showClass = 'show-' + randNum;
    console.log(showClass)
    if ( currentClass ) {
        cube.classList.remove( currentClass );
    }
    cube.classList.add( showClass );
    //set the current class to the randomly generated number
    currentClass = showClass;
    return randNum;
}
// set initial side
rollDice();
//----------------------------------------------------------------------------------------------------------------------//

//Jogaroes
function jogador(nome) {
    this.nome = nome;
    this.pontuacao = 0;
}

let listaJogadores = [];

function AdicionarJogador(NovoJogador){ //max 4 jogadores
    if(listaJogadores.length <= 3){
        listaJogadores.push(new jogador(NovoJogador));
    }else{
        //mensagem de lista cheia
    }
    console.log(listaJogadores);
}

function RemoverJogador(jogador){
    if(listaJogadores.length >1){
        let index = listaJogadores.indexOf(jogador.nome == jogador);
        listaJogadores.splice(index, 1);
    }else{
        //mensagem de lista vazia
    }
    console.log(listaJogadores);
}

function Vencedor(){ //retorna o objeto do jogador com maior pontuacao
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
let qtdLancamentosMax = 0; //parametro
let qtdLancamentos = 0; //parametro
let indexJogadorAtual = 0; //jogador jogando no momento

function proximoJogador(){
    if(indexJogadorAtual+1 < listaJogadores.length){
        indexJogadorAtual = indexJogadorAtual + 1;
    }else{
        indexJogadorAtual = 0;
    }
    console.log("Jogador atual: " + listaJogadores[indexJogadorAtual]);
}

function lancarDado(){
    if(listaJogadores.length > 0){
        if(qtdLancamentos <= qtdLancamentosMax*listaJogadores.length){
            let ultimoLancamento = rollDice();
            listaJogadores[indexJogadorAtual].pontuacao = listaJogadores[indexJogadorAtual].pontuacao + ultimoLancamento;
            qtdLancamentos = qtdLancamentos + 1;
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
rollBtn.addEventListener("click", lancarDado); //listenter do clique

//geral
function ResetarJogo(){
    vencedor = [];
    indexJogadorAtual = 0;
    qtdLancamentos = 0;
}


