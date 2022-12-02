const tabs = document.querySelectorAll(".tab");
const selectedTabClass = "tab-selected";
const hiddenClass = "hidden";

// Add click event listener for each tab
for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", showTabContent);
}

// Add event listener for join form
document.getElementById("join-form").addEventListener("submit", submitJoinForm);

// Add event listener for update form
document.getElementById("update-form").addEventListener("submit", submitUpdateForm);

// Add event listener for unsubscribe form
document.getElementById("unsubscribe-form").addEventListener("submit", submitUnsubscribeForm);

function showTabContent(event) {
    // Update the selected tab
    if(document.querySelector("." + selectedTabClass)) {
        document.querySelector("." + selectedTabClass).classList.remove(selectedTabClass);
    }
    event.currentTarget.classList.add(selectedTabClass);

    // Hide all tabcontent containers
    let tabcontentContainers = document.querySelectorAll(".tabcontent");
    for (let i = 0; i < tabcontentContainers.length; i++) {
        tabcontentContainers[i].classList.add(hiddenClass);
    }

    // Show the correct tabcontent
    let tabcontentToShow = event.currentTarget.getAttribute("data-tabcontent-id");
    document.getElementById(tabcontentToShow).classList.remove(hiddenClass);
}

function submitJoinForm(event) {
    // Hide error message
    document.getElementById("join-error").classList.add(hiddenClass);

    // Create a fetch request
    let url = "./database/subscribe.php";
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
            // Send the data from the form
            'name' : document.getElementById("join-name").value,
            'email' : document.getElementById("join-email").value
        })
    })
    .then(response => {
        if(response.ok) {
            // Show a success message so the user knows the form submitted okay
            document.getElementById("join-success").innerText += document.getElementById("join-name").value;
            document.getElementById("join-success").classList.remove(hiddenClass);
            document.getElementById("join-error").classList.add(hiddenClass);

            // Clear the input fields
            clearInputFields(document.getElementById("join-form"));
        }
        else {
            document.getElementById("join-success").classList.add(hiddenClass)
            document.getElementById("join-error").classList.remove(hiddenClass);
        }
    });

    event.preventDefault();
}

function submitUpdateForm(event) {
    // Hide error message
    document.getElementById("update-error").classList.add(hiddenClass);

    // Create a fetch request
    let url = "./database/update.php";
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
            // Send the data from the form
            'accountEmail' : document.getElementById("account-email").value,
            'name' : document.getElementById("update-name").value,
            'email' : document.getElementById("update-email").value
        })
    })
    .then(response => {
        if(response.ok) {
            // Show a success message so the user knows the form submitted okay
            document.getElementById("update-success").classList.remove(hiddenClass);
            document.getElementById("update-error").classList.add(hiddenClass);

            // Clear the input fields
            clearInputFields(document.getElementById("update-form"));
        }
        else {
            document.getElementById("update-success").classList.add(hiddenClass)
            document.getElementById("update-error").classList.remove(hiddenClass);
        }
    });

    event.preventDefault();
}

function submitUnsubscribeForm(event) {
    // Hide error message
    document.getElementById("unsubscribe-error").classList.add(hiddenClass);

    // Create a fetch request
    let url = "./database/unsubscribe.php";
    let email = document.getElementById("unsubscribe-email").value;
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
            // Send the data from the form
            'email' : email
        })
    })
    .then(response => {
        if(response.ok) {
            // Show a success message so the user knows the form submitted okay
            document.getElementById("unsubscribe-success").innerText = "We have successfully unsubscribe " + email + " from our mailing list";
            document.getElementById("unsubscribe-success").classList.remove(hiddenClass);
            document.getElementById("unsubscribe-error").classList.add(hiddenClass);

            // Clear the input fields
            clearInputFields(document.getElementById("unsubscribe-form"));
        }
        else {
            document.getElementById("unsubscribe-success").classList.add(hiddenClass)
            document.getElementById("unsubscribe-error").classList.remove(hiddenClass);
        }
    });

    event.preventDefault();
}

// Clears all input fields within the given container element
function clearInputFields(container) {
    let inputFields = container.querySelectorAll(".form-input");
    for (input of inputFields) {
        input.value = "";
    }
}