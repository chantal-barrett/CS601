// Welcome the visitor with an alert
alert("Welcome to Chantal's Caculator!");

// Declare needed variables
const hiddenClass = "hide";
let continueAdding = true;

// Function for when the user submits their name
function submitName() {
    // Get the user's name
    let name = document.querySelector("#name").value;

    // Display the user's name with an alert
    alert("Welcome " + name + "!");

    // Begin the calculator
    initCalculator();
}

// Continuely prompt the user two enter two numbers until they decide not to
function initCalculator() {
    while(continueAdding) {
        let numbers = prompt("Please enter two numbers separated by a comma (,)");

        // If the user did not enter valid numbers
        if (validateNumbers(numbers) === false) {
            // Alert them that they have entered the numbers incorrectly
            alert("Whoops, " + numbers + " is not a valid combination of numbers. Please ensure you enter two numbers separated by a comma (,)");

            // Prompt the user to enter another number by continuing to the next iteration of the loop
            continue;
        }

        // If the numbers are valid, add them together
        let sum = addNumbers(numbers);
        alert("The sum of your two numbers is: " + sum);

        // If the sum of the numbers is greater than ten
        if (sum > 10) {
            // Alert the user that is a big number
            alert("That is a big number.");
        }
        // If the sume of the numbers is less than or equal to ten
        else if(sum <= 10) {
            // Alert the user that is a small number
            alert("That is a small number.");
        }

        // Prompt the user if they want to add two numbers again
        let response = prompt("Would you like to add two numbers again? (yes/no)");

        // If the user says no, exit out of the program
        if (response === null || response.toLowerCase() === "no") {
            // Thank the user for using the program
            document.querySelector("#welcome-container").classList.add(hiddenClass);
            document.querySelector("#thank-you-container").classList.remove(hiddenClass);

            // Set continueAdding to false so the program exits out of the loop
            continueAdding = false;
        }
        else if (response.toLowerCase() === "yes") {
            // Continue the loop of prompting the user
            continue;
        }
        else {
            let validAnswer = false;
            
            // Continue prompting the user until they answer yes/no
            while (!validAnswer) {
                let answer = prompt("Whoops, please enter either yes or no: ");

                if (answer === null || answer.toLowerCase() === "no" || answer.toLowerCase() === "yes") {
                    validAnswer = true;

                    if (answer === null || answer.toLowerCase() === "no") {
                        continueAdding = false;

                        // Thank the user for using the program
                        document.querySelector("#welcome-container").classList.add(hiddenClass);
                        document.querySelector("#thank-you-container").classList.remove(hiddenClass);
                    }
                }                
            }
        }
    }
}

// Validate numbers
function validateNumbers(numbers) {

    // First verify the user entered numbers separated by a comma
    if(!numbers.includes(",")) {
        // Return false, as the user did not enter two numbers
        return false;
    }

    // Get the two numbers the user entered by splitting the string
    let numberOne = numbers.split(",")[0];
    let numberTwo = numbers.split(",")[1];

    // If the user doesn't enter two numbers (use isNaN to determine if the value is a valid number (isNaN will return true if the data is not a number))
    if (numberOne === undefined || numberTwo === undefined || isNaN(numberOne) || isNaN(numberTwo)) {

        // Return false, as the user did not enter two valid numbers
        return false;
    }

    // Return true, as the user entered two valid numbers
    return true;
}

// Adds the numbers together
function addNumbers(numbers) {

    let numberOne = numbers.split(",")[0];
    let numberTwo = numbers.split(",")[1];

    // Note: no need to validate these again, as they were validated when we called the validateNumbers function
    let sum = parseFloat(numberOne) + parseFloat(numberTwo);

    return sum;
}