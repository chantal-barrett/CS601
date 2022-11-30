let promise = Promise.resolve(function() {
    let url = "https://chantalbarrett.com/CS601/HW5/degrees.json";
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    });
});

const hiddenClass = "hidden";

// Add event listener for fetching response
document.getElementById("get-degrees").addEventListener("click", fetchDegrees);


function fetchDegrees() {
    const responseContainer = document.getElementById("response-container");
    const responseStatus = document.getElementById("response-status");
    const responseError = document.getElementById("response-error");
    
    // Create a fetch request to the JSON file that returns a promise
    let url = "https://chantalbarrett.com/CS601/HW5/degrees.json";
    fetch(url)
    .then(response => {
        if(response.ok) {
            responseStatus.innerText = "Yay! Your request returned a response status of " + response.status;
        }
        else {
            responseStatus.innerText = "Oh no! Your request returned a response status of " + response.status;
            responseError.classList.remove(hiddenClass);
        }
        
        response.json().then(data => {
            console.log(data);
            const degreesContainer = document.getElementById("degrees-container");
            // Clear any text thhat might be in the HTML
            degreesContainer.innerHTML = "";
            let degrees = data.degrees;
            for (let i = 0; i < degrees.length; i++) {
                let degree = degrees[i].degree;
                let major = degree.major;
                let school = degree.school;
                let type = degree.type;
                let year = degree.year_conferred;

                let newHTMLElement = `<div class="degree">
                                        <p class="school">School: ${school}</p>
                                        <p class="major">Major: ${major}</p>
                                        <p class="degree-type">Degree Type: ${type}</p>
                                        <p class="year">Year Conferred: ${year}</p>
                                    </div>`;
                
                degreesContainer.innerHTML += newHTMLElement;
            }

            degreesContainer.classList.remove(hiddenClass);
        })
    })
    .catch((error) => {
        // Show the error message
        responseError.classList.remove(hiddenClass);
    });

    // Show the response container
    responseContainer.classList.remove(hiddenClass);
}