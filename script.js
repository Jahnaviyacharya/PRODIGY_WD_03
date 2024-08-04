const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleClick, { once: true }));
resetButton.addEventListener('click', resetGame);

function handleClick(e) {
    const cell = e.target;
    cell.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
        message.textContent = `${currentPlayer} Wins!`;
        board.style.pointerEvents = 'none';
    } else if ([...cells].every(cell => cell.textContent)) {
        message.textContent = 'Draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => cells[index].textContent === player);
    });
}

function resetGame() {
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    board.style.pointerEvents = 'auto';
    message.textContent = '';
}
