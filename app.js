/* 
Roll The Dice Pig Game App.js
*/
//Variable to keep track of what is happening in our game.
var scores, roundScore, activePlayer, gamePlaying;// variables for score in Global Scope

init();


// We use the querySelector to get the btn-roll, add an eventListener for the click and add an anonymous function inside to call the btn event.
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. we need a random number
    var dice = Math.floor(Math.random() * 6) + 1;
    // 2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    // 3. Update the round score IF the rolled number was not a 1
    if (dice !== 1 ) { 
        // Add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        // Next player
        nextPlayer();
    }

    }
});

// eventListener on button hold to hold the points of the players.
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // add current score to global score
        scores[activePlayer] += roundScore;
        // update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'You Won!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            // stops game from working after a winner has been declared.
            gamePlaying = false;
        } else {
        // Next player
        nextPlayer();
        }
    }
});

function nextPlayer() {
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;// tenary statement
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // change background class to active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // hide the dice for the next player until they roll
    document.querySelector('.dice').style.display = 'none';
}

// Function to reset scores to cero and start a new game
document.querySelector('.btn-new').addEventListener('click', init);

// Function that sets all elements active that are need to run the game.
function init() {
    scores = [0,0]; //value for the scores.
    roundScore = 0;// value of roundScore.
    activePlayer = 0;//value of activePlayer

    document.querySelector('.dice').style.display = 'none';
    // We use the document.getElementById method to get the IDs of the elements. We do not need the # as we are not using CSS in this case.
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    // starts game one the init.
    gamePlaying = true;
}






