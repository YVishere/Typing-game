const quotes = ['Hallo everynyan',
    'OMAGAD! How are you',
    'I am fine sank you',
    'I wish I were a bird'
];

let words = [];
let wordIndex = 0;

let startTime = Date.now;

const quoteThing = document.getElementById(id = "sentence");
const typed = document.getElementById(id = "typed");
const msg = document.getElementById(id = "msg")

document.getElementById(id = "start").addEventListener('click', ()=>{
    const quoteIndex = Math.floor(Math.random()*quotes.length);
    const quote = quotes[quoteIndex];
    words = quote.split(' ');
    wordIndex = 0;

    const spanWords = words.map(function(word) {return `<span>${word} </span>`});

    quoteThing.innerHTML = spanWords.join('');
    quoteThing.childNodes[0].className = 'highlight';
    msg.innerText = '';

    typed.value='';
    typed.focus();
    startTime= new Date().getTime();
})

document.getElementById(id = "typed").addEventListener('input', ()=>{
    const currWord = words[wordIndex];
    const typ = typed.value;

    if(typ === currWord && wordIndex === words.length -1 ){
        const elapsed = new Date().getTime() - startTime;
        const message = `Loser ${elapsed/1000} seconds`;
        msg.innerText = message;
    }
    else if (typ.trim() == currWord){
        typed.value = '';
        wordIndex++;
        
        for (const wordEl of quoteThing.childNodes){
            wordEl.className= '';
        }

        quoteThing.childNodes[wordIndex].className = 'highlight';
    }
    else if (currWord.startsWith(typ)){
        typed.className = '';
    }
    else{
        typed.className = 'error'
    }
});