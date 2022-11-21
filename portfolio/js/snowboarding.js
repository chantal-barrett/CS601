document.body.querySelector("main").classList.remove("noscript");
var scrollElement = document.querySelector("h1");
var description = document.querySelector(".description");
document.body.style.setProperty('--bodyHeight', (document.querySelector("h1").offsetWidth * 1.17) + "px");
document.body.style.setProperty('--descriptionPos', "-" + (document.querySelector("h1").offsetWidth) + "px");
document.body.style.setProperty('--currentPos', "0px");

window.addEventListener('scroll', () => {
    console.log("scroll");
    var scrollValue = window.pageYOffset / (document.body.offsetHeight - window.innerHeight);
    
    if (scrollValue >= .94) {
         scrollValue = 0.99;
    }
    if (document.querySelector("h1").getBoundingClientRect().left < -1370) {
        document.querySelector(".description").classList.add("freeze");
    }
    else {
        document.querySelector(".description").classList.remove("freeze");
    }
    document.body.style.setProperty('--scroll', scrollValue);
    document.body.style.setProperty('--currentPos', "-" + (window.pageYOffset - 100) + "px");
}, false);