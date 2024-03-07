const cards = document.querySelectorAll('.card');
const cardList = document.querySelector('#card-btn');
const operatorList = document.querySelector('#operator-btn');
const operators = document.querySelectorAll('.operator');

let currentEquation = [];
let usedCards = [];

let selectedCounter = 0;
let isOperatorSelected = false;
let operatorCounter = 0;

function onHoverOver(e) {
    if(!e.target.classList.contains('selected') && !e.target.classList.contains('used')) {
        if(e.target.classList.contains('card') || e.target.classList.contains('operator')) {
            e.target.style.backgroundColor = '#ccc';
        }
    }
}

function onMouseLeave(e) {
    if(!e.target.classList.contains('selected') && !e.target.classList.contains('used')) {
        if(e.target.classList.contains('card') || e.target.classList.contains('operator')) {
            e.target.style.backgroundColor = '';
        }
    }
}

function onCardClick(e) {
    e.preventDefault();
    if(!e.target.classList.contains('used')) {
        if(e.target.classList.contains('card') && !e.target.classList.contains('selected')) {
            if(!isOperatorSelected && selectedCounter > 0) {
                alert('Please select an operator before selecting another card!');
                return;
            }
            else {
                currentEquation.push(e.target.innerText);
                usedCards.push(e.target.id);
                console.log(usedCards);
                if(currentEquation.length === 3) {
                    const answer = solveEquation();
                    clearSelected();
                    updateDOM(answer);
                    return;
                }
                e.target.style.backgroundColor = '#90EE90';
                e.target.classList.add('selected');
                // e.target.classList.add('used');
                selectedCounter += 1;
            }
            
        }
        else {
            currentEquation = [];
            usedCards = [];
            e.target.classList.remove('selected');
            // e.target.classList.remove('used');
            e.target.style.backgroundColor = '';
            selectedCounter -= 1;
        }
    }
    autoDeselectOperator();
}

function onOperatorClick(e) {
    if(selectedCounter >= 1) {
        if(!e.target.classList.contains('selected') && e.target.classList.contains('operator')) {
            currentEquation.push(e.target.innerText);
            
            // Allows only 1 operator to be selected at a time
            operators.forEach(operator => {
                operator.classList.remove('selected')
                operator.style.backgroundColor = '';
            });
            
            e.target.style.backgroundColor = '#90EE90';
            e.target.classList.add('selected');
            isOperatorSelected = true;
        }
        else {
            currentEquation.splice(1);
            e.target.style.backgroundColor = '';
            e.target.classList.remove('selected');
            isOperatorSelected = false;
        }
    }
}

function randomCardValue() {;
    cards.forEach(card => 
        card.innerText = Math.floor(Math.random() * 10 + 1    
    ));
}

function solveEquation() {
    // Make sure when this equation is called again, answer is set to 0
    let answer = 0;
    // console.log('Solve the equation!');
    const firstCard = parseInt(currentEquation[0]);
    const secondCard = parseInt(currentEquation[2]);
    const equationOperator = currentEquation[1];
    // console.log(equationOperator);

    switch (equationOperator) {
        case '+':
            // console.log('Addition');
            answer = firstCard + secondCard;
            return answer;
        case '−':
            // console.log('Subtraction');
            answer = firstCard - secondCard;
            return answer;
        case '×':
            // console.log('Multiplication');
            answer = firstCard * secondCard;
            return answer;
        case '÷':
            // console.log('Division');
            answer = firstCard / secondCard;
            return answer;
        default:
            break;
    }
    // console.log(firstCard + ' ' + secondCard);
}

// When valid equation is formed, remove all selected elements (includes cards and operators)
function clearSelected() {
    currentEquation = [];
    selectedCounter = 0;
    operatorCounter = 0;
    isOperatorSelected = 0;
    autoDeselectOperator();

    // Removes selected cards
    cards.forEach(card => {
        if(card.classList.contains('selected')){
        card.style.backgroundColor = '';
        card.classList.remove('selected');
        }
    })
}

// Removes used cards from the DOM and updated 2nd card as the answer to equation
function updateDOM(answer) {
    const firstCard = document.getElementById(usedCards[0]);
    const secondCard = document.getElementById(usedCards[1]);;
    
    firstCard.classList.add('used');
    firstCard.style.setProperty('background-color', '#4aad4a');
    firstCard.style.borderColor = '#4aad4a';
    firstCard.innerText = ''
    
    secondCard.innerText = answer;

    usedCards = [];
}

// De-selects operator is no card is selected
function autoDeselectOperator() {
    if(selectedCounter < 1) {
        operators.forEach(operator => {
            if(operator.classList.contains('selected')) {
                operator.classList.remove('selected');
                operator.style.backgroundColor = '';
                isOperatorSelected = false;
                // console.log(isOperatorSelected);
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

// (FIXED) Bug: currentEquation becomes 0 when clicking 2nd card before selecting an operator
// Bug: used cards interactions by click 