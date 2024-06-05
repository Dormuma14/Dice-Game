let scores, roundScores, activePlayer, dice, dice1, gamePlaying,duplicates,set,counts;
init();

 var lastDice = [];

document.querySelector('.btn--roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Random number
        dice = Math.floor(Math.random() * 6) + 1;
        dice1 = Math.floor(Math.random() * 6) + 1;
        //array
        lastDice[lastDice.length] = dice;
        lastDice[lastDice.length] = dice1;

        // 2. Display the result
        let diceDOM = document.querySelector('.dice');
        let dice1DOM = document.querySelector('.dice--1');
        
        diceDOM.style.display = 'block';
        dice1DOM.style.display = 'block';

        diceDOM.src = 'dice-' + dice + '.png';
        dice1DOM.src = 'dice-' + dice1 + '.png'
        // 3. Update the round score if the rolled number was NOT a 1
        if (dice !== 1 && dice1 !== 1) {
            // Add score
            roundScores += dice + dice1;
            document.querySelector('#current--' + activePlayer).textContent = roundScores;
        } else {
            nextPlayer();
        }
         if (dice === 6 && dice1 === 6) {
            
        } else {
            // Check for duplicate numbers in last rolls
            let sixCount = countSixes(lastDice);
            if (sixCount >= 2) {
                roundScores = 0;
                document.querySelector('#current--' + activePlayer).textContent = roundScores;
                nextPlayer();
            }
        }
    }
});
document.querySelector('.btn--hold').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Add current score to global score
        scores[activePlayer] += roundScores;

        // 2. Update the UI
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

        var  input = document.querySelector('.final-score').value;
        var winingScore;
        console.log(input);

       // Undefined,0, null ot '' are coerced to false
       // Anything else is Coerced to true 

       if (input){
        winingScore = input;
       }else {
        winingScore = 50;
       }
       
       // 3. Check if player won the game
        if (scores[activePlayer] >= winingScore) {
            document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
            document.querySelector('#name--' + activePlayer).textContent = ('Winner');
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice--1').style.display = 'none';
            document.querySelector('.player--' + activePlayer).classList.add('winner');
            document.querySelector('.player--' + activePlayer).classList.remove('player--active');
            gamePlaying = false;
        } else {
            // Next player
            nextPlayer();
        }
        // Clear the lastDice array
        lastDice.length = 0;
    }
});

function nextPlayer() {
    // Switch to next player
    activePlayer = activePlayer === 0 ? 1 : 0;
    roundScores = 0;

    document.getElementById('current--0').textContent = "0";
    document.getElementById('current--1').textContent = "0";

    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');

    lastDice.length = 0;
}

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScores = 0;
    gamePlaying = true;
    // Randomly select the starting player
    activePlayer = Math.floor(Math.random() * 2);


    document.querySelector('.dice--1').style.display = 'none'
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score--0').textContent = "0";
    document.getElementById('score--1').textContent = "0";
    document.getElementById('current--0').textContent = "0";
    document.getElementById('current--1').textContent = "0";
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';

    // if start new game,return this code.
    document.querySelector('.player--0').classList.remove('winner');
    document.querySelector('.player--1').classList.remove('winner');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');

    document.querySelector('.player--' + activePlayer).classList.add('player--active');
}


function countSixes(arr) {
    return arr.filter(num => num === 6).length;
}

