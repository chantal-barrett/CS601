document.addEventListener("DOMContentLoaded", function() {

    // Event listeners for nav items on mobile
    const navItems = document.querySelectorAll(".nav-item");
    const openClass = "nav-item-expanded";
    for (let i = 0; i < navItems.length; i++) {
        navItems[i].addEventListener("click", function(e) {
            // e.currentTarget.nextElementSibling.style.display = "flex";
            let navItem = e.currentTarget;
            if (navItem.classList.contains(openClass)) {
                navItem.classList.remove(openClass);
            }
            else {
                navItem.classList.add(openClass);
            }
            
        });
    }

    // Event listener for menu icon click
    document.querySelector(".hamburger").addEventListener("click", function() {
        // Show the nav
        document.querySelector("nav").style.display = "block";
    });

    // Event listener for close menu icon
    document.querySelector(".close-nav").addEventListener("click", function() {
        // Hide the nav
        document.querySelector("nav").style.display = "none";
    });
});