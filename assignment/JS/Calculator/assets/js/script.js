/*let firstNumber = "";
let secondNumber = "$";

let tempFirstNumber = "";
let tempSecondNumber = "";

let operator = "";
let outputNumber = 0;

for (let i = 0; i < 17; i++) {
    $("#btn-" + i).click(function () {
        let btnID = $('#btn-' + i);
        let pressedBtnText = btnID.text().trim();
        switch (pressedBtnText) {
            case "C" :
                firstNumber = "";
                secondNumber = "$";
                tempFirstNumber = "";
                tempSecondNumber = "";
                operator = "";
                outputNumber = 0;
                $('#input-field').val("0");
                break;

            case "+":
                operator = pressedBtnText;
                firstNumber = tempFirstNumber;
                tempFirstNumber = "Undefined";
                break;

            case "-":
                operator = pressedBtnText;
                firstNumber = tempFirstNumber;
                tempFirstNumber = "Undefined";
                break;

            case "/":
                operator = pressedBtnText;
                firstNumber = tempFirstNumber;
                tempFirstNumber = "Undefined";
                break;

            case "*":
                operator = pressedBtnText;
                firstNumber = tempFirstNumber;
                tempFirstNumber = "Undefined";
                break;

            case "=":
                if (isNaN(secondNumber)) {
                    $('#input-field').val(tempFirstNumber);
                } else {
                    outputNumber = getOutPut(operator, firstNumber, secondNumber);
                    $('#input-field').val(outputNumber);
                    tempFirstNumber = "";
                    tempSecondNumber = "";
                    setNumbers(outputNumber, "");
                }
                break;

            default:
                setNumbers(pressedBtnText, pressedBtnText);
                break;
        }
    });
}

function getOutPut(operatorSign, fNumber, sNumber) {
    if (operatorSign === "+") {
        outputNumber = parseFloat(fNumber) + parseFloat(sNumber);
        return outputNumber;
    } else if (operatorSign === "-") {
        outputNumber = parseFloat(fNumber) - parseFloat(sNumber);
        return outputNumber;
    } else if (operatorSign === "/") {
        outputNumber = parseFloat(fNumber) / parseFloat(sNumber);
        return outputNumber;
    } else {
        outputNumber = parseFloat(fNumber) * parseFloat(sNumber);
        return outputNumber;
    }
}

function setNumbers(fNumber, sNumber) {
    if (tempFirstNumber !== "Undefined") {
        tempFirstNumber += fNumber;
        $('#input-field').val(tempFirstNumber);
    }

    if (tempFirstNumber === "Undefined") {
        tempSecondNumber += sNumber;
        secondNumber = tempSecondNumber;
        $('#input-field').val(secondNumber);
    }
}*/


let mainPanel = $('#totalField');
let calPanel = $('#inputField')
let buttons = [$('#btnAc'),$('#btnC'),$('#btnPcnt'),$('#btnDiv'),$('#btn7'),$('#btn8'),$('#btn9'),$('#btnMult'),
    $('#btn4'),$('#btn5'),$('#btn6'),$('#btnMin'),$('#btn1'),$('#btn2'),$('#btn3'),$('#btnPlus'),$('#btn0'),$('#btnPoint'),$('#btnEqual')];

buttons.forEach(button => {
    button.click(() => {
        calPanel.val(calPanel.val() + button.text())
    })
});

function calc(stream) {
    // calculations method
    try {
        var num = stream.split(/\+|\-|\*|\//);
        var signs = stream.split(/\d+/);
        signs.shift();
        signs.pop();
    } catch (error) {
        alert("invalid expression! try again : " + error)
    }
    finally {
        let total = signs.length;
        let numCount = 0;
        let signCount = 0;
        let val = calcExtended(parseInt(num[numCount++]),signs[signCount++],parseInt(num[numCount++]));
        while (signCount<total) {
            val = calcExtended(val,signs[signCount++],parseInt(num[numCount++]));
        }
        //calPanel.val(val);
        mainPanel.val(val);

    }
}

function calcExtended(fnm,fnc,lnm) {
    let finVal;
    switch (fnc) {
        case '+':
            finVal = fnm + lnm;
            break;
        case '*':
            finVal = fnm * lnm;
            break;
        case '-':
            finVal = fnm - lnm;
            break;
        case '/':
            finVal = fnm / lnm;
            break;
    }
    return finVal;
}

$('#btnAc').click(() => {
    $('#totalField').val('');
    $('#inputField').val('');
} )

$('#btnC').click(() => {
    $('#totalField').val('');
    $('#inputField').val('');
} )

$('#btnEqual').click(() => {
    calc(calPanel.val());
} )
