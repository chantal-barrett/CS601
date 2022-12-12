document.addEventListener("DOMContentLoaded", function() {

    // Declare and initalize needed variables
    const errorClass = "field-error";
    const hiddenClass = "hidden";
    const userName = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const contactForm = document.getElementById("contact-form");

    // Add event listener to validate name while typing
    userName.addEventListener("keyup", () => {
        valueProvided(userName);
    });

    // Add event listener to validate email while typing
    email.addEventListener("keyup", () => {
        validEmail(email);
    });

    // Add event listener to validate message while typing
    message.addEventListener("keyup", () => {
        valueProvided(message);
    });

    // Add event listener for when a user clicks submit
    contactForm.addEventListener('submit', submitContactForm);

    function submitContactForm(event) {

        // Declare and initialize needed variables
        const subscribe = document.getElementById("subscribe").checked;

        // Hide all error messages
        const errorMessages = document.querySelectorAll(".error-message");
        for (let i = 0; i < errorMessages.length; i++) {
            errorMessages[i].classList.add(hiddenClass);
        }

        // Hide success message
        document.getElementById("submit-success").classList.add(hiddenClass);

        // First, verify user provided all fields
        let isValid = true;
        if (!valueProvided(userName)) { isValid = false; }
        if (!validEmail(email)) { isValid = false; }
        if (!valueProvided(message)) { isValid = false; }
        if (!isValid) {
            // Focus on the first incorrect field
            document.querySelector("." + errorClass).querySelector(".form-input").focus();

            // Prevent form from submitting
            event.preventDefault();
            return false;
        }

        // Create a fetch request
        let url = "./database/add_message.php";
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                // Send the data from the form
                'name' : userName.value,
                'email' : email.value,
                'message' : message.value,
                'subscribe': subscribe
            })
        })
        .then(response => {
            console.log(response.json());
            if(response.ok) {
                // Show a success message so the user knows the form submitted okay
                document.getElementById("submit-success").innerText = "Thank you for your message, " + userName.value + "!";
                document.getElementById("submit-success").classList.remove(hiddenClass)

                // Clear the input fields
                const inputFields = document.querySelectorAll(".form-input");
                for (let input of inputFields) {
                    input.value = "";
                }
                document.getElementById("subscribe").checked = false;
            }
            else {
                document.getElementById("submit-error").classList.remove(hiddenClass);
            }
        });

        // Prevent form from submitting
        event.preventDefault();
        return false;
    }

    // Checks if a value was provided for a given field
    function valueProvided(inputField) {
        if (inputField.value === "") {
            inputField.parentElement.classList.add(errorClass);
            return false;
        }
        else {
            inputField.parentElement.classList.remove(errorClass);
            return true;
        }
    }

    function validEmail(inputField) {
        let email = inputField.value;

        // Regex from: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
        // If the email is not valid format
        if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            inputField.parentElement.classList.add(errorClass);
            return false;
        }
        else {
            inputField.parentElement.classList.remove(errorClass);
            return true;
        }
    }
});