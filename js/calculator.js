let calculator = '';
let operations = [];
let equalWasClicked = true;

function sum(argument1, argument2) {
    return argument1 + argument2;
}

function subtract(argument1, argument2) {
    return argument1 - argument2;
}

function multiply(argument1, argument2) {
    return argument1 * argument2;
}

function divide(argument1, argument2) {
    return argument1 / argument2;
}

// WHEN USER IS CLICKING IN THE CALCULATOR
$('.calculator-item').click(function () {

    const digit = $(this).text();
    // if it's not sum, subtract, multiply, divide, or ac
    // concatenate the result;
    if (digit === 'AC') {
        $('#result').text('0');
        calculator = '';
        operations = [];
        return;
    }

    if (digit === '+' || digit === '-' || digit === '*' || digit === '/') {
        operations.push(calculator);
        operations.push(digit);
        $('#result').text(calculator + digit);
        calculator = '';
        return;
    }

    let resultText = '';
    if (equalWasClicked) {
        $('#result').text('');
        equalWasClicked = false;
    } else if (calculator === '') {
        resultText = $('#result').text();
    }

    calculator += digit;

    $('#result').text(resultText + calculator);
});

// WHEN USER WANT TO SEE THE RESULTS
$('.equal').click(function () {
    equalWasClicked = true;
    operations.push(calculator);

    let operator = '';
    let result = 0;

    for (let index = 0; index < operations.length; index++) {
        const element = operations[index];
        if (isNaN(element) === false) {
            if (operator !== '') {
                if (operator === '+') {
                    result = sum(result, Number(element));
                } else if (operator === '-') {
                    result = subtract(result, Number(element));
                } else if (operator === '*') {
                    result = multiply(result, Number(element));
                } else if (operator === '/') {
                    result = divide(result, Number(element));
                }
            } else {
                result = Number(element);
            }
        } else {
            operator = element;
        }
    }

    $('#result').text(`${$('#result').text()} = ${result}`);
    operations = [];
    calculator = '';
});