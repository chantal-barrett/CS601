document.addEventListener("DOMContentLoaded", function() {

    // Declare and initalize needed variables
    const hiddenClass = "hidden";
    const activeClass = "overlay-active";

    // Add event listeners for projects
    const projects = document.querySelectorAll(".project");
    for (let project of projects) {
        project.addEventListener("click", openOverlay);

        // If a user is navigating through the page with their keyboard
        project.addEventListener("keyup", function(event) {
            // Open the overlay if they click enter
            if (event.key === "Enter") {
                openOverlay(event);

                // The tab focus should now be on the overlay
                document.querySelector("." + activeClass + " .close-overlay").focus();
            }
        });
    }

    // Opens the overlay
    function openOverlay(event) {
        let overlayID = event.currentTarget.getAttribute("data-overlay-id");
        let overlay = document.getElementById(overlayID);

        // Add an event listener for when the user wants to close the overlay
        overlay.querySelector(".close-overlay").addEventListener("click", closeOverlay);

        // Show the overlay
        overlay.classList.add(activeClass);
        document.querySelector(".overlay").classList.remove(hiddenClass);
    }

    // Closes the overlay
    function closeOverlay() {
        // Remove active class from overlay
        document.querySelector("." + activeClass).classList.remove(activeClass);

        // Hide the overlay
        document.querySelector(".overlay").classList.add(hiddenClass);
    }

    // Use Vue.js to create overlays
    new Vue({
        el: '#overlay',
        data() {
            return {
                projects: [
                    {
                        id: "database-overlay",
                        title: "Database Design",
                        description: "For my Database course at Boston University, I designed a database for a mobile application that lets a user keep track of their physical activity.",
                        linkTitle: "Download Database Design",
                        href: "content/projects/database_design.docx"
                    },
                    {
                        id: "macros-overlay",
                        title: "Macros Tracker",
                        description: "For my Rich Internet Application Development course at Boston University, I developed a macronutrients tracker using Angular. This macronutrients tracker is a responsive web application that lets a user set their macro goals and track their food intake so the user can see how well they are performing against their goals.",
                        linkTitle: "Download the Project Overview",
                        href: "content/projects/macros.docx"
                    },
                    {
                        id: "spotify-overlay",
                        title: "Spotify Proposal",
                        description: "Spotify is the global leader in the audio streaming industry due to its unique freemium business model, its omnipresence, as well as its proprietary technology used to provide users with the best possible audio streaming experience. However, Spotify struggles to sustain a profit in an increasingly competitive market. For my IT Strategy and Management course at Boston University, I created a business proposal to help with this.",
                        linkTitle: "View proposal",
                        href: "content/projects/spotify_business_model.docx"
                    },
                    {
                        id: "calculator-overlay",
                        title: "Calculator",
                        description: "For my Web Application Development course at Boston University, I created a simple web application that uses HTML5, CSS, and JavaScript to prompt a user to enter their name and two numbers. The program validates that the user entered their name and two valid numbers and then returns the sum of those two numbers.",
                        linkTitle: "Try the calculator",
                        href: "../CS601/HW3/index.html"
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
                        href: "../CS601/HW4/index.html"
                    }
                ]
            };
        },
        methods: {
            closeOverlayOnClick: function(event) {
                if (event.target.getAttribute("id") === "overlay") {
                    closeOverlay();
                }
            }
        },
        template: `
            <div id="overlay" class="overlay hidden" v-on:click="closeOverlayOnClick">
                <div v-for="project in projects" :id="project.id" class="overlay-content">
                    <button class="close-overlay">
                        <span class="screen-reader-only">Close overlay</span>                    
                    </button>
                    <h2 class="overlay-title">{{ project.title }}</h2>
                    <p class="overlay-description">{{ project.description }}</p>
                    <a :href="project.href" class="overlay-link" target="_blank">{{ project.linkTitle }} &rarr;</a>
                </div>
            </div>
        `,
    });     
});