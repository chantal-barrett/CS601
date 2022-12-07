// Use Vue.js for page
var travelContainer = new Vue({
    el: '#travelContainer',
    data: {
        images: [
            {
                location: "Aruba",
                description: "Aruba is the first place I tried acia bowls and let me tell you, they did not dissapoint!",
                source: "/CS601/portfolio/content/aruba_acia.png",
                alt: "Acia bowls on the beach"
            },
            {
                location: "Nashville",
                description: "People know Nashville for their country music, but one of my favorite parts of Nashville was their milkshakes",
                source: "/CS601/portfolio/content/nashville_milkshake.JPG",
                alt: "Chantal smiling at a milkshake in Nashville"
            },
            {
                location: "Aruba",
                description: "My second time in Aruba, my brother and I went snorkeling!",
                source: "/CS601/portfolio/content/aruba_snorkeling.JPG",
                alt: "Chantal snorkeling with her brother"
            },
            {
                location: "Nantucket",
                description: "My family and I took a trip to Nantucket and visited my cousin at work on Barlett's Farm",
                source: "/CS601/portfolio/content/nantucket.JPG",
                alt: "Chantal and family in Nantucket"
            },
            {
                location: "Florida",
                description: "My dad moved to Florida a few years ago so I try to visit as often as I can. One of my favorite things to do there is go jetskiing - we often make friends with dolphins!",
                source: "/CS601/portfolio/content/florida_jetskiing.jpg",
                alt: "Jetskiing with dolphin"
            },
            {
                location: "Cape Cod",
                description: "My family shared a house on Cape Cod and when I was younger I would always visit this candy store. I think you can tell how much I like it!",
                source: "/CS601/portfolio/content/capecod_candy.png",
                alt: "Chantal in a candy store at Cape Cod"
            }
        ]
    },
    methods: {
        // Changes the picture when a dot is clicked
        showPicture: function(event) {
            this.updateImage(event.currentTarget);
        },
        nextPicture: function(event) {
            let direction = event.currentTarget.getAttribute("data-direction");
            let currentIndex = document.getElementById("location-image").getAttribute("data-index");
            let imagesLength = document.querySelectorAll(".dot").length - 1;
            let nextIndex = "0";

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

            // Update the image
            this.updateImage(document.querySelectorAll(".dot")[nextIndex]);

        },
        updateImage: function(element) {
            let selectedClass = "selected";
            let location = element.getAttribute("data-location");
            let description = element.getAttribute("data-description");
            let imageSource = element.getAttribute("data-src");
            let imageAlt = element.getAttribute("data-alt");
            let index = element.getAttribute("data-index");

            // Remove the selected class from the dot that is currently selected
            document.querySelector("." + selectedClass).classList.remove(selectedClass);

            // Add the selected class to the dot
            element.classList.add(selectedClass);

            // Update the location
            document.getElementById("location").innerText = location;

            // Update the description
            document.getElementById("location-description").innerText = description;

            // Update the photo
            let image = document.getElementById("location-image");
            image.setAttribute("src", window.location.origin + imageSource);
            image.setAttribute("alt", imageAlt);

            // Update the index of the photo
            image.setAttribute("data-index", index);
        }
    }
});