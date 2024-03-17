document.addEventListener("DOMContentLoaded", function() {
    const gameBoard = document.getElementById("gameBoard");
    const resetButton = document.getElementById("resetButton");

    let currentPlayer = "X";
    let gameStatus = ["", "", "", "", "", "", "", "", ""];

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameStatus[a] && gameStatus[a] === gameStatus[b] && gameStatus[a] === gameStatus[c]) {
                return gameStatus[a];
            }
        }

        if (gameStatus.includes("") === false) return "draw";
        return null;
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (gameStatus[index] || checkWinner()) return;

        gameStatus[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";

        const winner = checkWinner();
        if (winner) {
            if (winner === "draw") {
                alert("It's a draw!");
            } else {
                alert(`Player ${winner} wins!`);
            }
        }
    }

    function resetGame() {
        gameStatus = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        document.querySelectorAll(".cell").forEach(cell => {
            cell.textContent = "";
        });
    }

    // Create game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        gameBoard.appendChild(cell);
    }

    resetButton.addEventListener("click", resetGame);
});
