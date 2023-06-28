const calculatorDisplay = document.querySelector(".calculator-input");
const calculatorKeys = document.querySelector(".calculator-keys");

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

calculatorKeys.addEventListener('click', handleKeyClick);

function handleKeyClick(e) {
    const element = e.target;
    if (!element.matches('button')) return;

    if (element.classList.contains('operator')) {
        handleOperator(element.value);
    } else if (element.classList.contains('decimal')) {
        inputDecimal();
    } else if (element.classList.contains('clear')) {
        clear();
    } else {
        inputNumber(element.value);
    }

    updateDisplay();
}

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
}

function inputNumber(num) {
    if (waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
}

function calculate(first, second, operator) {
    if (operator === '+') {
        return first + second;
    } else if (operator === '-') {
        return first - second;
    } else if (operator === '*') {
        return first * second;
    } else if (operator === '/') {
        return first / second;
    }

    return second;
}

function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

function clear() {
    displayValue = '0';
}

function updateDisplay() {
    calculatorDisplay.value = displayValue;
}
