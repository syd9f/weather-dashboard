// Event listener for search button
var searchButton = document.getElementById("searchBtn");
searchButton.addEventListener("click", storeCitySearch);


// Gets user input and saves to local storage, calls next function
function storeCitySearch() {
    var cityInput = document.getElementById("cityInput").value;
    localStorage.setItem("city", cityInput);
    console.log(cityInput);
    getCityCoordinates();
}

function getCityCoordinates() {
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+ cityInput + '&appid=585f64e0a63a1964d8bafef222a8e541';

    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then (function(data) {
    //    get lat and lon from data

        getFiveDayForecast();
        
    });
}


function getFiveDayForecast() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=585f64e0a63a1964d8bafef222a8e541';

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        
    });



}