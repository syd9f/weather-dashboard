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

// takes user input and gets city coordinates for city, calls functions to display weather data
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
            console.log("Day" + i + 'Temp: ' + data.list[i].main.temp);
            console.log("Day" + i + 'Wind: ' + data.list[i].wind.speed);
            console.log("Day" + i + 'Humidity: ' + data.list[i].main.humidity);

          //   append results to page
          var fiveDayEl = document.getElementById('5-day');
          fiveDayForecast = ''
          fiveDayForecast.innerHTML = 
          '<div class="card text-bg-success col-2 forecast" style="width: 20%;">' + 
          '<div class="card-body">' +
              '<h5 class="card-title">' + 'Day ' + i + ': ' + '</h5>' +
              '<p class="card-text">' + 'Temp: ' + data.list[i].main.temp + '</p>' +
              '<p class="card-text">' + 'Wind: ' + data.list[i].wind.speed + '</p>' +
              '<p class="card-text">' + 'Humidity: ' + data.list[i].main.humidity + '</p>' +
          '</div>' + '</div>'
          fiveDayEl.append(fiveDayForecast);
        }
    });

}