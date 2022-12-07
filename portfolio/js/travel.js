// document.getElementById("getWeather").addEventListener("click", function() {
//     getWeather("40.790", "77.860");
// });

// function getWeather(lat, long) {

//     const url = `https://dataservice.accuweather.com/currentconditions/v1/40.790,77.860?apikey=yvV66VViYpwjkiujhZs7hFN4LDf3nlt9`;

//     fetch(url, {
//         method: 'GET',
//         headers: { 'Content-Type' : 'application/json' }
//     })
//     .then(response => {
//         response.json().then(data => {
//             console.log(data);
//         });
//     });
// }





// Use Vue.js to test
var travelContainer = new Vue({
    el: '#travelContainer',
    data: {
        locations: [
            {
                id: "aruba",
                location: "Aruba",
                description: "One happy island",
                images: [
                    {
                        source: "/CS601/portfolio/content/aruba_acia.png",
                        alt: "Acia bowls on the beach"
                    },
                    {
                        source: "/CS601/portfolio/content/aruba_hardrock.JPG",
                        alt: "Chantal and her brother in front of the hardrock sign"
                    },
                    {
                        source: "/CS601/portfolio/content/aruba_snorkeling.JPG",
                        alt: "Chantal and her brother snorkeling"
                    },
                    {
                        source: "/CS601/portfolio/content/aruba_sign.png",
                        alt: "Sign in aruba"
                    }
                ]
            },
            {
                id: "nashville",
                location: "Nashville",
                description: "Where the party never stops",
                images: [
                    {
                        source: "/CS601/portfolio/content/nashville_gulch.JPG",
                        alt: "Chantal at the Gulch"
                    },
                    {
                        source: "/CS601/portfolio/content/nashville_dierks.JPG",
                        alt: "Inside Dierks Bentley bar in Nashville"
                    },
                    {
                        source: "/CS601/portfolio/content/nashville_group.JPG",
                        alt: "Chantal with friends in Nashville"
                    },
                    {
                        source: "/CS601/portfolio/content/nashville_airport.JPG",
                        alt: "Chantal on the way home from a weekend in Nashville"
                    }
                ]
            }
        ]
    },
    methods: {
        showPicture: function(event) {
            let locationId = event.currentTarget.getAttribute("data-location-id");
            // let location = event.currentTarget.getAttribute("data-location");
            // let description = event.currentTarget.getAttribute("data-description");
            let imageSource = event.currentTarget.getAttribute("data-src");
            let imageAlt = event.currentTarget.getAttribute("data-alt");

            // Update the photo
            const image = document.getElementById(locationId).querySelector(".location-image");
            image.setAttribute("src", window.location.origin + imageSource);
            image.setAttribute("alt", imageAlt);
        }
    }
});