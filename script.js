const cards = document.querySelectorAll('.card');
const cardList = document.querySelector('#card-btn');
const operatorList = document.querySelector('#operator-btn');
const operators = document.querySelectorAll('.operator');
let currentEquation = [];
let selectedCounter = 0;
let isOperatorSelected = false;
let operatorCounter = 0;

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
        if(!isOperatorSelected && selectedCounter > 0) {
            alert('Please select an operator before selecting another card!');
            return;
        }
        else {
            currentEquation.push(e.target.innerText);
            if(currentEquation.length === 3) {
                console.log('Solve the equation');
            }
            // console.log(currentEquation);
            // console.log(currentEquation.length);
            e.target.style.backgroundColor = '#90EE90';
            e.target.classList.add('selected');
            selectedCounter += 1;
        }
        
    }
    else {
        currentEquation = [];
        // console.log(currentEquation);
        e.target.style.backgroundColor = '';
        e.target.classList.remove('selected');
        selectedCounter -= 1;
    }

    checkUI();
}

function onOperatorClick(e) {
    if(selectedCounter >= 1) {
        if(!e.target.classList.contains('selected') && e.target.classList.contains('operator')) {
            currentEquation.push(e.target.innerText);
            // console.log(currentEquation);
            // Allows only 1 operator to be selected at a time
            operators.forEach(operator => {
                operator.classList.remove('selected')
                operator.style.backgroundColor = '';
            });
            
            e.target.style.backgroundColor = '#90EE90';
            e.target.classList.add('selected');
            isOperatorSelected = true;
            // console.log(isOperatorSelected);
        }
        else {
            currentEquation.splice(1);
            // console.log(currentEquation);
            e.target.style.backgroundColor = '';
            e.target.classList.remove('selected');
            isOperatorSelected = false;
            // console.log(isOperatorSelected);
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

// When valid equation is formed, remove all selected elements (includes cards and operators)
function clearSelected() {

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
