// Event listener for search button
var searchButton = document.getElementById("searchBtn");
searchButton.addEventListener("click", storeCitySearch);

// Gets user input and saves to local storage, calls next function
function storeCitySearch() {
    var cityInput = document.getElementById("cityInput").value;
    localStorage.setItem("citySearchHistory", cityInput);

    console.log(cityInput);

    getCityCoordinates();
}

function getCityCoordinates() {
    var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + localStorage.getItem("citySearchHistory") + '&appid=585f64e0a63a1964d8bafef222a8e541';

    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then (function(data) {
        console.log(data);
    //    get lat and lon from data
        var cityLat = data[0].lat;
        var cityLon = data[0].lon;

        console.log(cityLat);
        console.log(cityLon);

        var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=585f64e0a63a1964d8bafef222a8e541';
        getFiveDayForecast(requestUrl);
        
    });
}


function getFiveDayForecast(requestUrl) {
    
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        for (var i = 0; i < 5; i++) {
            console.log(data.list[i].main.temp);
            console.log(data.list[i].wind.speed);
            console.log(data.list[i].main.humidity);

          //   append results to page
        }
    });

}