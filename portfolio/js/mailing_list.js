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

    let url = "./database/subscribe.php";
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        // Send the data from the form
        'name' : document.getElementById("join-name").value,
        'email' : document.getElementById("join-email").value
    }));

    xhr.onerror = function(e) {
        // Show error message
        document.getElementById("join-error").classList.remove(hiddenClass);
    }
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
}

function submitUpdateForm(event) {
    // Hide error message
    document.getElementById("update-error").classList.add(hiddenClass);

    let url = "./database/update.php";
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        // Send the data from the form
        'accountEmail' : document.getElementById("account-email").value,
        'name' : document.getElementById("update-name").value,
        'email' : document.getElementById("update-email").value
    }));

    xhr.onerror = function(e) {
        // Show error message
        document.getElementById("update-error").classList.remove(hiddenClass);
    }
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
}

function submitUnsubscribeForm(event) {
    // Hide error message
    document.getElementById("unsubscribe-error").classList.add(hiddenClass);

    let url = "./database/unsubscribe.php";
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        // Send the data from the form
        'email' : document.getElementById("unsubscribe-email").value
    }));

    xhr.onerror = function(e) {
        // Show error message
        document.getElementById("unsubscribe-error").classList.remove(hiddenClass);
    }
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
}