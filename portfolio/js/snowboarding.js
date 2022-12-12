document.addEventListener("DOMContentLoaded", function() {
    // Because JavaScript is enabled, we want to show the content that requires JavaScript
    let noscriptElements = document.querySelectorAll(".noscript");
    for (let i = 0; i < noscriptElements.length; i++) {
        noscriptElements[i].classList.remove("noscript");
    }

    // Scroll to the top on load
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    // If Firefox or Safari, don't show scrolling behavior
    let userAgent = navigator.userAgent;
    if (userAgent.match(/firefox|fxios/i)) {
        document.querySelector("body").classList.remove("scroll");
    }
    if (userAgent.match(/safari/i)) {
        document.querySelector("body").classList.remove("scroll");
    }
    if (userAgent.match(/chrome|chromium|crios/i)) {
        document.querySelector("body").classList.add("scroll");
    }
    
    // Declare and initalize needed variables
    const scrollElement = document.querySelector(".snowboarding-title");
    const description = document.querySelector(".description");

    // Set the intial properties
    document.body.style.setProperty('--bodyHeight', (scrollElement.offsetWidth * 1.5) + "px");
    document.body.style.setProperty('--descriptionPos', "-" + (scrollElement.offsetWidth) + "px");
    document.body.style.setProperty('--currentPos', "0px");

    // Add an event listener for when the user scrolls
    // Credit for this idea goes to https://css-tricks.com/books/greatest-css-tricks/scroll-animation/, but I have
    // changed this code extensively to fit this purpose
    let previousScroll = 0;
    window.addEventListener('scroll', () => {
        // Declare and intialize needed variables
        let scrollValue = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        
        // Check the scroll value so it does not circle back on screen
        if (scrollValue >= .94) {
            scrollValue = 0.99;
        }

        // Freeze the description content if the snowboarding text is half way off the screen
        if (scrollElement.getBoundingClientRect().left < -1 * (scrollElement.offsetWidth / 2)) {
            description.classList.add("freeze");
        }
        // If the snowboarding text is half on the screen and the user is scrolling up, unfreeze the description content
        else if (previousScroll > currentScroll && description.classList.contains("freeze")){
            description.classList.remove("freeze");
        }

        // Freeze the description content if the description container reached the top of the page
        if (description.getBoundingClientRect().top < 1) {
            description.classList.add("freeze");
        }

        previousScroll = currentScroll;

        // Set the scroll value and currentPos value
        document.body.style.setProperty('--scroll', scrollValue);
        document.body.style.setProperty('--currentPos', "-" + (window.pageYOffset - 100) + "px");
    }, false);

    // When the screen is resized, update the properties
    window.addEventListener("resize", () => {
        document.body.style.setProperty('--bodyHeight', (scrollElement.offsetWidth * 1.17) + "px");
        document.body.style.setProperty('--descriptionPos', "-" + (scrollElement.offsetWidth) + "px");
        document.body.style.setProperty('--currentPos', "0px");
    });
});