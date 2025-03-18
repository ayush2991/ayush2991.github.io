document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.querySelector('#status');
    const resetButton = document.querySelector('#resetButton');
    const modeRadios = document.querySelectorAll('input[name="mode"]');
    let currentPlayer = 'X';
    let gameMode = 'human';
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Initialize the game
    function initializeGame() {
        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick, { once: true });
        });
        updateStatus();
    }

    // Handle cell click event
    function handleCellClick(e) {
        const cell = e.target;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        if (checkWin(currentPlayer)) {
            statusDisplay.textContent = `${currentPlayer} wins!`;
            endGame();
        } else if (isDraw()) {
            statusDisplay.textContent = 'Draw!';
            endGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateStatus();
            if (gameMode === 'computer' && currentPlayer === 'O') {
                setTimeout(computerMove, 500); // Add a slight delay for realism
            }
        }
    }

    // Computer makes a move
    function computerMove() {
        const availableCells = [...cells].filter(cell => cell.textContent === '');
        
        // Check if the computer can win
        const winningMove = findWinningMove('O');
        if (winningMove !== null) {
            winningMove.textContent = currentPlayer;
            winningMove.classList.add(currentPlayer.toLowerCase());
        } else {
            // Check if the computer can block the human player from winning
            const blockMove = findBlockingMove('X');
            if (blockMove !== null) {
                blockMove.textContent = currentPlayer;
                blockMove.classList.add(currentPlayer.toLowerCase());
            } else {
                // Make a random move if no winning or blocking move is found
                const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
                randomCell.textContent = currentPlayer;
                randomCell.classList.add(currentPlayer.toLowerCase());
            }
        }

        if (checkWin(currentPlayer)) {
            statusDisplay.textContent = `${currentPlayer} wins!`;
            endGame();
        } else if (isDraw()) {
            statusDisplay.textContent = 'Draw!';
            endGame();
        } else {
            currentPlayer = 'X';
            updateStatus();
        }
    }

    // Find a move to block the opponent from winning
    function findBlockingMove(opponent) {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            const values = [cells[a].textContent, cells[b].textContent, cells[c].textContent];
            if (values.filter(value => value === opponent).length === 2 && values.includes('')) {
                const emptyIndex = values.indexOf('');
                return cells[combination[emptyIndex]];
            }
        }
        return null;
    }

    // Find a move to win the game
    function findWinningMove(player) {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            const values = [cells[a].textContent, cells[b].textContent, cells[c].textContent];
            if (values.filter(value => value === player).length === 2 && values.includes('')) {
                const emptyIndex = values.indexOf('');
                return cells[combination[emptyIndex]];
            }
        }
        return null;
    }

    // Check if the current player has won
    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return cells[index].textContent === player;
            });
        });
    }

    // Check if the game is a draw
    function isDraw() {
        return [...cells].every(cell => {
            return cell.textContent === 'X' || cell.textContent === 'O';
        });
    }

    // End the game by removing event listeners
    function endGame() {
        cells.forEach(cell => {
            cell.removeEventListener('click', handleCellClick);
        });
    }

    // Reset the board for a new game
    function resetBoard() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
            cell.addEventListener('click', handleCellClick, { once: true });
        });
        currentPlayer = 'X';
        updateStatus();
    }

    // Update the status display
    function updateStatus() {
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }

    // Add event listener to the reset button
    resetButton.addEventListener('click', resetBoard);

    // Add event listeners to the mode radio buttons
    modeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            gameMode = e.target.value;
            resetBoard();
        });
    });

    // Start the game
    initializeGame();
});