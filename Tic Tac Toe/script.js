class TicTacToe {
    constructor() {
        this.board = ["", "", "", "", "", "", "", "", ""];
        this.currentPlayer = "X";
        this.gameActive = true;
        this.scores = { X: 0, O: 0 };
        this.playerNames = { X: "Player X", O: "Player O" };
        
        this.registrationForm = document.getElementById('registrationForm');
        this.gameContainer = document.getElementById('gameContainer');
        this.statusDisplay = document.getElementById('status');
        this.cells = document.querySelectorAll('.cell');
        this.resetButton = document.getElementById('resetBtn');
        this.backButton = document.getElementById('backBtn');
        this.startButton = document.getElementById('startBtn');
        this.playerXInput = document.getElementById('playerX');
        this.playerOInput = document.getElementById('playerO');
        this.scoreX = document.getElementById('scoreX');
        this.scoreO = document.getElementById('scoreO');
        this.labelX = document.getElementById('labelX');
        this.labelO = document.getElementById('labelO');
        
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.startButton.addEventListener('click', () => this.startGame());
        this.backButton.addEventListener('click', () => this.backToRegistration());
        
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });
        
        this.resetButton.addEventListener('click', () => this.resetGame());
    }
    
    startGame() {
        const playerXName = this.playerXInput.value.trim() || "Player X";
        const playerOName = this.playerOInput.value.trim() || "Player O";
        
        this.playerNames.X = playerXName;
        this.playerNames.O = playerOName;
        
        this.labelX.textContent = `${playerXName}:`;
        this.labelO.textContent = `${playerOName}:`;
        
        this.registrationForm.style.display = 'none';
        this.gameContainer.style.display = 'block';
        
        this.resetGame();
    }
    
    backToRegistration() {
        this.gameContainer.style.display = 'none';
        this.registrationForm.style.display = 'block';
        this.scores = { X: 0, O: 0 };
        this.scoreX.textContent = '0';
        this.scoreO.textContent = '0';
    }
    
    handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        if (this.board[clickedCellIndex] !== "" || !this.gameActive) {
            return;
        }
        
        this.handleCellPlayed(clickedCell, clickedCellIndex);
        this.handleResultValidation();
    }
    
    handleCellPlayed(clickedCell, clickedCellIndex) {
        this.board[clickedCellIndex] = this.currentPlayer;
        clickedCell.textContent = this.currentPlayer;
        clickedCell.classList.add(this.currentPlayer.toLowerCase());
    }
    
    handleResultValidation() {
        let roundWon = false;
        let winningLine = [];
        
        for (let i = 0; i < this.winningConditions.length; i++) {
            const winCondition = this.winningConditions[i];
            let a = this.board[winCondition[0]];
            let b = this.board[winCondition[1]];
            let c = this.board[winCondition[2]];
            
            if (a === "" || b === "" || c === "") {
                continue;
            }
            
            if (a === b && b === c) {
                roundWon = true;
                winningLine = winCondition;
                break;
            }
        }
        
        if (roundWon) {
            this.statusDisplay.textContent = `${this.playerNames[this.currentPlayer]} wins!`;
            this.gameActive = false;
            this.highlightWinningCells(winningLine);
            this.updateScore();
            return;
        }
        
        let roundDraw = !this.board.includes("");
        if (roundDraw) {
            this.statusDisplay.textContent = "It's a draw!";
            this.gameActive = false;
            return;
        }
        
        this.handlePlayerChange();
    }
    
    highlightWinningCells(winningLine) {
        winningLine.forEach(index => {
            this.cells[index].classList.add('winner');
        });
    }
    
    handlePlayerChange() {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        this.statusDisplay.textContent = `${this.playerNames[this.currentPlayer]}'s turn`;
    }
    
    updateScore() {
        this.scores[this.currentPlayer]++;
        if (this.currentPlayer === "X") {
            this.scoreX.textContent = this.scores.X;
        } else {
            this.scoreO.textContent = this.scores.O;
        }
    }
    
    resetGame() {
        this.board = ["", "", "", "", "", "", "", "", ""];
        this.gameActive = true;
        this.currentPlayer = "X";
        this.statusDisplay.textContent = `${this.playerNames[this.currentPlayer]}'s turn`;
        
        this.cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove('x', 'o', 'winner');
        });
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
