//Dado (retirado da internet e adaptado)
//select the classes we require

let currentClass = '';

//sound effect of three dice rolling
let diceRollingSound = new Audio("diceRollingSound.wav");

//this function will generate a random number between 1 and 6 (or whatever value you send it)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//dice roller function. 
function rollDie(i) {
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
            setTimeout(function () { document.getElementsByClassName("fas fa-dice-" + rollString)[1].className = "fas fa-dice-three"; }, 2000 + i * 50);
        }
        else {
            setTimeout(function () { document.getElementsByClassName("fas fa-dice-" + rollString)[0].className = "fas fa-dice-three"; }, 2000 + i * 50);
        }
    }
    return randNum;
}

//creates new player for tournament
function player(name) {
    this.name = name;
    this.score = 0;
}

//declares player list
let playerList = [];

//adds new player
function addPlayer(newPlayer) { //max 4 jogadores
    if (playerList.length <= 3) {
        playerList.push(new player(newPlayer));
    } else {
        //mensagem de lista cheia
    }
    console.log(playerList);
}

//removes player from players list
function removePlayer(index) {
    playerList.splice(index, 1);
}



let currentRound = 1;
let indexCurrentPlayer = 0; //current player

//updates score for user
function updateScoreCount() {
    if (indexCurrentPlayer == 0) {
        document.getElementById("player-one-score").innerHTML = playerList[indexCurrentPlayer].score.toString() + " pontos";
    }
    else if (indexCurrentPlayer == 1) {
        document.getElementById("player-two-score").innerHTML = playerList[indexCurrentPlayer].score.toString() + " pontos";
    }
    else if (indexCurrentPlayer == 2) {
        document.getElementById("player-three-score").innerHTML = playerList[indexCurrentPlayer].score.toString() + " pontos";
    }
    else {
        document.getElementById("player-four-score").innerHTML = playerList[indexCurrentPlayer].score.toString() + " pontos";
    }
}

//updates rounds count for user
function updateRound() {
    document.getElementById("current-round").innerHTML = "Rodada " + currentRo\und.toString() + " de " + totalRounds.toString();
}

//changes current player
function nextPlayer() {
    if (indexCurrentPlayer + 1 < playerList.length) {
        indexCurrentPlayer = indexCurrentPlayer + 1;
    } else {
        indexCurrentPlayer = 0;
        currentRound = currentRound + 1;
        if (currentRound <= totalRounds) {
            updateRound()();
        }
    }
    console.log("Current player: " + playerList[indexCurrentPlayer].name);
}

//returns highest scoring player and removes him from player list
function winner() {
    let highestScore = 0;
    let highestScoreIndex = 0;
    for (i = 0; i < playerList.length; i++) {
        if (playerList[i].score > highestScore) {
            highestScore = playerList[i].score;
            highestScoreIndex = i;
        }
    }
    let winner = playerList[highestScoreIndex];
    removePlayer(highestScoreIndex);
    console.log(winner);
    return winner;

}

//final results needed variables
let firstPlace;
let secondPlace;
let thirdPlace;
let fourthPlace;


//This function saves all players names and scores and switches html page to the final results
function gameOver() {
    firstPlace = winner();
    localStorage.setItem("firstPlaceName", firstPlace.name);
    localStorage.setItem("firstPlaceScore", firstPlace.score);
    if (totalPlayers == 4) {
        secondPlace = winner();
        thirdPlace = winner();
        fourthPlace = winner();

        localStorage.setItem("secondPlaceName", secondPlace.name);
        localStorage.setItem("thirdPlaceName", thirdPlace.name);
        localStorage.setItem("fourthPlaceName", fourthPlace.name);
        localStorage.setItem("secondPlaceScore", secondPlace.score);
        localStorage.setItem("thirdPlaceScore", thirdPlace.score);
        localStorage.setItem("fourthPlaceScore", fourthPlace.score);
    }
    else if (totalPlayers == 3) {
        secondPlace = winner();
        thirdPlace = winner();
        localStorage.setItem("secondPlaceName", secondPlace.name);
        localStorage.setItem("thirdPlaceName", thirdPlace.name);
        localStorage.setItem("secondPlaceScore", secondPlace.score);
        localStorage.setItem("thirdPlaceScore", thirdPlace.score);
    }
    else {
        secondPlace = winner();
        localStorage.setItem("secondPlaceName", secondPlace.name);
        localStorage.setItem("secondPlaceScore", secondPlace.name);
    }


    window.location.href = "finalresults.html";

}


//dice rolls and score calculation function
function diceRollerAndScoreCalculator() {
    if (playerList.length > 0) {
        if (currentRound <= totalRounds) {
            let i = 0;
            let lastRoll = 0;
            diceRollingSound.currentTime = 0;
            diceRollingSound.play();
            while (i < totalDice) {
                lastRoll = rollDie(i);
                playerList[indexCurrentPlayer].score = playerList[indexCurrentPlayer].score + lastRoll;
                i = i + 1;
            }
            updateScoreCount();
            nextPlayer();
        }
        else {
            gameOver();
        }
    } else {
        //nothing
    }
}

//default values
let totalDice = 1;
let totalPlayers = 2;
let totalRounds = 5;
let playerName1 = "";
let playerName2 = "";
let playerName3 = "";
let playerName4 = "";

//start page game settings detection
document.getElementById("one-dice").onclick = function (e) {
    totalDice = 1;
    localStorage.setItem("totalDice", totalDice);
};

document.getElementById("two-dices").onclick = function (e) {
    totalDice = 2;
    localStorage.setItem("totalDice", totalDice);
};

document.getElementById("three-dices").onclick = function (e) {
    totalDice = 3;
    localStorage.setItem("totalDice", totalDice);
};

document.getElementById("five-rounds").onclick = function (e) {
    totalRounds = 5;
    localStorage.setItem("totalRounds", totalRounds);
};

document.getElementById("six-rounds").onclick = function (e) {
    totalRounds = 6;
    localStorage.setItem("totalRounds", totalRounds);
};

document.getElementById("seven-rounds").onclick = function (e) {
    totalRounds = 7;
    localStorage.setItem("totalRounds", totalRounds);
};

document.getElementById("eight-rounds").onclick = function (e) {
    totalRounds = 8;
    localStorage.setItem("totalRounds", totalRounds);
};

document.getElementById("nine-rounds").onclick = function (e) {
    totalRounds = 9;
    localStorage.setItem("totalRounds", totalRounds);
};

document.getElementById("ten-rounds").onclick = function (e) {
    totalRounds = 10;
    localStorage.setItem("totalRounds", totalRounds);
};

document.getElementById("two-players").onclick = function (e) {
    totalPlayers = 2;
    localStorage.setItem("totalPlayers", totalPlayers);
};

document.getElementById("three-players").onclick = function (e) {
    totalPlayers = 3;
    localStorage.setItem("totalPlayers", totalPlayers);
};

document.getElementById("four-players").onclick = function (e) {
    totalPlayers = 4;
    localStorage.setItem("totalPlayers", totalPlayers);
};

function adicionarJogadores() { //max 4 jogadores
    playerName1 = document.getElementById("player-one").value;
    playerName2 = document.getElementById("player-two").value;
    playerName3 = document.getElementById("player-three").value;
    playerName4 = document.getElementById("player-four").value;

    localStorage.setItem("playerName1", playerName1);
    localStorage.setItem("playerName2", playerName2);
    localStorage.setItem("playerName3", playerName3);
    localStorage.setItem("playerName4", playerName4);
}

//loads all settings from start page
function onloadTournamentData() {
    playerName1 = localStorage.getItem("playerName1");
    playerName2 = localStorage.getItem("playerName2");
    playerName3 = localStorage.getItem("playerName3");
    playerName4 = localStorage.getItem("playerName4");
    totalDice = parseInt(localStorage.getItem("totalDice"));
    totalPlayers = parseInt(localStorage.getItem("totalPlayers"));
    totalRounds = parseInt(localStorage.getItem("totalRounds"));

    document.getElementById("rodada-atual").innerHTML = "Rodada 1 de " + totalRounds.toString();

    if (totalDice == 2) {
        document.getElementsByClassName("fas fa-dice-three")[0].className = "";
    }
    else if (totalDice == 1) {
        document.getElementsByClassName("fas fa-dice-three")[0].className = "";
        document.getElementsByClassName("fas fa-dice-two")[0].className = "";
    }

    document.getElementById("player-one").innerHTML = playerName1;
    if (totalPlayers == 4) {
        document.getElementById("player-four").innerHTML = playerName4;
        document.getElementById("player-three").innerHTML = playerName3;
        document.getElementById("player-two").innerHTML = playerName2;
        addPlayer(playerName1);
        addPlayer(playerName2);
        addPlayer(playerName3);
        addPlayer(playerName4);
    }
    else if (totalPlayers == 3) {
        document.getElementById("player-four").innerHTML = "";
        document.getElementById("player-four-score").innerHTML = "";
        document.getElementById("player-three").innerHTML = playerName3;
        document.getElementById("player-two").innerHTML = playerName2;
        addPlayer(playerName1);
        addPlayer(playerName2);
        addPlayer(playerName3);
    }
    else {
        document.getElementById("player-four").innerHTML = "";
        document.getElementById("player-four-score").innerHTML = "";
        document.getElementById("player-three").innerHTML = "";
        document.getElementById("player-three-score").innerHTML = "";
        document.getElementById("player-two").innerHTML = playerName2;
        addPlayer(playerName1);
        addPlayer(playerName2);
    }

    console.log(totalPlayers);
    console.log(playerName1);
    console.log(playerName2);
    console.log(playerName3);
    console.log(playerName4);
    console.log(totalDice);
    console.log(totalRounds);
    console.log(playerList);
}

//loads all players names and scores from tournament html page
function onloadFinalResultsData() {
    totalPlayers = parseInt(localStorage.getItem("totalPlayers"));
    firstPlace = [localStorage.getItem("firstPlaceName"), localStorage.getItem("firstPlaceScore")];

    document.getElementById("first-place").innerHTML = firstPlace[0];
    document.getElementById("first-place-score").innerHTML = firstPlace[1] + " pontos";


    if (totalPlayers == 4) {
        fourthPlace = [localStorage.getItem("fourthPlaceName"), localStorage.getItem("fourthPlaceScore")];
        thirdPlace = [localStorage.getItem("thirdPlaceName"), localStorage.getItem("thirdPlaceScore")];
        secondPlace = [localStorage.getItem("secondPlaceName"), localStorage.getItem("secondPlaceScore")];

        document.getElementById("fourth-place").innerHTML = fourthPlace[0];
        document.getElementById("third-place").innerHTML = thirdPlace[0];
        document.getElementById("second-place").innerHTML = secondPlace[0];
        document.getElementById("fourth-place-score").innerHTML = fourthPlace[1] + " pontos";
        document.getElementById("third-place-score").innerHTML = thirdPlace[1] + " pontos";
        document.getElementById("second-place-score").innerHTML = secondPlace[1] + " pontos";
    }
    else if (totalPlayers == 3) {
        thirdPlace = [localStorage.getItem("thirdPlaceName"), localStorage.getItem("thirdPlaceScore")];
        secondPlace = [localStorage.getItem("secondPlaceName"), localStorage.getItem("secondPlaceScore")];

        document.getElementById("fourth-place").innerHTML = "";
        document.getElementById("fourth-place-score").innerHTML = "";

        document.getElementById("third-place").innerHTML = thirdPlace[0];
        document.getElementById("second-place").innerHTML = secondPlace[0];
        document.getElementById("third-place-score").innerHTML = thirdPlace[1] + " pontos";
        document.getElementById("second-place-score").innerHTML = secondPlace[1] + " pontos";
    }
    else {
        secondPlace = [localStorage.getItem("secondPlaceName"), localStorage.getItem("secondPlaceScore")];

        document.getElementById("fourth-place").innerHTML = "";
        document.getElementById("fourth-place-score").innerHTML = "";
        document.getElementById("third-place").innerHTML = "";
        document.getElementById("third-place-score").innerHTML = "";

        document.getElementById("second-place").innerHTML = secondPlace[0];
        document.getElementById("second-place-score").innerHTML = secondPlace[1] + " pontos";
    }
}