const cards = document.querySelectorAll('.card');
const cardList = document.querySelector('#card-btn');
const operatorList = document.querySelector('#operator-btn');
const operators = document.querySelectorAll('.operator');
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
    }
    else {
        e.target.style.backgroundColor = '';
        e.target.classList.remove('selected');
        selectedCounter -= 1;
    }
    checkUI();
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

// De-selects operator is no card is selected
function checkUI() {
    if(selectedCounter < 1) {
        console.log(operators);
        operators.forEach(operator => {
            if(operator.classList.contains('selected')) {
                operator.classList.remove('selected');
                operator.style.backgroundColor = '';
            }
        })
    }
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
