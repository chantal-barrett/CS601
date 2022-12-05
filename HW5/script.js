// Declare and initalize needed variable
const hiddenClass = "hidden";

// Add event listener for fetching degrees
document.getElementById("get-degrees").addEventListener("click", fetchDegrees);

// Makes a request to degrees.json to get the degrees I have recieved
function fetchDegrees() {
    const responseContainer = document.getElementById("response-container");
    const responseStatus = document.getElementById("response-status");
    const responseError = document.getElementById("response-error");
    const degreesContainer = document.getElementById("degrees-container");
    
    // Create a fetch request to the JSON file that returns a promise
    let url = "https://chantalbarrett.com/CS601/HW5/degrees.json";
    fetch(url)
    .then(response => {
        // Hide the welcome container
        document.querySelector(".welcome-text").classList.add(hiddenClass);

        // Display the response status
        if(response.ok) {
            responseStatus.innerText = "Yay! Your request returned a response status of " + response.status;
        }
        else {
            responseStatus.innerText = "Oh no! Your request returned a response status of " + response.status;
            responseStatus.style.color = "var(--red)";
        }
        
        response.json().then(data => {
            // Loop through the degrees
            let degrees = data.degrees;
            for (let i = 0; i < degrees.length; i++) {
                let degree = degrees[i];
                let major = degree.major;
                let school = degree.school;
                let type = degree.type;
                let year = degree.year_conferred;
                let courses = degree.courses;

                // Determine the correct text to put as the year
                // If the current year is before the year conferred
                if (new Date().getFullYear() < year) {
                    year = "Expected graduation: " + year;
                }
                else {
                    year = "Degree recieved in: " + year;
                }

                // Create the element to hold all of this degree's information
                const degreeElement = document.createElement("div");
                degreeElement.className = "degree";

                // Add the degree information to the element
                degreeElement.innerHTML = `<div class="degree-title">
                                                <img src="gradcap.png" width="50" height="50" alt="Graduation cap">
                                                <p class="degree-type">${type} in ${major}</p>
                                           </div>
                                           <div class="degree-description">
                                                <p class="school">School: ${school}</p>
                                                <p class="year">${year}</p>
                                           </div>`;

                // Create the table for the courses
                const courseTable = document.createElement("table");

                // Add a caption to the table
                courseTable.innerHTML = `<caption class="courses-header">Courses Taken</caption>`;

                // Add a header to the table
                courseTable.innerHTML += `<thead>
                                        <tr>
                                            <th>Course Number</th>
                                            <th>Course Name</th>
                                        </tr>
                                    </thead>`;

                // Loop through the courses and add each course to the table
                for (let j = 0;  j < courses.length; j++) {
                    let course = courses[j];
                    const courseElement = document.createElement("tr");
                    courseElement.innerHTML = `<td>${course.course_number}</td>
                                               <td>${course.course}</td>`;
                    courseTable.appendChild(courseElement);
                }

                // Add the course table to the degree element
                degreeElement.appendChild(courseTable);

                // Add the degree to the degrees container
                degreesContainer.appendChild(degreeElement);
            }

            // Show the degrees container
            degreesContainer.classList.remove(hiddenClass);
        });
    })
    .catch((error) => {
        // Show the error message
        responseError.innerHTML = `Whoops! We were unable to retrieve the list of degrees<br>Error info: ${error.message}`;
        responseError.classList.remove(hiddenClass);
    });

    // Show the response container
    responseContainer.classList.remove(hiddenClass);
}