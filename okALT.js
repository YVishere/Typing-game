const quotes = ['Hallo everynyan',
    'OMAGAD! How are you',
    'I am fine sank you',
    'I wish I were a bird'
];

let words = [];
let wordIndex = 0;

let category = '';

let startTime = Date.now;

const quoteThing = document.getElementById(id = "sentence");
const typed = document.getElementById(id = "typed");
const msg = document.getElementById(id = "msg");

document.getElementById(id = "start").addEventListener('click', ()=>{
    const quoteIndex = Math.floor(Math.random()*quotes.length);
    const quote = quotes[quoteIndex];
    words = quote.split(' ');
    wordIndex = 0;

    const spanWords = words.map(function(word) {return `<span>${word} </span>`});

    quoteThing.innerHTML = spanWords.join('');
    quoteThing.childNodes[0].className = 'highlight';
    msg.innerText = '';

    typed.className='';
    typed.value='';
    typed.focus();
    startTime= new Date().getTime();

    switch(quoteIndex){
        case 0: category = "everynyan"; break;
        case 1: category = "OMAGAD"; break;
        case 2: category = "fine"; break;
        case 3: category = "bird"; break;
    }

    typed.disabled = false;
    rankPrint();
})

document.getElementById(id = "typed").addEventListener('input', ()=>{

    
    const typ = typed.value;
    const currWord = words[wordIndex];
    const typeWord = typ.split(' ')[wordIndex];
    const quote = quoteThing.innerText;

    if(typ != '' && typ === quote ){
        const elapsed = new Date().getTime() - startTime;
        const message = `Loser ${elapsed/1000} seconds`;
        msg.innerText = message;
        rankings(elapsed/1000, category);
        typed.disabled = true;
        rankPrint();
    }
    else if (typeWord == currWord && typ.endsWith(' ')){
        wordIndex++;
        
        for (const wordEl of quoteThing.childNodes){
            wordEl.className= '';
        }

        quoteThing.childNodes[wordIndex].className = 'highlight';
    }
    else if (quote.startsWith(typ)){
        typed.className = '';
    }
    else{
        typed.className = 'error'
    }
});

function getRank(){

    let rankS = localStorage.getItem('rank'+category);

    if (rankS == null){
        return null;
    }

    let rank = rankS.substring(1,rankS.length-1).split(",").map(Number);

    let rankInt = [];

    for (let i = 0; i < rank.length; i++){
        rankInt.push(rank[i]);
    }

    return rankInt;
}

function rankings(time){
    if (time == null){
        return;
    }

    let rankInt = getRank();

    if (rankInt == null){
        let rank = [time];
        localStorage.setItem('rank'+category, JSON.stringify(rank));
        return;
    }

    if (rankInt.length <5){
        rankInt.push(time);
        bsort(rankInt);
    }
    else{
        for (const t of rankInt){
            if (time < t){
                rankInt[4] = time;
                bsort(rankInt);
                break;
            }
        }
    }
    if (isNaN(rankInt[0])){
        rankInt.shift();
    }
    localStorage.setItem('rank'+category, JSON.stringify(rankInt));
    console.log(rankInt);
}

function rankPrint(){
    let rank = getRank();
    bsort(rank);

    if (rank == null || isNaN(rank[0])){
        document.getElementById("rank-print").innerText = "";
        for (let i = 0; i < 5; i++){
            document.getElementById("rank"+(i+1)).innerText = "";
        }
        return;
    }
    document.getElementById("rank-print").innerText = "Rankings";
    for (let i = 0; i < 5; i++){
        if (i<rank.length){
            document.getElementById("rank"+(i+1)).innerText = `${i+1}. ${rank[i]}`;
        }
        else{
            document.getElementById("rank"+(i+1)).innerText = "";
        }
    }
    console.log(rank);
}

document.getElementById(id = "clear").addEventListener('click', ()=>{
    localStorage.setItem("rank"+category,null);
    console.log("1");
    rankPrint();
    if (typed.value == ""){
        startTime = new Date().getTime();
    }
})

function bsort(a){
    if (a == null){
        return;
    }
    for (let i = 0; i < a.length; i++){
        for (let j = 0; j < a.length-1; j++){
            if (a[j]> a[j+1]){
                let t = a[j];
                a[j] = a[j+1];
                a[j+1] = t;
            }
        }
    }
}