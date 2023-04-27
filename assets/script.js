// var apiKey = "189c818c0cb64734ca920298a295b669"; - API key for openweathermap.org


var historyArr = [];

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
        })
}

//Event Listener for City input form
document.getElementById("submitForm").addEventListener("submit", function (e) {
    e.preventDefault();

    var cityIn = document.getElementById("cityInput").value;
    historyArr.push(cityIn)
    getCity(cityIn)
})





