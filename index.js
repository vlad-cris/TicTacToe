//html elements
let playerElement = document.getElementById('player');
let gameElement = document.getElementById('game');
let messageElement = document.getElementById("message");
let playerRound = document.getElementById("playerRound");
let winElement = document.getElementById("win");
let units = document.getElementsByClassName("unit");

const playerValues = ["0", "X"];
let gameCount = 0;
let playerCount = 1;
let matrixValues = [["", "", ""], ["", "", ""], ["", "", ""]];

// game function at click event
window.addEventListener("click", function (e) { 
    if (e.target.classList.contains("unit") && e.target.innerText == "") {
        let id = e.target.id;
        gameCount++;
        playerRound.innerText = playerCount + 1;
        e.target.innerText = getPlayerText();
        matrixValues[Math.floor(id / 3)][id % 3] = playerValues[playerCount];
        checkWinner();
    }
    if (e.target.id == "restart") {
        resetGame();
    }
});

// get the player value
function getPlayerText() {
    playerCount = ++playerCount % playerValues.length;
    return playerValues[playerCount];
};

// check for a winner
function checkWinner() {
    if (gameCount > 4) {
        if (gameCount == 9) { 
            showWinner("Lose");
        }
        checkRows();
        checkColumns();
        checkMainDiagonal();
        checkSecondaryDiagonal();
    }
};

function checkRows() {
    for (let i = 0; i < 3; i++) {
        if (matrixValues[i][0] == matrixValues[i][1] && matrixValues[i][1] == matrixValues[i][2] && 
            matrixValues[i][0] != "") {
            showWinner();
            break;
        }
    }
};

function checkColumns() {
    for (let i = 0; i < 3; i++) {
        if (matrixValues[0][i] == matrixValues[1][i] && matrixValues[1][i] == matrixValues[2][i] && 
            matrixValues[0][i] != "") {
            showWinner();
            break;
        }
    }
};

function checkMainDiagonal() {
    if (matrixValues[0][0] == matrixValues[1][1] && matrixValues[1][1] == matrixValues[2][2] && 
        matrixValues[0][0] != "") {
        showWinner();
    }
};

function checkSecondaryDiagonal() {
    if (matrixValues[0][2] == matrixValues[1][1] && matrixValues[2][0] == matrixValues[1][1] && 
        matrixValues[0][2] != "") {
        showWinner();
    }
};

function showGameBoard() {
    winElement.setAttribute("hidden", "");
    playerElement.removeAttribute("hidden");
    gameElement.removeAttribute("hidden");
};

//show Winner message
function showWinner(message = "win") {
    gameElement.setAttribute("hidden", "");
    winElement.removeAttribute("hidden");
    playerElement.setAttribute("hidden", "");
    addMessage(message);
};

// reset game board, matrix, gameCount, playerCount
function resetGame() {
    gameCount = 0;
    playerCount = 1;
    playerRound.innerText = playerCount;
    showGameBoard();
    resetGameBoard();
    resetMatrixValues();
};

function resetGameBoard() {
    for (index in units) {
        units[index].innerText = "";
    } 
};

function resetMatrixValues() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++){
            matrixValues[i][j] = "";
        }
    }
};

function addMessage(message) {
    if (message == "win") {
        messageElement.innerHTML = `<h2 class="text-center text-success">The player <span class="fw-bold">${playerCount + 1}</span> have win!`;
    } else {
        messageElement.innerHTML = `<h2 class="text-center text-success">Nobody have win!`;
    }
};