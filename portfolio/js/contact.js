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
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        // Send the data from the form
        'name' : document.getElementById("name").value,
        'email' : document.getElementById("email").value,
        'message' : document.getElementById("message").value,
        'subscribe': document.getElementById("subscribe").checked
    }));

    xhr.onerror = function(e) {
        // Show error message
        document.getElementById("submit-error").classList.remove(hiddenClass);
    }
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
}