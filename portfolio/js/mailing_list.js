const tabcontentContainers = document.querySelectorAll(".tabcontent");
const tabs = document.querySelectorAll(".tab");
const selectedTabClass = "tab-selected";
const hiddenClass = "hidden";
const errorClass = "field-error";

// Add event listener for navigating between tabs with arrows
tabs.forEach(tab => {
    tab.addEventListener("keydown", function(event) {
        let currentIndex = event.target.getAttribute("data-tabindex");
        let nextTabIndex = 0;

        // If the user presses the right arrow, go to the next tab
        if (event.key === "ArrowRight") {
            switch(currentIndex) {
                case "0":
                    nextTabIndex = 1;
                    break;
                case "1":
                    nextTabIndex = 2;
                    break;
                case "2":
                    nextTabIndex = 0;
                    break;
            }

            // Focus on the correct tab
            tabs[nextTabIndex].focus();
        }
        // If the user presses the left arrow, go to the previous tab
        else if (event.key === "ArrowLeft") {
            switch(currentIndex) {
                case "0":
                    nextTabIndex = 2;
                    break;
                case "1":
                    nextTabIndex = 0;
                    break;
                case "2":
                    nextTabIndex = 1;
                    break;
            }

            // Focus on the correct tab
            tabs[nextTabIndex].focus();
        }
    })
});

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

// Add event listeners to validate emails
const joinEmail = document.getElementById("join-email");
joinEmail.addEventListener("keyup", () => {
    validEmail(joinEmail);
});

const accountEmail = document.getElementById("account-email");
accountEmail.addEventListener("keyup", () => {
    validEmail(accountEmail);
});

const updateEmail = document.getElementById("update-email");
updateEmail.addEventListener("keyup", () => {
    // The user does not need to provide an email so if it is empty, hide the error message
    if (updateEmail.value == "") {
        updateEmail.parentElement.classList.remove(errorClass);
    }
    else {
        validEmail(updateEmail);
    }
});

const unsubscribe = document.getElementById("unsubscribe-email");
unsubscribe.addEventListener("keyup", () => {
    validEmail(unsubscribe);
});

// Add event listener to validate name
const joinName = document.getElementById("join-name");
joinName.addEventListener("keyup", () => {
    if (joinName.value === "") {
        joinName.parentElement.classList.add(errorClass);
    }
    else {
        joinName.parentElement.classList.remove(errorClass);
    }
});


function showTabContent(event) {
    let newTab = event.currentTarget;
    let currentlySelectedTab = document.querySelector("." + selectedTabClass);
    
    // Update the selected tab
    if(currentlySelectedTab) {
        currentlySelectedTab.classList.remove(selectedTabClass);
        currentlySelectedTab.setAttribute("aria-selected", "false");
        currentlySelectedTab.setAttribute("tabindex", "-1");
    }

    // Update the new tab
    newTab.classList.add(selectedTabClass);
    newTab.setAttribute("aria-selected", "true");
    newTab.setAttribute("tabindex", "0");

    // Hide all tabcontent containers
    for (let i = 0; i < tabcontentContainers.length; i++) {
        tabcontentContainers[i].classList.add(hiddenClass);
    }

    // Show the correct tabcontent
    document.querySelector('.tabcontent[aria-labelledby="' + newTab.getAttribute("id") + '"]').classList.remove(hiddenClass);
}

function submitJoinForm(event) {
    // Declare and intitalize needed variables
    const joinError = document.getElementById("join-error");
    const successMessage = document.getElementById("join-success");
    let email = document.getElementById("join-email").value;
    let name = document.getElementById("join-name").value;
    let isValid = true;
    
    // Hide messages
    joinError.classList.add(hiddenClass);
    successMessage.classList.add(hiddenClass);
    document.getElementById("join-name-error").parentElement.classList.remove(errorClass);
    document.getElementById("join-email-error").parentElement.classList.remove(errorClass);

    // Validate the user's name
    if (name === "") {
        document.getElementById("join-name-error").parentElement.classList.add(errorClass);
        isValid = false;
    }

    // Validate the user's email
    if (!validEmail(document.getElementById("join-email"))) {
        isValid = false;
    }

    // If invalid, prevent the form from submitting and don't continue
    if (!isValid) {
        event.preventDefault();
        return false;
    }

    // Check if the user exists
    // Note: this check would have been better handled in the subscribe.php file, but this project's main focus is JavaScript
    // so I handled this logic using JavaScript
    let getUserUrl = "./database/get_user.php";
    fetch(getUserUrl, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
            'email' : email
        })
    })
    .then(response => {
        response.json().then(data => {
            if(data) {
                // A user with that email exists already so update the user with the correct error
                if (data.name != name) {
                    joinError.innerText = "Whoops, looks like that email is already subscribed to our mailing list. If you wish to change the name associated with this email, please click 'Update Information'";
                }
                else {
                    joinError.innerText = "Whoops, looks like you are already subscribed to our mailing list - awesome!";
                }
        
                // Show the error message
                joinError.classList.remove(hiddenClass);
        
                return true;
            }
            else {
                return false;
            }
        })
        .then( userExists => {

            // If the user exists, don't run this code
            if (userExists) {
                return false;
            }

            // Create a fetch request
            let url = "./database/subscribe.php";
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({
                    // Send the data from the form
                    'name' : name,
                    'email' : email
                })
            })
            .then(response => {
                if(response.ok) {
                    // Show a success message so the user knows the form submitted okay
                    successMessage.innerText = "Thank you for joining our mailing list! I look forward to keeping you updated, " + name;
                    successMessage.classList.remove(hiddenClass);
                    joinError.classList.add(hiddenClass);

                    // Clear the input fields
                    clearInputFields(document.getElementById("join-form"));
                }
                else {
                    successMessage.classList.add(hiddenClass)
                    joinError.innerText = "Whoops, we could not add you to our mailing list at this moment. Please try again later.";
                    joinError.classList.remove(hiddenClass);
                }
            });
        });
    });

    // Prevent the form from submitting
    event.preventDefault();
    return false;
}

function submitUpdateForm(event) {
    // Declare and initialize needed variables
    const updateError = document.getElementById("update-error");
    const successMessage = document.getElementById("update-success");
    let accountEmail = document.getElementById("account-email").value;
    let name = document.getElementById("update-name").value;
    let email = document.getElementById("update-email").value;
    let isValid = true;

    // Hide messages
    updateError.classList.add(hiddenClass);
    successMessage.classList.add(hiddenClass);
    document.getElementById("update-account-email-error").parentElement.classList.remove(errorClass);
    document.getElementById("update-email-error").parentElement.classList.remove(errorClass);
    document.getElementById("update-name-error").parentElement.classList.remove(errorClass);

    // Validate the user's email
    if(!validEmail(document.getElementById("account-email"))) {
        updateError.innerHTML = "Whoops, we could not update your information. Please ensure you are providing a valid account email address";
        isValid = false;
    }

    // Validate the user provided at least a name or email
    if (name === "" && email === "") {
        updateError.innerHTML = "Whoops, please be sure you enter either an updated name or email!</p>";
        isValid = false;
    }
    // If the user provided an email, but its not a valid email address format
    else if (email != "" && !validEmail(document.getElementById("update-email"))) {
        updateError.innerHTML = "Whoops, we could not update your information. Please ensure you are providing a valid email address";
        isValid = false;
    }

    // If invalid, prevent the form from submitting and don't continue
    if (!isValid) {
        event.preventDefault();
        updateError.classList.remove(hiddenClass);
        return false;
    }

    // Check if user exists
    // Note: this check would have been better handled in the update.php file, but this project's main focus is JavaScript
    // so I handled this logic using JavaScript
    let getUserUrl = "./database/get_user.php";
    fetch(getUserUrl, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
            'email' : accountEmail
        })
    })
    .then(response => {
        response.json().then(data => {

            if(response.ok) {
                // If there is data, that mean the user exists
                if(data) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                updateError.innerHTML = "Whoops, we could not update your information at this moment. Please try again later.";
                updateError.classList.remove(hiddenClass);
                return false;
            }
        })
        .then(userExists => {
            // If the user does not exist
            if (!userExists) {
                // Update the error message
                updateError.innerHTML = `Whoops, looks like that email is not subscribed to our mailing list yet. No worries, you can join our mailing list <a href="mailing_list.html">here</a>`;
                updateError.classList.remove(hiddenClass);
                return false;
            }

            // Create a fetch request
            let url = "./database/update.php";
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({
                    // Send the data from the form
                    'accountEmail' : accountEmail,
                    'name' : name,
                    'email' : email
                })
            })
            .then(response => {
                if(response.ok) {
                    // Show a success message so the user knows the form submitted okay
                    successMessage.classList.remove(hiddenClass);
                    updateError.classList.add(hiddenClass);

                    // Clear the input fields
                    clearInputFields(document.getElementById("update-form"));
                }
                else {
                    successMessage.classList.add(hiddenClass)
                    updateError.innerHTML = "Whoops, we could not update your information at this moment. Please try again later.";
                    updateError.classList.remove(hiddenClass);
                }
            });
        });
    });

    // Prevent the form from submitting
    event.preventDefault();
    return false;
}

function submitUnsubscribeForm(event) {

    // Declare and intitalized needed variables
    const unsubscribeError = document.getElementById("unsubscribe-error");
    const successMessage = document.getElementById("unsubscribe-success");
    let email = document.getElementById("unsubscribe-email").value;

    // Hide messages
    unsubscribeError.classList.add(hiddenClass);
    successMessage.classList.add(hiddenClass);
    document.getElementById("unsubscribe-email-error").parentElement.classList.remove(errorClass);

    // Validate the user's email
    if (!validEmail(document.getElementById("unsubscribe-email"))) {
        event.preventDefault();
        return false;
    }

    // Check if user exists
    // Note: this check would have been better handled in the unsubscribe.php file, but this project's main focus is JavaScript
    // so I handled this logic using JavaScript
    let getUserUrl = "./database/get_user.php";
    fetch(getUserUrl, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
            'email' : email
        })
    })
    .then(response => {
        response.json().then(data => {
 
            if(response.ok) {
                // If there is data, that mean the user exists
                if(data) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                unsubscribeError.innerText = "Whoops, we could not unsubscribe " + email + " at this time. Please try again later.";
                unsubscribeError.classList.remove(hiddenClass);
                return false;
            }
        })
        .then(userExists => {
            // If the user does not exist
            if (!userExists) {
                // Update the error message
                unsubscribeError.innerText = "Whoops, looks like that email is not subscribed to our mailing list.";
                unsubscribeError.classList.remove(hiddenClass);
                return false;
            }

            // Create a fetch request
            let url = "./database/unsubscribe.php";
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
                    successMessage.innerText = "We have successfully unsubscribe " + email + " from our mailing list";
                    successMessage.classList.remove(hiddenClass);
                    unsubscribeError.classList.add(hiddenClass);
        
                    // Clear the input fields
                    clearInputFields(document.getElementById("unsubscribe-form"));
                }
                else {
                    successMessage.classList.add(hiddenClass)
                    unsubscribeError.innerText = "Whoops, we could not unsubscribe " + email + " at this time. Please try again later.";
                    unsubscribeError.classList.remove(hiddenClass);
                }
            });
        });
    });

    // Prevent the form from submitting
    event.preventDefault();
    return false;
}

// Clears all input fields within the given container element
function clearInputFields(container) {
    let inputFields = container.querySelectorAll(".form-input");
    for (input of inputFields) {
        input.value = "";
    }
}

function validEmail(inputField) {
    const email = inputField.value;

    // Regex from: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    // If the email is not valid format
    if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        inputField.parentElement.classList.add(errorClass);
        return false;
    }
    else {
        inputField.parentElement.classList.remove(errorClass);
    }

    return true;
}