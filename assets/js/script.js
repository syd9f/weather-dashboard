var searchButton = document.getElementById("searchBtn");
var cityInput = document.getElementById("cityInput").value;

searchButton.addEventListener("click", storeCitySearch);
console.log(cityInput);

function storeCitySearch() {
    localStorage.setItem("city", cityInput);
    getCityCoordinates;
}

function getCityCoordinates() {
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+ cityInput + '&appid=585f64e0a63a1964d8bafef222a8e541';

    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then (function(data) {
        console.log(cityInput)
        getFiveDayForecast;
    });
}


function getFiveDayForecast() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=585f64e0a63a1964d8bafef222a8e541';

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(cityInput)
    });



}