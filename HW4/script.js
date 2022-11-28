document.addEventListener("DOMContentLoaded", function() {

    // Get needed elements to validate
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const facilitator = document.getElementById("facilitator");
    const inquiryOptions = document.querySelectorAll('input[name="inquiry"]');
    const contactOptions = document.querySelectorAll('input[name="contact"]');

    // Declare needed variable
    const errorClass = "field-error";

    // Add event listener for when the form is submitted
    document.querySelector(".form").addEventListener("submit", validateForm);

    // Add event listener for when the user is typing their first name
    firstName.addEventListener("keyup", () => {
        isValidName("first name", firstName);
    });

    // Add event listener for when the user is typing their last name
    lastName.addEventListener("keyup", () => {
        isValidName("last name", lastName);
    });

    // Add event listener for when the user is typing in a facilitator
    facilitator.addEventListener("keyup", isValidFacilitator);

    // Add event listener for when the user clicks on an inquiry
    for (let i = 0; i < inquiryOptions.length; i++) {
        inquiryOptions[i].addEventListener("click", () => {
            isFieldsetValid(inquiryOptions);
        });  
    }

    // Add event listener for when the user clicks on a contact type
    for (let i = 0; i < contactOptions.length; i++) {
        contactOptions[i].addEventListener("click", () => {
            isFieldsetValid(contactOptions);
        });  
    }

    // Validates the content being submitted in the form
    function validateForm(event) {

        // Hide all error fields and clear their text
        document.getElementById("submitError").style.display = "none";
        let errors = document.querySelectorAll(".field-error");
        for (let i = 0; i < errors.length; i++) {
            errors[i].classList.remove(errorClass);
            errors[i].querySelector(".error").innerText = "";
        }

        // Declare and initialize value to return
        let isValid = true;

        // If there is an error, we will use these to focus on the first invalid field
        let firstInvalidField = "";

        // If there is an error with the first name
        if (!isValidName("first name", firstName)) {

            // The first field to focus on will be this field
            firstInvalidField = firstName;

            // Set isValid to false, as this is not a valid input
            isValid = false;
        }

        // If there is an error with the last name
        if (!isValidName("last name", lastName)) {

            // If there is still no invalid field, this will be the first field to focus on
            firstInvalidField = (firstInvalidField === "") ? lastName : firstInvalidField;

            // Set isValid to false, as this is not a valid input
            isValid = false;
        }

        // If the facilitator's name is not a valid facilitator
        if (!isValidFacilitator()) {

            // If there is still no invalid field, this will be the first field to focus on
            firstInvalidField = (firstInvalidField === "") ? facilitator : firstInvalidField;

            // Set isValid to false, as this is not a valid input
            isValid = false;
        }

        // Check if an inquiry type is selected
        if (!isFieldsetValid(document.querySelectorAll('input[name="inquiry"]'))) {
            // Set isValid to false
            isValid = false;
        }

        // Check if a contact type is selected
        if (!isFieldsetValid(document.querySelectorAll('input[name="contact"]'))) {
            // Set isValid to false
            isValid = false;
        }

        // If there is an invalid field
        if (!isValid) {
            // Focus on the first invalid field
            if (firstInvalidField != "") { firstInvalidField.focus(); }

            // Show the general error message
            document.getElementById("submitError").style.display = "block";

            // Prevent the form from being submitted
            event.preventDefault();
        }

        // Return true/false depending on whether or not the form should be submitted
        return isValid;
    }

    /**
    * Checks if the name is more than two characters and if it consists of only alpha characters
    * and if there is an error, this will show the correct error message
    * Returns true if the name passes validation and false if it does not
    * 
    * param @field: string used to specify the field with the error in the error message
    * param @name: the input element to validate
    **/
    function isValidName(field, name) {

        let errorMessage = "";
        let isValid = true;

        // If the name consists of less than two characters
        if(name.value.length < 2) {
            // Update the text of the error message
            errorMessage = "Please ensure " + field + " is at least two characters long";

            // Set isValid to false, as this is not a valid name
            isValid = false;
        }

        // If the name consists of anything other than alpha characters
        if(!/^[A-Za-z]*$/.test(name.value)) {
            // Update the text of the error message
            if (errorMessage === "") {
                errorMessage = "Please ensure you only enter alpha characters";
            }
            else {
                // If there is an existing error message, combine the two messages
                errorMessage = errorMessage + " and consists of only alpha characters";
            }

            // Set isValid to false, as this is not a valid name
            isValid = false;
        }

        // Update the error message
        name.parentElement.querySelector(".error").innerText = errorMessage;

        // If the name is not valid
        if(!isValid) {
            // Show the error message
            name.parentElement.classList.add(errorClass);
        }
        else {
            // Hide the error message
            name.parentElement.classList.remove(errorClass);
        }
        
        return isValid;
    }

    // Checks if a valid facilitator was provided
    function isValidFacilitator() {

        let isValid = true;

        // If the facilitator's name is not a valid facilitator
        if (facilitator.value != "Josh" && facilitator.value != "Christian H"  && facilitator.value != "Christian C"  && facilitator.value != "Behdad" && facilitator.value != "Fazil") {
            // Show the correct error message
            document.getElementById("facilitatorError").innerText = "Please enter a valid facilator. Facilitators include: Josh, Christian H, Christian C, Behdad, Fazil";
            document.getElementById("facilitatorError").parentElement.classList.add(errorClass);
            
            // Set isValid to false, as this is not a valid input
            isValid = false;
        }
        else {
            // Remove error message
            document.getElementById("facilitatorError").innerText = "";
            document.getElementById("facilitatorError").parentElement.classList.remove(errorClass);
        }

        return isValid;
    }

    /**
    * Checks if a fieldset has at least one option selected
    * Returns true if at least one option is selected and false if no options are selected
    * 
    * param @fieldsetOptions: the group of input elements to validate
    **/
    function isFieldsetValid(fieldsetOptions) {
        let isValid = true;

        // Check if a fieldset option is selected
        let inputSelected = false;
        for(let i = 0; i < fieldsetOptions.length; i++) {
            // If there is one option selected
            if (fieldsetOptions[i].checked) {
                // Set inputSelected to true and break out of the loop
                inputSelected = true;
                break;
            }
        }
        // If there was no fieldset option selected
        if (!inputSelected) {
            // Show the error message
            fieldsetOptions[0].parentElement.parentElement.classList.add("fieldset-error");

            // Set isValid to false
            isValid = false;
        }
        else {
            // Clear the error message
            fieldsetOptions[0].parentElement.parentElement.classList.remove("fieldset-error");
        }

        return isValid;
    }
});