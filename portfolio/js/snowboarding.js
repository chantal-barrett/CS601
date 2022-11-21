// JavaScript file to support the scrolling behavior on the snowboarding.html page
const scrollElement = document.querySelector("h1");
const description = document.querySelector(".description");
const footer = document.querySelector("footer");

// Because JavaScript is enabled, we want to show the content
document.body.querySelector("main").classList.remove("noscript");

// Set the intial properties
document.body.style.setProperty('--bodyHeight', (document.querySelector("h1").offsetWidth * 1.17) + "px");
document.body.style.setProperty('--descriptionPos', "-" + (document.querySelector("h1").offsetWidth) + "px");
document.body.style.setProperty('--currentPos', "0px");

// Add an event listener for when the user scrolls
// Credit for this idea goes to https://css-tricks.com/books/greatest-css-tricks/scroll-animation/, but I have
// changed this code extensively to fit this purpose
window.addEventListener('scroll', () => {
    let scrollValue = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
    
    // Check the scroll value so it does not circle back on screen
    if (scrollValue >= .94) {
         scrollValue = 0.99;
    }

    // If the title is completely off the screen, freeze the description content
    if (document.querySelector("h1").getBoundingClientRect().left < -1370) {
        description.classList.add("freeze");
    }
    else {
        description.classList.remove("freeze");
    }

    // Set the scroll value and currentPos value
    document.body.style.setProperty('--scroll', scrollValue);
    document.body.style.setProperty('--currentPos', "-" + (window.pageYOffset - 100) + "px");
}, false);