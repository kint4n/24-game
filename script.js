const cards = document.querySelectorAll('.card');
const cardList = document.querySelector('#card-btn');
const operatorList = document.querySelector('#operator-btn');

let selectedCounter = 0;

function onHoverOver(e) {
    if(!e.target.classList.contains('selected')) {
        if(e.target.classList.contains('card') || e.target.classList.contains('operator')) {
            e.target.style.backgroundColor = '#ccc';
        }
    }
}

function onMouseLeave(e) {
    if(!e.target.classList.contains('selected')) {
        if(e.target.classList.contains('card') || e.target.classList.contains('operator')) {
            e.target.style.backgroundColor = '';
        }
    }
}

function onCardClick(e) {
    if(e.target.classList.contains('card') && !e.target.classList.contains('selected')) {
        e.target.style.backgroundColor = '#90EE90';
        e.target.classList.add('selected');
        selectedCounter += 1;
        // console.log(e.target.innerText);
        console.log(selectedCounter);
    }
    else {
        e.target.style.backgroundColor = '';
        e.target.classList.remove('selected');
        selectedCounter -= 1;
        console.log(selectedCounter);
    }
}

function onOperatorClick(e) {
    if(selectedCounter >= 1) {
        if(!e.target.classList.contains('selected')) {
            e.target.style.backgroundColor = '#90EE90';
            e.target.classList.add('selected');
        }
        else {
            e.target.style.backgroundColor = '';
            e.target.classList.remove('selected');
        }

    }
}


function randomCardValue() {;
    cards.forEach(card => 
        card.innerText = Math.floor(Math.random() * 10 + 1    
    ));
}

function init() {
    randomCardValue();

    // Event listeners
    cardList.addEventListener('mouseover', onHoverOver);
    cardList.addEventListener('mouseout', onMouseLeave);
    cardList.addEventListener('click', onCardClick);

    operatorList.addEventListener('mouseout', onMouseLeave);
    operatorList.addEventListener('mouseover', onHoverOver);
    operatorList.addEventListener('click', onOperatorClick);

    
}


init();
