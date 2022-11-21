const contactForm = document.getElementById("contact-form");
contactForm.addEventListener('submit', submitContactForm);

function submitContactForm(event) {
    
    // Get the data from the form
    let formData = {
        'name' : document.getElementById("name").value,
        'email' : document.getElementById("email").value,
        'message' : document.getElementById("message").value,
    }

    let url = "./database/add_to_db.php";
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        'name' : document.getElementById("name").value,
        'email' : document.getElementById("email").value,
        'message' : document.getElementById("message").value,
    }));

    xhr.onerror = function(e) {
        // show error message
    }
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
}