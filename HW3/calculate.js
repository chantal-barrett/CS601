// Ensure the script is run only once all of the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Welcome the visitor with an alert
    alert("Welcome to Chantal's Caculator!");

    // Declare needed variable
    const hiddenClass = "hide";

    // Add event listener for when the user submits their name
    document.getElementById("submit-name").addEventListener("click", function() {
        
        // Get the user's name
        let name = document.querySelector("#name").value;

        // If the user did not enter their name, prompt them for their name using a prompt
        // Note: this is to fufill the requirement of using a prompt and a loop
        if (name === "") {
            let validName = false;

            // Continue to prompt the user for their name until they enter a valid name
            while (!validName) {
                name = prompt("Whoops! Please enter your name before we get started:");
                // If the user clicks cancel, do not coninue in this event listener
                if (name === null) {
                    return;
                }
                // If the user did not enter an empty string
                else if (name != "") {
                    // Set valid name to true
                    validName = true;
                }
            }
        }

        // Display the user's name with an alert
        alert("Welcome " + name + "!");

        // Update the DOM with the user's name
        document.getElementById("usersName").innerText = "Welcome, " + name + "!";

        // Hide the initial container and show the calculator
        document.getElementById("welcome-container").classList.add(hiddenClass);
        document.getElementById("calculator-container").classList.remove(hiddenClass);
    });

    // Add event listener for when the user submits two numbers 
    document.getElementById("add-numbers").addEventListener("click", function() {      
        // Get the user's input
        let numberOne = document.getElementById("numberOne").value;
        let numberTwo = document.getElementById("numberTwo").value;

        // If the user did not enter valid numbers
        if (!validNumber(numberOne) || !validNumber(numberTwo)) {
            // Show the error message
            document.getElementById("error-message").classList.remove(hiddenClass);

            // If the first number is not a valid number, focus on that field
            if (!validNumber(numberOne)) {
                document.getElementById("numberOne").focus();
            }
            // Otherwise, the second number must be invalid so focus on this field
            else {
                document.getElementById("numberTwo").focus();
            }

            // No need to run any other code in this event listener
            return;
        }

        // Add the two numbers
        let sum = addNumbers(numberOne, numberTwo);

        // Update the results container
        document.getElementById("result").innerHTML = `<p>The sum of your two numbers is:</p><p id="sum">` + sum + `</p>`;
        if (sum > 10) {
            document.getElementById("result-size").innerText = "That is a big number.";
        }
        else if (sum <= 10) {
            document.getElementById("result-size").innerText = "That is a small number.";
        }

        // Show the results to the user
        document.getElementById("calculator-container").classList.add(hiddenClass);
        document.getElementById("result-container").classList.remove(hiddenClass);

    });

    // Use loop to add event listeners for checkboxes
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("click", function(event) {
            // Hide the results container
            document.getElementById("result-container").classList.add(hiddenClass);

            // If the value is yes
            if (event.currentTarget.getAttribute("name") === "yes") {
                // Clear the check from the checkbox
                event.currentTarget.checked = false;

                // Clear the number fields
                document.getElementById("numberOne").value = "";
                document.getElementById("numberTwo").value = "";

                // Show the calculator and hide the results
                document.getElementById("calculator-container").classList.remove(hiddenClass);
            }
            // If the value is no
            else if (event.currentTarget.getAttribute("name") === "no") {
                // Thank the user for using the program
                document.getElementById("thank-you-container").classList.remove(hiddenClass);
            }
        });
    }

    // Checks if the specified number is a valid number
    // Note, this is not necessarily required as the input boxes are restricted to numbers, 
    // but I wanted to include a validation function in case the input types were to be changed in the future
    function validNumber(number) {

        // If the user doesn't enter a valid number (use isNaN to determine if the value is a valid number (isNaN will return true if the data is not a number))
        if (isNaN(number) || number === "") {

            // Return false, as this is not a valid number
            return false;
        }

        // Return true, as this is a valid number
        return true;
    }

    // Adds two numbers together
    function addNumbers(numberOne, numberTwo) {

        // Note: no need to validate these again, as they were validated when we called the validNumber() function
        let sum = parseFloat(numberOne) + parseFloat(numberTwo);

        // Return the sum of the two numbers
        return sum;
    }
});