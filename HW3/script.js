// // Welcome the visitor with an alert
// alert("Welcome to Chantal's Caculator!");

// // Prompt the user for their name
// var usersName = prompt("Please enter your name to begin: ");

// // Display the user's name with an alert
// alert("Welcome " + usersName + "!");

// Continuely prompt the user two enter two numbers until they decide not to
var continueAdding = true;
while(continueAdding) {
    var numbers = prompt("Please enter two numbers separated by a comma (,)");

    // If the user did not enter valid numbers
    if (validateNumbers(numbers) == false) {
        // Alert them that they have entered the numbers incorrectly
        alert("Whoops, " + numbers + " is not a valid combination of numbers. Please ensure you enter two numbers separated by a comma (,)");

        // Prompt the user to enter another number by continuing to the next iteration of the loop
        continue;
    }

    // If the numbers are valid, add them together
    var sum = addNumbers(numbers);
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
    var response = prompt("Would you like to add two numbers again?");

    // If the user says no, exit out of the program
    if (response == "no") {
        // Thank the user for using the program
        alert("Thank you for using Chantal's Calculator!");

        // Set continueAdding to false so the program exits out of the loop
        continueAdding = false;
    }
}

// Validate numbers
function validateNumbers(numbers) {

    // First verify the user entered numbers separated by a comma
    if(!numbers.includes(",")) {
        // Return false, as the user did not enter two numbers
        return false;
    }

    var numberOne = numbers.split(",")[0];
    var numberTwo = numbers.split(",")[1];

    // If the user doesn't enter two numbers (use isNaN to determine if the value is a valid number (isNaN will return true if the data is not a number))
    if (numberOne == undefined || numberTwo == undefined || isNaN(numberOne) || isNaN(numberTwo)) {

        // Return false, as the user did not enter two valid numbers
        return false;
    }

    // Return true, as the user entered two valid numbers
    return true;
}

// Adds the numbers together
function addNumbers(numbers) {

    var numberOne = numbers.split(",")[0];
    var numberTwo = numbers.split(",")[1];

    // Note: no need to validate these again, as they were validated when we called the validateNumbers function
    var sum = parseInt(numberOne) + parseInt(numberTwo);

    return sum;
}