var places = [
    "lonavla",
    "switzerland",
    "manali",
    "tokyo",
    "paris",
    "singapore",
    "disneyland",
    "bali",
    "maldives",
    "kashmir",
    "california"
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
var death = document.createElement("AUDIO");
death.src="./sound/death.wav";
var wrong = document.createElement("AUDIO");
wrong.src="./sound/mistake.wav";
var all1 = document.createElement("AUDIO");
all1.src="./sound/play.wav";
var safe = document.createElement("AUDIO");
safe.src="./sound/safe.wav"
function randomWord() {
    answer = places[Math.floor(Math.random()*places.length)];
    
}
function generateButtons() {
    let buttonsHtml = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => 
        `
        <button class='btn btn-lg btn-primary m-2'
        style="background-color:#A40606"
        id = '`+letter+`'
        onclick = "handleGuess('`+letter+`')"
        >
        `+letter+`
        </button>
        
        `).join('');
        document.getElementById("keyborad").innerHTML=buttonsHtml;
}
function removeButtons() {
    'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        document.getElementById(letter).remove());
}
document.getElementById("maxWrong").innerHTML=maxWrong;

function guessedWord() {
    wordStatus = answer.split('').map( letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")) .join('');
    document.getElementById('wordSpotlight').innerHTML=wordStatus;
}

function handleGuess(chosenLetter) {
    if(mistakes==0) all1.play();
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter):null;
    document.getElementById(chosenLetter).setAttribute('disabled',true);

    if(answer.indexOf(chosenLetter)>=0)
    {
        guessedWord();
        if(wordStatus===answer){
            all1.pause();
            safe.play();
            removeButtons();
            document.getElementById("keyboard").innerHTML="You won!!!!&#9989 ";
            document.getElementById("keyboard").innerHTML+="The man is saved &#128523";
        }
    }
    else{
        wrong.play();
        mistakes++;
        document.getElementById("mistakes").innerHTML=mistakes;
        document.getElementById("pic").src="./images/"+mistakes+'.jpg';
        if(mistakes==2){
            document.getElementById("see").innerHTML="Save me!!!";
        }
        if(mistakes==4){
            document.getElementById("see").innerHTML="He's is going to die soon";
        }
        if(mistakes===6){
            death.play();
            removeButtons();
            document.getElementById("wordSpotlight").innerHTML="The answer was "+answer;
            document.getElementById("keyboard").innerHTML="You lost!!!!&#10060; The man is dead";
        }
    }
}
function reset() {
    location.reload();
}

generateButtons();
randomWord();
guessedWord();
