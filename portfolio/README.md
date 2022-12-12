# Portfolio

A portfolio website about myself.

## Description

This assignment uses HTML5, CSS, JavaScript, and Vue.js to create a web site that gives an overview of myself. It consists of eleven pages: a home page, an about page, a snowboarding page, a travel page, a contact page, a mailing list page, an expertise page, an accolades page, an education page, a projects page, and an experience page. Each of the pages has a header, nav, main, section, footer, and most an aside where users can quickly connect with me through LinkedIn, Git, or email. 
### How I Exceeded Requirements

In trying my best to get an A on this assigment, I added many features to my website including:
- 11 pages
- Researching CSS and JavaScript features not covered in class (i.e. scrolling behavior)
- Made my website responsive using CSS flexbox, grid, and media queries
- Utilized ES6 features (let, const, arrow functions, for/of loop, fetch)
- Use different style sheets and JavaScript files to help organization and page performance, as there is no need to load files that aren't going to be used on a page
- Support for print layouts (removed empty space of heros that have background images, no scroll bar in nav)
- Provided support for when JavaScript is disabled (i.e. made sure the user could access the nav, added <noscript> tags on pages that need JavaScript that ask the user to enable JavaScript, etc)
- Created a contact form that adds users to a database along with their message. This form also allows users to subscribe to recieving messages. I used PHP to add these users and their messages to a MySQL database.
- Created a join, update information, and unsubscribe form using PHP to add, update, and remove information from a MySQL database
- Every page has a Lighthouse accessibility score of 100 

### Notes to facilitator
- This website is not fully supported in IE, as this website uses ES6 features that IE does not support
- Some issues I ran into:
    - The scrolling behavior on the snowboarding.html page does not fully work in Firefox and Safari (and IE as stated above) so I removed the scrolling behavior in these browsers
    - I did not have time to troubleshoot this further either but for some reason, pages that use Vue.js sometimes have the nav flash on page load
- After the demo I:
    - Updated Vue components to have data returned as a function 
    - Removed scrolling behavior from Firefox and Safari
    - Cleaned up code, added comments, etc

## Getting Started

### Executing program

* To run this program, simply navigate to: https://chantalbarrett.com/portfolio/index.html

## Author

Chantal Barrett

## Version History

* 0.1
    * Initial Release