document.getElementById("submit-button").onclick = function() {
    const userInput = document.getElementById("user-input").value;
    document.getElementById("game-output").innerHTML += `<p>You: ${userInput}</p>`;
    handleInput(userInput);
    document.getElementById("user-input").value = "";
};

function handleInput(input) {
    // Simple input handling; can be expanded based on game logic
    const output = document.getElementById("game-output");

    // Implement game logic communication here
    if (input.toLowerCase() === "hit") {
        output.innerHTML += "<p>You chose to hit!</p>";
        // Call backend logic to hit
    } else if (input.toLowerCase() === "stay") {
        output.innerHTML += "<p>You chose to stay!</p>";
        // Call backend logic to stay
    } else if (input.toLowerCase() === "restart") {
        output.innerHTML = "<p>The game has restarted!</p>";
        // Reset game logic
    } else {
        output.innerHTML += "<p>Unknown command. Please type 'hit' or 'stay'.</p>";
    }
}

document.getElementById("restart-button").onclick = function() {
    document.getElementById("game-output").innerHTML = "";
    document.getElementById("restart-button").style.display = "none";
};
