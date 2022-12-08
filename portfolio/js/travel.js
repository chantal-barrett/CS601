// Use Vue.js for page
var travelContainer = new Vue({
    el: '#travelContainer',
    data: {
        images: [
            {
                location: "Aruba",
                description: "Aruba is the first place I tried acia bowls and let me tell you, they did not dissapoint!",
                source: "/CS601/portfolio/content/aruba_acia.png",
                alt: "Acia bowls on the beach",
                width: "376",
                height: "506"
            },
            {
                location: "Nashville",
                description: "People know Nashville for their country music, but one of my favorite parts of Nashville was their milkshakes",
                source: "/CS601/portfolio/content/nashville_milkshake.JPG",
                alt: "Chantal smiling at a milkshake in Nashville",
                width: "392",
                height: "490"
            },
            {
                location: "Aruba",
                description: "My second time in Aruba, my brother and I went snorkeling!",
                source: "/CS601/portfolio/content/aruba_snorkeling.JPG",
                alt: "Chantal snorkeling with her brother",
                width: "332",
                height: "442"
            },
            {
                location: "Nantucket",
                description: "My family and I took a trip to Nantucket and visited my cousin at work on Barlett's Farm",
                source: "/CS601/portfolio/content/nantucket.JPG",
                alt: "Chantal and family in Nantucket",
                width: "576",
                height: "432"
            },
            {
                location: "Florida",
                description: "My dad moved to Florida a few years ago so I try to visit as often as I can. One of my favorite things to do there is go jetskiing - we often make friends with dolphins!",
                source: "/CS601/portfolio/content/florida_jetskiing.jpg",
                alt: "Jetskiing with dolphin",
                width: "375",
                height: "500"
            },
            {
                location: "Cape Cod",
                description: "My family shared a house on Cape Cod and when I was younger I would always visit this candy store. I think you can tell how much I like it!",
                source: "/CS601/portfolio/content/capecod_candy.png",
                alt: "Chantal in a candy store at Cape Cod",
                width: "376",
                height: "507"
            }
        ]
    },
    methods: {
        // Changes the picture when a dot is clicked
        showPicture: function(event) {
            // Get the index of the location to show
            let index = parseInt(event.currentTarget.getAttribute("data-index"));

            // Update the location
            this.updateLocation(index);
        },
        nextPicture: function(event) {
            // Declare and initialize needed variables
            let direction = event.currentTarget.getAttribute("data-direction");
            let currentIndex = document.querySelector(".location-container.active").getAttribute("data-index");
            let imagesLength = document.querySelectorAll(".dot").length - 1;
            let nextIndex = "0";

            // Get the new index
            if (direction === "next") {
                nextIndex = parseInt(currentIndex) + 1;
                if (nextIndex > imagesLength) {
                    nextIndex = 0;
                }
            }
            else if (direction === "previous") {
                nextIndex = parseInt(currentIndex) - 1;
                if (nextIndex === -1) {
                    nextIndex = imagesLength;
                }
            }

            // Update the location
            this.updateLocation(nextIndex);

        },
        updateLocation: function(index) {
            // Declare and intialize needed variables
            let selectedClass = "selected";
            let activeClass = "active";
            let newLocation = document.querySelectorAll(".location-container")[index];

            // Remove the selected class from the dot that is currently selected
            document.querySelector("." + selectedClass).classList.remove(selectedClass);

            // Add the selected class to the correct dot
            document.querySelectorAll(".dot")[index].classList.add(selectedClass);

            // Show the correct photo
            document.querySelector("." + activeClass).classList.remove(activeClass);
            newLocation.classList.add(activeClass);

        }
    },
    template: `
        <section id="travelContainer">
            <div class="image-container">
                <button class="previous arrow" data-direction="previous" v-on:click="nextPicture">
                    <span class="prev-arrow" aria-hidden="true"></span>
                    <span class="screen-reader-only">Previous location</span>
                </button>
                <div v-for="(image, index) in images" :class="{'active': index === 0}" class="location-container" :data-index="index">
                    <div class="location-header">
                        <h2 class="location">{{ image.location }}</h2>
                        <p class="location-description">{{ image.description }}</p>
                    </div>
                    <img class="location-image" :src="image.source" :alt="image.alt" :width="image.width" :height="image.height">
                </div>
                
                <button class="next arrow" data-direction="next" v-on:click="nextPicture">
                    <span class="next-arrow" aria-hidden="true"></span>
                    <span class="screen-reader-only">Next location</span>
                </button>
            </div>

            <div class="dots">
                <button v-for="(image, index) in images" :class="{'selected': index === 0}" class="dot" :data-index="index" v-on:click="showPicture">
                    <!-- For accessibility -->
                    <span class="screen-reader-only">{{ image.location }}</span>
                </button>
            </div>
        </section>
    `,
});