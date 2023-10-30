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
let boardValues = [["", "", ""], ["", "", ""], ["", "", ""]];

// game function at click event
window.addEventListener("click", function (e) { 
    if (e.target.classList.contains("unit") && e.target.innerText == "") {
        let id = e.target.id;
        gameCount++;
        playerRound.innerText = playerCount + 1;
        e.target.innerText = getPlayerText();
        boardValues[Math.floor(id / 3)][id % 3] = playerValues[playerCount];
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
        if (boardValues[i][0] == boardValues[i][1] && boardValues[i][1] == boardValues[i][2] && 
            boardValues[i][0] != "") {
            showWinner();
            break;
        }
    }
};

function checkColumns() {
    for (let i = 0; i < 3; i++) {
        if (boardValues[0][i] == boardValues[1][i] && boardValues[1][i] == boardValues[2][i] && 
            boardValues[0][i] != "") {
            showWinner();
            break;
        }
    }
};

function checkMainDiagonal() {
    if (boardValues[0][0] == boardValues[1][1] && boardValues[1][1] == boardValues[2][2] && 
        boardValues[0][0] != "") {
        showWinner();
    }
};

function checkSecondaryDiagonal() {
    if (boardValues[0][2] == boardValues[1][1] && boardValues[2][0] == boardValues[1][1] && 
        boardValues[0][2] != "") {
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
    resetboardValues();
};

function resetGameBoard() {
    for (index in units) {
        units[index].innerText = "";
    } 
};

function resetboardValues() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++){
            boardValues[i][j] = "";
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