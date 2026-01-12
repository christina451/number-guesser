// Game state variables

let secretNumber = 0;
let attempts = 0;
let guesses = [];
let gamesWon = 0;
let bestScore = null;

// Getting references to DOM elements

const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const newGameBtn = document.getElementById('newGameBtn');
const feedbackDiv = document.getElementById('feedback');
const attemptsSpan = document.getElementById('attempts');
const bestScoreSpan = document.getElementById('bestScore');
const gamesWonSpan = document.getElementById('gamesWon');
const guessHistoryDiv = document.getElementById('guessHistory');

// Initializing a new game

function initGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guesses = [];
    updateDisplay();
    feedbackDiv.innerHTML = '';
    guessInput.value = '';
    guessInput.disabled = false;
    guessInput.focus();
    guessBtn.disabled = false;
}

// Updating all display elements

function updateDisplay() {
    attemptsSpan.textContent = attempts;
    bestScoreSpan.textContent = bestScore === null ? '-' : bestScore;
    gamesWonSpan.textContent = gamesWon;
    
    let historyHTML = '';
    if (guesses.length === 0) {
        historyHTML = '<span class="text-muted">No guesses yet</span>';
    } else {
        guesses.forEach(function(g) {
            historyHTML += '<span class="label label-default guess-badge">' + g + '</span>';
        });
    }
    guessHistoryDiv.innerHTML = historyHTML;
}

// Handling guesses

function makeGuess() {
    const guess = parseInt(guessInput.value);
    
    // Validating input

    if (isNaN(guess) || guess < 1 || guess > 100) {
        feedbackDiv.innerHTML = '<span class="text-warning"><span class="glyphicon glyphicon-exclamation-sign"></span> Please enter a number between 1 and 100</span>';
        return;
    }

    // Updating game state

    attempts++;
    guesses.push(guess);
    updateDisplay();

    // Checking if guess is correct

    if (guess === secretNumber) {
        feedbackDiv.innerHTML = '<span class="text-success"><span class="glyphicon glyphicon-star"></span> Congratulations! You got it in ' + attempts + ' attempts!</span>';
        guessInput.disabled = true;
        guessBtn.disabled = true;
        gamesWon++;
        
        // Updating the best score

        if (bestScore === null || attempts < bestScore) {
            bestScore = attempts;
        }
        updateDisplay();
    } else if (guess < secretNumber) {
        feedbackDiv.innerHTML = '<span class="text-info"><span class="glyphicon glyphicon-arrow-up"></span> Too low! Try higher...</span>';
    } else {
        feedbackDiv.innerHTML = '<span class="text-info"><span class="glyphicon glyphicon-arrow-down"></span> Too high! Try lower...</span>';
    }

    // Clearing input and focus

    guessInput.value = '';
    guessInput.focus();
}

// Event listeners

guessBtn.addEventListener('click', function() {
    makeGuess();
});

guessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        makeGuess();
    }
});

newGameBtn.addEventListener('click', function() {
    initGame();
});

// Starting the game when page loads

window.addEventListener('DOMContentLoaded', function() {
    initGame();
});