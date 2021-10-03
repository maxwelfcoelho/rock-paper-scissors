const hands = document.querySelectorAll('.hand');

let playerScore = 0;
let ties = 0;
let computerScore = 0;

function play(e) {
    let playerHand = null;

    hands.forEach(hand => {
        if (hand.checked) {
            playerHand = hand.value;
        }
    });

    if (playerHand == null) {
        showMessage('please select a hand');
        return;
    }

    fetchRandomComputerHand()
        .then(data => {
            const computerHand = data;
            showHand(playerHand, document.querySelector('.player-hand'), 'big-icon-user');
            showHand(computerHand, document.querySelector('.computer-hand'), 'big-icon-computer');

            computeScore(playerHand, computerHand);
        });
}

function computeScore(playerHand, computerHand) {
    const player = handToNumber(playerHand);
    const computer = handToNumber(computerHand);

    if ((player + 1) % 3 === computer) {
        computerScore++;
    } else if (player === computer) {
        ties++;
    } else {
        playerScore++;
    }

    showScore(playerScore, ties, computerScore);
    checkWinner(playerScore, computerScore);
}

function checkWinner(playerScore, computerScore) {
    if (playerScore === 3) {
        showMessage('player wins');
        reset();
        return;
    } else if (computerScore === 3) {
        showMessage('computer wins');
        reset();
        return;
    }
}

function reset() {
    playerScore = 0;
    ties = 0;
    computerScore = 0;

    showScore(playerScore, ties, computerScore);
}

function showScore(playerScore, ties, computerScore) {
    const playerScoreUi = document.querySelector('#player-score');
    const tiesUi = document.querySelector('#ties');
    const computerScoresUi = document.querySelector('#computer-score');
    
    playerScoreUi.textContent = playerScore;
    tiesUi.textContent = ties;
    computerScoresUi.textContent = computerScore;
}

function handToNumber(hand) {
    if (hand === 'pedra') return 0;
    else if (hand === 'papel') return 1;
    else return 2;
}

function showHand(hand, player, iconClass) {
    let handIcon = null;

    switch (hand.toLowerCase()) {
        case 'pedra':
            player.innerHTML = '';
            handIcon = document.createElement('i');
            handIcon.className = `${iconClass} fas fa-hand-rock`;
            player.appendChild(handIcon);
            break;
        case 'papel':
            player.innerHTML = '';
            handIcon = document.createElement('i');
            handIcon.className = `${iconClass} fas fa-hand-paper`;
            player.appendChild(handIcon);
            break;
        case 'tesoura':
            player.innerHTML = '';
            handIcon = document.createElement('i');
            handIcon.className = `${iconClass} fas fa-hand-scissors`;
            player.appendChild(handIcon);
            break;
    }
}

function fetchRandomComputerHand() {
    const url = 'http://localhost:4000/random-hand';

    return new Promise((resolve, reject) => {
        fetch(url)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
}

function showMessage(message) {
    const messageUi = document.querySelector('.message');
    messageUi.innerText = message;

    window.setTimeout(() => {
        messageUi.innerText = '';
    }, 2000);
}

document.querySelector('#play').addEventListener('click', play);