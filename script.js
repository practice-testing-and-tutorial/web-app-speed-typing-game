const RANDOM_QUOTE_API = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const quoteAuthorElement = document.getElementById('quoteAuthor');
const timerElement = document.getElementById('timer');
let timeOut = true;

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');

    let correct = true;
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if(character == null){
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        }
        else if(character === characterSpan.innerText){
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        }
        else {
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct');
            correct = false;
        }
    });
    
    if(correct) renderNewQuote();
    if(timeOut){
        startTimer();
        timeOut = false;
    }
});

function getRandomQuote(){
    return fetch(RANDOM_QUOTE_API)
        .then(response => response.json())
        .then(data => data);
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = '';
    quote['content'].split('').forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerHTML = character;
        quoteDisplayElement.appendChild(characterSpan);
    });
    quoteAuthorElement.innerHTML = '-' + quote['author'];
    quoteInputElement.value = null;
    timerElement.innerHTML = '0';
    startTimer(false);
    timeOut = true;
}

let startTime;
let timer;
function startTimer(param = true) {
    timerElement.innerText = 0;
    if(param) {
        startTime = new Date();
        timer = setInterval(() => {
            timerElement.innerText = getTimerTime();
        }, 1000);
    } else {
        clearInterval(timer);
    }
}

function getTimerTime(){
    return Math.floor((new Date() - startTime) / 1000);
}

renderNewQuote();