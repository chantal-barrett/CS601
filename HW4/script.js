function validateForm() {

    // Get needed values to validate
    var firstName = document.getElementById("firstName");
    var lastName = document.getElementById("lastName");
    var facilitator = document.getElementById("facilitator");

    // Hide all error fields
    var errors = document.querySelectorAll(".error");
    for (i = 0; i < errors.length; i++) {
        errors[i].classList.add("hidden");
    }

    // If there is an error, we will use these to focus on the first incorrect field;
    var isValid = true;
    var firstInvalidField = "";

    // If first name consists of less than two characters
    if(firstName.value.length < 2) {
        // Show the correct error message
        document.getElementById("firstNameError").innerText = "Please ensure first name is at least two characters long";
        document.getElementById("firstNameError").classList.remove("hidden");

        // The first field to focus on will be this field
        firstInvalidField = firstName;

        // Set isValid to false, as this is not a valid input
        isValid = false;
    }

    // If last name consists of less than two characters
    if(lastName.value.length < 2) {
        // Show the correct error message
        document.getElementById("lastNameError").innerText = "Please ensure last name is at least two characters long";
        document.getElementById("lastNameError").classList.remove("hidden");

        // If there is still no invalid field, this will be to the first field to focus on
        firstInvalidField = (firstInvalidField == "") ? lastName : firstInvalidField;

        // Set isValid to false, as this is not a valid input
        isValid = false;
    }

    // If first name consists of anything other than alpha characters
    if(!/^[A-Za-z]*$/.test(firstName.value)) {
        // Show the correct error message
        // If there is an existing error message, combine the two messages
        if (document.getElementById("firstNameError").innerText.length > 0) {
            document.getElementById("firstNameError").innerText = document.getElementById("firstNameError").innerText + " and consists of only alpha characters";
        }
        else {
            document.getElementById("firstNameError").innerText = "Please ensure you only enter alpha characters";
        }
        document.getElementById("firstNameError").classList.remove("hidden");

        // If there is still no invalid field, this will be to the first field to focus on
        firstInvalidField = (firstInvalidField == "") ? firstName : firstInvalidField;

        // Set isValid to false, as this is not a valid input
        isValid = false;
    }

    // If last name consists of anything other than alpha characters
    if(!/^[A-Za-z]*$/.test(lastName.value)) {
        // Show the correct error message
        // If there is an existing error message, combine the two messages
        if (document.getElementById("lastNameError").innerText.length > 0) {
            document.getElementById("lastNameError").innerText = document.getElementById("lasttNameError").innerText + " and consists of only alpha characters";
        }
        else {
            document.getElementById("lastNameError").innerText = "Please ensure you only enter alpha characters";
        }
        document.getElementById("lastNameError").classList.remove("hidden");

        // If there is still no invalid field, this will be to the first field to focus on
        firstInvalidField = (firstInvalidField == "") ? lastName : firstInvalidField;

        // Set isValid to false, as this is not a valid input
        isValid = false;
    }

    // If the facilitator's name is not a valid facilitator
    if (facilitator.value != "Josh" && facilitator.value != "Christian H"  && facilitator.value != "Christian C"  && facilitator.value != "Behdad" && facilitator.value != "Fazil") {
        // Show the correct error message
        document.getElementById("facilitatorError").innerText = "Please enter a valid facilator";
        document.getElementById("facilitatorError").classList.remove("hidden");

        // If there is still no invalid field, this will be to the first field to focus on
        firstInvalidField = (firstInvalidField == "") ? facilitator : firstInvalidField;

        // Set isValid to false, as this is not a valid input
        isValid = false;
    }

    // If there is an invalid field, focus on this field
    if (firstInvalidField != "") {
        firstInvalidField.focus();
    }

    return isValid;
}