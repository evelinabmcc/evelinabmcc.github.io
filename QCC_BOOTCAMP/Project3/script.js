// score starts at 0
let init_score = 10;
let highest_score = 0;


// function to generate random value between 1-100
const generateNr = () => {
    return Math.floor(Math.random()*100 + 1);
}

// declare array of guessed values
const guessList = [];

// get and display random choice
const randomNr = generateNr();
console.log(`The secret number is `+ randomNr);

// put DOM elements into variables
const mainDiv = document.querySelector('.main');
const mainBox = document.querySelector('.main-box');
const myForm = document.getElementById('myForm');
const userGuess = document.getElementById('userInput');
// guessList = document.getElementById('guessList');
const currentScore = document.getElementById('current_score');
currentScore.innerHTML = init_score;
const highestScore = document.getElementById('highest_score');
highestScore.innerHTML = highest_score;
const statusMessage = document.getElementById('statusMessage');
statusMessage.innerHTML = 'Guess a Number';


// initialize 'reset'
const btnReset = document.querySelector('.reset-btn');
btnReset.addEventListener('click', () => window.location.reload());

// Listen for form submit and validate input
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();

    if(currentScore.innerHTML == 0){
               // styling change for LOSING CASE
               mainDiv.style.backgroundColor = '#d80032';
               mainBox.style.backgroundColor = '#333533';

               statusMessage.style.color = '#c71f37';
               statusMessage.style.fontSize = '3rem';
               statusMessage.innerHTML = 'Game Over! You lost!';

               document.querySelector('.top-right-box').remove();

               myForm.remove();
               document.getElementById('congrats_title1').style.fontWeight = 'bold';
               document.getElementById('congrats_title1').innerHTML = 'Unfortunately You lost the Game';   

               document.getElementById('congrats_par1').innerHTML = `Don't give up and Try Again. You can win next time.`;

               document.getElementById('congrats_title2').style.fontWeight = 'bold';
               document.getElementById('congrats_title2').innerHTML = `My number was: ${randomNr}`;
              
               document.getElementById('photo').src="pics/loose.png";
               document.getElementById('photo').style.marginTop = "20%";   
               
               const btn = document.createElement("button");
               btn.innerHTML = "Try Again";
               document.querySelector('.btn2').appendChild(btn);
               btn.addEventListener('click', () => window.location.reload());

    }   
    // invalidates ' ' input but not multiple ' ' 
    else if(userGuess.value === '' || isNaN(userGuess.value.trim()) || userGuess.value === ' '){
        statusMessage.style.color = '#d80032';
        statusMessage.innerHTML = 'Invalid! Not a number!';
    }
    else if (userGuess.value < 1 || userGuess.value >100){
        statusMessage.style.color = '#d80032';
        statusMessage.innerHTML = 'Incorrect! The number must be between 1 and 100!';

        currentScore.innerHTML--;
    }

    // user input is a number between 1 and 100
    else{
        const node = document.createElement("li");
        const guess = document.createTextNode(userGuess.value);

        // appending user choices to History Array
        if ( !(guessList.includes(userGuess.value)) ){
            node.appendChild(guess);
            guessList.push(userGuess.value);
            console.log(guessList);
            document.getElementById('guessList').appendChild(node);

            if(userGuess.value < randomNr){
                statusMessage.style.color = '#d80032';
                statusMessage.innerHTML = 'Your Guess is too low';
    
                currentScore.innerHTML--;            
            }
            else if(userGuess.value > randomNr){
                statusMessage.style.color = '#d80032';
                statusMessage.innerHTML = 'Your Guess is too high';
    
                currentScore.innerHTML--;  
            }
            // user input is the correct answer
            else{
                highestScore.innerHTML = currentScore.innerHTML;
            
                // styling change for WINNING CASE
                mainDiv.style.backgroundColor = '#7bf1a8';
                mainBox.style.backgroundColor = '#ffef9f';

                statusMessage.style.color = '#2c6e49';
                statusMessage.style.fontSize = '2rem';
                statusMessage.innerHTML = 'YOU WIN !!';

                document.querySelector('.top-row').remove();

                myForm.remove();
                document.getElementById('congrats_title1').style.fontWeight = 'bold';
                document.getElementById('congrats_title1').innerHTML = 'Congratulations';     
                document.getElementById('congrats_par1').innerHTML = `Your guess was correct. ${userGuess.value} is my secret number.`;

                document.getElementById('congrats_title2').style.fontWeight = 'bold';
                document.getElementById('congrats_title2').innerHTML = `Your Score: ${currentScore.innerHTML}`;

                document.getElementById('congrats_par2').style.fontWeight = 'bold';
                document.getElementById('congrats_par2').innerHTML = `Best: ${currentScore.innerHTML}`;

                document.getElementById('photo').src="pics/win.png";
                document.getElementById('photo').style.marginTop = "20%";

                document.querySelector('.bottom-box').style.backgroundColor = '#fe938c'

                const btn = document.createElement("button");
                btn.innerHTML = "Play Again";
                document.querySelector('.btn2').appendChild(btn);
                btn.addEventListener('click', () => window.location.reload());

            }            

        }
        else {
            statusMessage.style.color = '#d80032';
            statusMessage.innerHTML = 'You already chose this number';
        }  

        // Clear user input field
        userGuess.value = '';
    }

}