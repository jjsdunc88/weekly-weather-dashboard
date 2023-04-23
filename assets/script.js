// var apiKey = "189c818c0cb64734ca920298a295b669"; - API key for openweathermap.org


//Request Response Instructions:
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
// var city = "Philadelphia" 
// fetch(queryURL)



//Homework Setup Instructions:


//First function call to get lat/lon from Geocoding API call
function getCity (inputFromField) {
    var url = "http://api.openweathermap.org/geo/1.0/direct?" + inputFromField + "&limit=1&appid=189c818c0cb64734ca920298a295b669"
        fetch(url) {
            //Need to figure out what goes inside fetch
        }
        .then(data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            getWeatherCurrent(lat,lon);
        }
}

function getWeatherCurrent (lat, lon) {
    'https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=189c818c0cb64734ca920298a295b669'
}






console.log("hello");

//Need variable to accept user city input

//Likely specify state and country variables in API call/latitude, longitude. 

//Use "Geocoding API" to get latitude and longitude
//Use API calls: "Current Weather Data" & "5 Day / 3 Hour Forecast"