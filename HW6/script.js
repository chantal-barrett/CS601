// Use Vue.js for page
new Vue({
    el: '#app',
    data() {
        return { 
            people: [
                {
                    id: "chantal",
                    name: "Chantal",
                    youngPhotoSource: "./images/chantal_old.png",
                    youngPhotoAlt: "Chantal when she was young",
                    currentPhotoSource: "./images/chantal_current.png",
                    currentPhotoAlt: "Chantal now",
                    yearDifference: 25,
                    maxAge: 27
                },
                {
                    id: "kyle",
                    name: "Kyle",
                    youngPhotoSource: "./images/kyle_old.png",
                    youngPhotoAlt: "Kyle when he was young",
                    currentPhotoSource: "./images/kyle_current.png",
                    currentPhotoAlt: "Kyle now",
                    yearDifference: 7,
                    maxAge: 25
                },
                {
                    id: "chantal-kyle",
                    name: "Chantal and Kyle",
                    youngPhotoSource: "./images/chantal_kyle_old.png",
                    youngPhotoAlt: "Chantal and Kyle when they were young",
                    currentPhotoSource: "./images/chantal_kyle_current.png",
                    currentPhotoAlt: "Chantal and Kyle now",
                    yearDifference: 21,
                    maxAge: 26
                },
                {
                    id: "mom",
                    name: "Chantal's Mom",
                    youngPhotoSource: "./images/mom_old.png",
                    youngPhotoAlt: "Chantal's mom when she was little",
                    currentPhotoSource: "./images/mom_new.png",
                    currentPhotoAlt: "Chantal's mom when she was a teenager",
                    yearDifference: 14,
                    maxAge: 65
                },
                {
                    id: "john",
                    name: "John",
                    youngPhotoSource: "./images/john_old.png",
                    youngPhotoAlt: "John when he was young",
                    currentPhotoSource: "./images/john_current.png",
                    currentPhotoAlt: "John now",
                    yearDifference: 22,
                    maxAge: 28
                }
            ]
        };
    },
    methods: {
        // Changes the picture on hover
        changePicture: function(event) {
            // Get the needed values from the current image
            const image = event.currentTarget
            let newImageSource = image.getAttribute("data-source"); // the new path of the image
            let newImageAlt = image.getAttribute("data-alt"); // the new alt attribute for the image
            let currentImageSource = image.getAttribute("src");
            let currentImageAlt = image.getAttribute("alt");

            // Update the image
            image.setAttribute("src", newImageSource);
            image.setAttribute("alt", newImageAlt);
            image.setAttribute("data-source", currentImageSource);
            image.setAttribute("data-alt", currentImageAlt);
        },
        checkYears: function(event) {
            // Get the needed values
            let id = event.currentTarget.getAttribute("data-guess-for");
            let yearsGuess = parseInt(document.getElementById(id + "-years").value);
            let result = document.getElementById(id + "-result");
            let yearDifference, maxAge;
            
            // Get the actual years difference
            for (let i = 0; i < this.people.length; i++) {
                let person = this.people[i];
                if (person.id === id) {
                    yearDifference = person.yearDifference;
                    maxAge = person.maxAge;
                    break;
                }
            }

            // If the user guessed the year difference correctly
            if (yearsGuess === yearDifference) {
                result.innerText = "Yay! You got it correct, these images are " + yearDifference + " years apart";
            }
            // If the user guessed a year differene thats older than the person/people in the photo
            else if (maxAge < yearsGuess) {
                result.innerText = "These photos are not that old! Try guessing again!";
            }
            else {
                result.innerText = "Whoops, that's not correct. Try guessing again!";
            }

            // Show the result
            result.classList.add("visible");
        },
        next: function(event) {
            // Get the index of the person that is currently showing
            let currentIndex = document.querySelector(".person-container.active").getAttribute("data-index");
            let peopleLength = parseInt(document.querySelectorAll(".person-container").length) - 1;
            let direction = event.currentTarget.getAttribute("data-direction");
            let newIndex = "0";
            let hiddenClass = "hidden";

            // Get the new index
            if (direction === "next") {
                newIndex = parseInt(currentIndex) + 1;
            }
            else if (direction === "previous") {
                newIndex = parseInt(currentIndex) - 1;
            }

            // Show/hide the correct navigation buttons
            if (newIndex > peopleLength -1) {
                document.querySelector(".next").classList.add(hiddenClass);
            }
            else if (newIndex === 0) {
                document.querySelector(".previous").classList.add(hiddenClass);
            }
            else {
                document.querySelector(".next").classList.remove(hiddenClass);
                document.querySelector(".previous").classList.remove(hiddenClass);
            }
            

            // Update the active container
            document.querySelector(".person-container.active").classList.remove("active");
            document.querySelectorAll(".person-container")[newIndex].classList.add("active");
        }
    },
    template: `
        <div id="app">
                <section v-for="(person, index) in people" :id="person.id" :class="{'active': index === 0}" class="person-container" :data-index="index">
                    <img class="image" :src="person.currentPhotoSource" :alt="person.currentPhotoAlt" :data-source="person.youngPhotoSource" :data-alt="person.youngPhotoAlt" width="370" height="370" @mouseover="changePicture" @mouseout="changePicture">

                    <div class="input-container">
                        <h2>How many years apart do you think these photos of {{ person.name }} were taken?</h2>
                        <div class="input-wrapper">
                            <input :id="person.id + '-years'" class="years-input" type="number" placeholder="0">
                            <label :for="person.id + '-years'">years</label>
                        </div>
                        <button type="submit" class="submit-button" value="Guess" :data-guess-for="person.id" v-on:click="checkYears">Guess</button>
                        <p :id="person.id + '-result'" class="result"> </p>
                    </div>
                </section>

                <div class="navigation-container">
                    <button class="previous arrow hidden" data-direction="previous" v-on:click="next">
                        <!-- For accessibility -->
                        <span class="screen-reader-only">&larr; Previous</span>
                    </button>
                    <button class="next arrow" data-direction="next" v-on:click="next">
                        <!-- For accessibility -->
                        <span class="screen-reader-only">Next &rarr;</span>
                </button>
                </div>             
        </div>
    `,
});