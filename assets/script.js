//Global Scope
let btnContainer;
const fiveDayParent = document.querySelector(".five-day")
var historyArr = [];
if (localStorage.getItem("history")) {
    historyArr = JSON.parse(localStorage.getItem("history"))
}
renderButtons(historyArr);


//First function call to get lat/lon from Geocoding API call
function getCity(inputFromField) {
    var url = "https://api.openweathermap.org/geo/1.0/direct?q=" + inputFromField + "&limit=1&appid=189c818c0cb64734ca920298a295b669"
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


//Current Weather data API call uses lat/lon from Geocoding API call
function getWeatherCurrent(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=189c818c0cb64734ca920298a295b669`)
        .then(firstResponse => firstResponse.json())
        .then((secondResponse) => {
            console.log(secondResponse)
            let currentWeatherIcon = document.querySelector(".icon-img");
            let weatherIcon = secondResponse.weather[0].icon;

            document.querySelector(".city").textContent = secondResponse.name;
            document.querySelector(".date").textContent = new Date();
            currentWeatherIcon.src = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
            document.querySelector(".temp").textContent = secondResponse.main.temp + " F°";
            document.querySelector(".wind").textContent = secondResponse.wind.speed + " mph";
            document.querySelector(".humidity").textContent = secondResponse.main.humidity + "%";


        })
}


//5 day - 3 hour forecast data. Renders data points for noon to page.
function getForecastCurrent(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=189c818c0cb64734ca920298a295b669`)
        .then(firstResponse => firstResponse.json())
        .then((secondResponse) => {
            console.log(secondResponse)
            const fiveDay = [];
            for (i = 0; i < secondResponse.list.length; i++) {
                if (secondResponse.list[i].dt_txt.includes("12:00:00")) {
                    fiveDay.push(secondResponse.list[i])
                }
            }
            fiveDayParent.innerHTML = "";

            for (i = 0; i < fiveDay.length; i++) {
                const liEl = document.createElement("li")

                const dateEl = document.createElement("div")
                dateEl.textContent = fiveDay[i].dt_txt + " PM"

                const iconEl = document.createElement("img")
                iconEl.src = `https://openweathermap.org/img/wn/${fiveDay[i].weather[0].icon}.png`;

                const tempEl = document.createElement("div")
                tempEl.textContent = fiveDay[i].main.temp + "°"

                const windEl = document.createElement("div")
                windEl.textContent = fiveDay[i].wind.speed + " mph";

                const humEl = document.createElement("div")
                humEl.textContent = fiveDay[i].main.humidity + " %"

                liEl.appendChild(dateEl)
                liEl.appendChild(iconEl)
                liEl.appendChild(tempEl)
                liEl.appendChild(windEl)
                liEl.appendChild(humEl)
                fiveDayParent.appendChild(liEl)

            }

        })
}


//Creates buttons for each city search
function renderButtons(arr) {
    btnContainer = document.getElementById("button-region");
    btnContainer.innerHTML = "";

    for (i = 0; i < arr.length; i++) {
        const newBtn = document.createElement("button");
        newBtn.textContent = arr[i]
        newBtn.addEventListener("click", function (e) {
            e.preventDefault();

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


//Reset button to clear search history buttons
const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function () {
    localStorage.clear();
    renderButtons([]);
    historyArr = [];
});


