// Declare needed variables
const hiddenClass = "hide";
var continueAdding = true;

// Function for when the user submits their name
function submitName() {
    // Get the user's name
    var name = document.querySelector("#name").value;

    // Change the text to display the user's name
    document.querySelector("#usersName").textContent = "Welcome, " + name + "!";

    // Hide welcome screen
    document.querySelector("#welcome-container").classList.add(hiddenClass);

    // Prompt the user to enter numbers
    document.querySelector("#calculator-container").classList.remove(hiddenClass);
}

function addNumbers() {

    while(continueAdding) {
        var numberOne = document.querySelector("#numberOne").value;
        var numberTwo = document.querySelector("#numberTwo").value;

        // Hide the error message
        document.querySelector("#errorMessage").classList.add(hiddenClass);

        // If the numbers are not valid numbers
        if(!isValidNumber(numberOne) || !isValidNumber(numberTwo)) {
            // Show error message
            document.querySelector("#errorMessage").classList.remove(hiddenClass);

            // Break out of loop
            break;
        }

        // Get the sum of the numbers
        var sum = calculateSum(numberOne, numberTwo);

        // Edit the text on the page so the user knows the sum of the numbers
        document.querySelector("#result").textContent = "The sum of your two numbers is: " + sum;

        if (sum > 10) {
            document.querySelector("#result-size").textContent = "That is a big number.";
        }
        else if (sum <= 10) {
            document.querySelector("#result-size").textContent = "That is a small number.";
        }
    }
}

function calculateSum(numberOne, numberTwo) {
    return parseInt(numberOne) + parseInt(numberTwo);
}

function isValidNumber(number) {

    // Use isNaN to determine if the value is a valid number (isNaN will return true if the data is not a number)
    if (isNaN(number)) {
        return false;
    }

    // If the function did not return at this point, the number is a valid number so return true
    return true;
}