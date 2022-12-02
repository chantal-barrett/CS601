document.addEventListener("DOMContentLoaded", function() {

    const hiddenClass = "hidden";

    // Add event listeners for projects
    const projects = document.querySelectorAll(".project");
    for (let project of projects) {
        project.addEventListener("click", function(event) {
            let overlayID = event.currentTarget.getAttribute("data-overlay-id");
            let overlay = document.getElementById(overlayID);

            // Add an event listener for when the user wants to close the overlay
            overlay.querySelector(".close-overlay").addEventListener("click", closeOverlay);

            // Show the overlay
            overlay.classList.remove(hiddenClass);
            document.querySelector(".overlay").classList.remove(hiddenClass);
        });
    }

    function closeOverlay(event) {
        event.currentTarget.parentElement.classList.add(hiddenClass);
        event.currentTarget.parentElement.parentElement.classList.add(hiddenClass);
    }

    // Use Vue.js to create overlays
    new Vue({
        el: '#overlay',
        data: {
            projects: [
                {
                    id: "database-overlay",
                    title: "Database Project",
                    description: "description",
                    linkTitle: "Download Database Design",
                    href: "content/projects/database_design.docx"
                },
                {
                    id: "macros-overlay",
                    title: "Macros project",
                    description: "description",
                    linkTitle: "link title",
                    href: "macros.html"
                },
                {
                    id: "spotify-overlay",
                    title: "Spotify",
                    description: "Spotify proposal",
                    linkTitle: "Download proposal",
                    href: "content/projects/spotify_business_model.docx"
                },
                {
                    id: "calculator-overlay",
                    title: "Calculator",
                    description: "For my Web Application Development course at Boston University, I created a simple web application that uses HTML5, CSS, and JavaScript to prompt a user to enter their name and two numbers. The program validates that the user entered their name and two valid numbers and then returns the sum of those two numbers.",
                    linkTitle: "Try the calculator",
                    href: "../HW3/index.html"
                },
                {
                    id: "website-overlay",
                    title: "Portfolio Website",
                    description: "Believe it or not, I actually coded this entire website. It utilizes HTML5, CSS, and JavaScript to provide an unparralled user experience. I also used PHP to save user's messages to a database, add subscribed users to the database, and unsubscribe users.",
                    linkTitle: "Start from Home",
                    href: "index.html"
                },
                {
                    id: "form-overlay",
                    title: "Form Submission",
                    description: "For my Web Application Development course at Boston University, I created a simple web application that uses HTML5, CSS, and JavaScript to ask a user to enter their first name, last name, facilitator, and select what they are inquiring about and their preferred method(s) of contact. The program validates that the user entered their name, a valid facilitator, selected an inquiry option, and selected at least one contact option before submitting the form.",
                    linkTitle: "Try the form",
                    href: "../HW4/index.html"
                }
            ]
        }
    });
        
});