let deck = [];
let values = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': 11};
let playerTotal = 0;
let dealerTotal = 0;
let gameActive = false;

function initializeDeck() {
    deck = [];
    for (let i = 2; i <= 10; i++) {
        deck.push(i.toString(), i.toString(), i.toString(), i.toString());
    }
    ['J', 'Q', 'K', 'A'].forEach(card => {
        deck.push(card, card, card, card);
    });
}

function startGame() {
    initializeDeck();
    playerTotal = 0;
    dealerTotal = 0;
    gameActive = true;
    showMessage("Game started! Type 'hit' to draw a card or 'stay' to hold.");
    dealInitialCards();
}

function dealInitialCards() {
    const firstCard = drawCard();
    const secondCard = drawCard();
    playerTotal = values[firstCard] + values[secondCard];
    showMessage(`You were dealt: ${firstCard} and ${secondCard}. Your total is: ${playerTotal}`);
}

function drawCard() {
    return deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
}

function hit() {
    if (gameActive) {
        const newCard = drawCard();
        playerTotal += values[newCard];
        showMessage(`You drew: ${newCard}. Your total is now: ${playerTotal}`);
        if (playerTotal > 21) {
            showMessage(`You busted! Your total is: ${playerTotal}.`);
            gameActive = false;
        }
    }
}

function stay() {
    if (gameActive) {
        dealerTurn();
    }
}

function dealerTurn() {
    dealerTotal = Math.floor(Math.random() * (26 - 17)) + 17; // Dealer total between 17 and 26
    showMessage(`Dealer's total is: ${dealerTotal}`);
    determineWinner();
}

function determineWinner() {
    if (dealerTotal > 21) {
        showMessage("Dealer busted! You win!");
    } else if (playerTotal > dealerTotal) {
        showMessage("You win!");
    } else {
        showMessage("Dealer wins!");
    }
    gameActive = false;
}

function showMessage(message) {
    const outputDiv = document.getElementById("game-output");
    outputDiv.innerHTML += `<p>${message}</p>`;
    outputDiv.scrollTop = outputDiv.scrollHeight; // Scroll to the bottom
}

// Event Listeners
document.getElementById("submit-button").addEventListener("click", function() {
    const input = document.getElementById("user-input").value.toLowerCase();
    document.getElementById("user-input").value = ""; // Clear input field

    if (input === "start") {
        startGame();
    } else if (input === "hit") {
        hit();
    } else if (input === "stay") {
        stay();
    }
});

document.getElementById("hit-button").addEventListener("click", hit);
document.getElementById("stay-button").addEventListener("click", stay);
document.getElementById("restart-button").addEventListener("click", startGame);
