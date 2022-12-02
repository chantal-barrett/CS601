const contactForm = document.getElementById("contact-form");
contactForm.addEventListener('submit', submitContactForm);

function submitContactForm(event) {

    // Hide all error messages
    const hiddenClass = "hidden";
    const errorMessages = document.querySelectorAll(".error-message");
    for (let i = 0; i < errorMessages.length; i++) {
        errorMessages[i].classList.add(hiddenClass);
    }

    let url = "./database/add_message.php";

    // Create a fetch request
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
            // Send the data from the form
            'name' : document.getElementById("name").value,
            'email' : document.getElementById("email").value,
            'message' : document.getElementById("message").value,
            'subscribe': document.getElementById("subscribe").checked
        })
    })
    .then(response => {
        console.log(response.json());
        if(response.ok) {
            // Show a success message so the user knows the form submitted okay
            document.getElementById("submit-success").innerText += document.getElementById("name").value;
            document.getElementById("submit-success").classList.remove(hiddenClass)

            // Clear the input fields
            const inputFields = document.querySelectorAll(".form-input");
            for (input of inputFields) {
                input.value = "";
            }
        }
        else {
            document.getElementById("submit-error").classList.remove(hiddenClass);
        }
    });

    event.preventDefault();
}