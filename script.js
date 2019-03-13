const hands = ["kamień", "papier", "nożyce"];

class Game {
    constructor(playerHand, aiHand) {
        this.playerHand = playerHand;
        this.aiHand = aiHand;
    }
    playerChose() {
        document.getElementById('user-choice').textContent = this.playerHand;
    }
    computerChose() {
        document.getElementById('ai-choice').textContent = this.aiHand;
    }
    endGame() {
        document.querySelectorAll('span').forEach(span => {
            span.textContent = "";
        });
    }
}

class Stats {
    constructor(games, wins, losses, draws) {
        this.games = games;
        this.wins = wins;
        this.losses = losses;
        this.draws = draws;
    }
    loadStats() {
        document.getElementById('games').textContent = this.games;
        document.getElementById('wins').textContent = this.wins;
        document.getElementById('losses').textContent = this.losses;
        document.getElementById('draws').textContent = this.draws;
    }
}

const stats = new Stats(games = 0, wins = 0, losses = 0, draws = 0);

class CheckWinner {
    constructor(playerChoice, aiChoice) {
        this.playerChoice = playerChoice
        this.aiChoice = aiChoice
    }
    whoWon() {
        const winnerSpan = document.getElementById('winner');

        if ((this.playerChoice === hands[0] && this.aiChoice === hands[2]) || (this.playerChoice === hands[1] && this.aiChoice === hands[0]) || (this.playerChoice === hands[2] && this.aiChoice === hands[1])) {
            stats.wins++;
            winnerSpan.style.color = "green";
            winnerSpan.textContent = "Ty :)"
        } else if (this.playerChoice === this.aiChoice) {
            stats.draws++
            winnerSpan.style.color = "gray";
            winnerSpan.textContent = "Remis";
        } else {
            stats.losses++
            winnerSpan.style.color = "red";
            winnerSpan.textContent = "Komputer :(";
        }
        stats.games++;

        stats.loadStats();
    }
}

const gameAction = (index) => {
    aiChoice = Math.floor(Math.random() * 3);
    const game = new Game(hands[index], hands[aiChoice]);
    const check = new CheckWinner(game.playerHand, game.aiHand);
    check.whoWon();
    game.playerChose();
    game.computerChose();
    if (stats.games === 10) {
        game.endGame()
        if (stats.wins > stats.losses) {
            alert(`Gratuluję, wygrałeś/-aś! Twój wynik to ${stats.wins} : ${stats.losses}`);
        } else if (stats.wins === stats.losses) {
            alert(`Gra zakończona remisem ${stats.wins} : ${stats.losses}`);
        } else {
            alert(`Niestety przegrałeś/-aś :(. Twój wynik to ${stats.wins} : ${stats.losses}`);
        }
        stats.games = 0;
        stats.wins = 0;
        stats.losses = 0;
        stats.draws = 0;
    }
}

document.getElementById('rock').addEventListener('click', () => gameAction(0));
document.getElementById('paper').addEventListener('click', () => gameAction(1));
document.getElementById('scissors').addEventListener('click', () => gameAction(2));