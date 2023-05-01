// var apiKey = "189c818c0cb64734ca920298a295b669"; - API key for openweathermap.org
var historyArr = [];
if (localStorage.getItem("history")) {
    historyArr = JSON.parse(localStorage.getItem("history"))
}

renderButtons(historyArr);

//First function call to get lat/lon from Geocoding API call
function getCity(inputFromField) {
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputFromField + "&limit=1&appid=189c818c0cb64734ca920298a295b669"
    fetch(url)
        .then(function (data) {
            return data.json()
        })
        .then(function (response) {
            console.log(response)
            var lat = response[0].lat;
            var lon = response[0].lon;
            getWeatherCurrent(lat, lon);
            getForecastCurrent(lat, lon);
        })
    console.log("in function")
};


//Current Weather data API call
function getWeatherCurrent(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=189c818c0cb64734ca920298a295b669`)
        .then(firstResponse => firstResponse.json())
        .then((secondResponse) => {
            console.log(secondResponse)
            //daily weather
            document.querySelector(".temp").textContent = secondResponse.main.temp + " F°";
        })
}


//5 day / 3 hour forecast data
function getForecastCurrent(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=189c818c0cb64734ca920298a295b669`)
        .then(firstResponse => firstResponse.json())
        .then((secondResponse) => {
            console.log(secondResponse)
            const fiveDay = [];
            for (i = 0; i < secondResponse.list.length; i++) {
                // if(secondResponse.list[i].dt_txt.split(' ')[1] === " 12:00:00")
                if (secondResponse.list[i].dt_txt.includes("12:00:00")) {
                    fiveDay.push(secondResponse.list[i])
                }
            }

            console.log(fiveDay);
        })
}

/*

    pseudocode:
    fn renderForecast(arr) :
        we go through each index of the arr via a for loop
        as we go through each index we select items from the front end (ex: temp-0, temp-1, temp-2)
        we change the text content to match the given information for each field (ex: temp goes into temp)
        profit

*/

function renderButtons(arr) {
    const btnContainer = document.getElementById("button-region");
    btnContainer.innerHTML = "";

    for (i = 0; i < arr.length; i++) {
        const newBtn = document.createElement("button");
        newBtn.textContent = arr[i]
        newBtn.addEventListener("click", function (e) {
            e.preventDefault()

            var cityIn = e.target.textContent;
            getCity(cityIn)
        })
        btnContainer.appendChild(newBtn);
    }
}

//Event Listener for City input form
document.getElementById("submitForm").addEventListener("submit", function (e) {
    e.preventDefault();

    var cityIn = document.getElementById("cityInput").value;
    historyArr.push(cityIn)
    localStorage.setItem("history", JSON.stringify(historyArr));
    renderButtons(historyArr)
    getCity(cityIn)
})





// ## User Story

// ```
// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly
// ```

// ## Acceptance Criteria

// ```
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// ```