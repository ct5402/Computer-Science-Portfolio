// these are the variables used in order to connect everything together and save the elements of the calculator.
var button = document.getElementById("submitButton");
var input1 = document.getElementById('input1');
var input2 = document.getElementById('input2');
var answer;
var display = document.getElementById('display');
var dropdown = document.getElementById("dropdown");

//
button.addEventListener("click", doMath);

// This function is what allows the calculator to operate and performs the actions
function doMath() {
    // this adds
    if (dropdown.value == "+") {
        answer = parseInt(input1.value) + parseInt(input2.value);
        display.innerHTML = answer;
    }
    // this subtracts
    if (dropdown.value == "-") {
        answer = parseInt(input1.value) - parseInt(input2.value);
        display.innerHTML = answer;
    }
    // this multiplies
    if (dropdown.value == "x") {
        answer = parseInt(input1.value) * parseInt(input2.value);
        display.innerHTML = answer;
    }
    // this divides
    if (dropdown.value == "/") {
        answer = parseInt(input1.value) / parseInt(input2.value);
        display.innerHTML = answer;
    }
    // this finds the remainder of a number when divided.
    if (dropdown.value == "%") {
        answer = parseInt(input1.value) % parseInt(input2.value);
        display.innerHTML = answer;
    }
    if (dropdown.value == ">") {
        if (input1.value > input2.value) {
            display.innerHTML = false;
        }
        else {
            display.innerHTML = true;

        }
    }
    if (dropdown.value == "^") {
        answer = Math.pow(input1.value, input2.value);
        display.innerHTML = answer;
    }
}
