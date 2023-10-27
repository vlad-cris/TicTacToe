//html elements
let playerElement = document.getElementById('player');
let gameElement = document.getElementById('game');
let messageElement = document.getElementById("message");
let playerRound = document.getElementById("playerRound");
let winElement = document.getElementById("win");
let units = document.getElementsByClassName("unit");

const player = ["0", "X"];
let gameCount = 0;
let playerCount = 1;

// -- game functions
window.addEventListener("click", function (e) { 
    if (e.target.classList.contains("unit") && e.target.innerText == "") {
        gameCount++;
        playerRound.innerText = playerCount + 1;
        e.target.innerText = getPlayerText();
        checkGame();
    }
    if (e.target.id == "restart") {
        resetGame();
    }
});

function getPlayerText() {
    playerCount = ++playerCount % player.length;
    return player[playerCount];
};

//create a list of value in board
function createListOfInput() {
    let newList = new Array();
    let index = 0;
    for (let i = 0; i < 3; i++) {
        let rowList = [];
        for (let j = 0; j < 3; j++) {
            if(units[index].innerText) {
                rowList.push(units[index].innerText);
            } else {
                rowList.push("");
            }
            index++;
        }
        newList.push(rowList);
    }
    return newList;
};

function checkGame() {
    let inputList = createListOfInput(); //this will have a list of value in board
    checkWinner(inputList);
};

// check the board for a winner
function checkWinner(inputList) {
    if (gameCount == 9) { 
        showWinner("Lose");
    }
    checkRows(inputList);
    checkColumns(inputList);
    checkMainDiagonal(inputList);
    checkSecondaryDiagonal(inputList);
};

function checkRows(inputList) {
    for (let i = 0; i < 3; i++) {
        if (inputList[i][0] == inputList[i][1] && inputList[i][1] == inputList[i][2] && 
            inputList[i][0] != "") {
            showWinner();
            break;
        }
    }
};

function checkColumns(inputList) {
    for (let i = 0; i < 3; i++) {
        if (inputList[0][i] == inputList[1][i] && inputList[1][i] == inputList[2][i] && 
            inputList[0][i] != "") {
            showWinner();
            break;
        }
    }
};

function checkMainDiagonal(inputList) {
    if (inputList[0][0] == inputList[1][1] && inputList[1][1] == inputList[2][2] && 
        inputList[0][0] != "") {
        showWinner();
    }
};

function checkSecondaryDiagonal(inputList) {
    if (inputList[0][2] == inputList[1][1] && inputList[2][0] == inputList[1][1] && 
        inputList[0][2] != "") {
        showWinner();
    }
};

function showGameBoard() {
    winElement.setAttribute("hidden", "");
    playerElement.removeAttribute("hidden");
    gameElement.removeAttribute("hidden");
};

//show Winner
function showWinner(message = "win") {
    gameElement.setAttribute("hidden", "");
    winElement.removeAttribute("hidden");
    playerElement.setAttribute("hidden", "");
    addMessage(message);
};

function resetGame() {
    gameCount = 0;
    playerCount = 1;
    playerRound.innerText = playerCount;
    showGameBoard();
    resetGameBoard();
};

function resetGameBoard() {
    for (index in units) {
        units[index].innerText = "";
    } 
};

function addMessage(message) {
    if (message == "win") {
        messageElement.innerHTML = `<h2 class="text-center text-success">The player <span class="fw-bold">${playerCount + 1}</span> have win!`;
    } else {
        messageElement.innerHTML = `<h2 class="text-center text-success">Nobody have win!`;
    }
};