/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastRoll, dice, winScore;

init();    //initializes the game

     

document.querySelector('.btn-roll').addEventListener('click',function () {
    if (gamePlaying){ 
    lastRoll=dice;
    dice = Math.floor(Math.random()*6)+1;   // Number on the dice is randomly generated
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-'+dice+'.png';
    
    if (dice !== 1){  // Number 1 yields the turn to the opponent
        //Special case: Double 6 nullifies player's total score 
        if (lastRoll===6 && dice===6){
            scores[activePlayer]=0;
            document.querySelector('#score-'+activePlayer).textContent = 0;  
            nextPlayer();
        }
        else {
        roundScore+=dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;}
    }else {
       nextPlayer();
    }}

});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if (gamePlaying){scores[activePlayer]+=roundScore;  // Round score gets added to total if player holds
    
    document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
    
    if (scores[activePlayer]>=winScore){
        document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
         document.querySelector('.dice').style.display = 'none';
        
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        gamePlaying = false;
        
    }
    else {nextPlayer();}
}
    
});

function nextPlayer(){
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        
        document.getElementById('current-0').textContent = '0';//Round scores get back to zero
        document.getElementById('current-1').textContent = '0'; 
        
        document.querySelector('.player-0-panel').classList.toggle('active');
       document.querySelector('.player-1-panel').classList.toggle('active');

        
        document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click',init);  //Starting a new game

//Initializing UI on the game board 
function init(){
scores = [0,0];
roundScore = 0;
activePlayer = 0;
document.getElementById('WinScore').style.display = 'block';
document.querySelector('.btn-apply').style.visibility = "visible";
document.getElementById('ScoreRequest').style.display = 'block';
    
 document.querySelector('.dice').style.display = 'none';

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

}

    
   //Setting the winning score and applying it to the starting party
document.querySelector('.btn-apply').addEventListener('click',function(){
   
    var input;
    input = document.getElementById('WinScore').value; 
    if (input>0){winScore = input; 
    document.querySelector('.player-0-panel').classList.add('active');
    gamePlaying = true;
    document.getElementById('WinScore').style.display = 'none';
    document.querySelector('.btn-apply').style.visibility = "hidden";
    document.getElementById('ScoreRequest').style.display = 'none';}
    }); 




