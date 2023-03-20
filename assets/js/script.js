// Event listener for search button
var searchButton = document.getElementById("searchBtn");
searchButton.addEventListener("click", storeCitySearch);

// Gets user input and saves to local storage, calls next function to get coordinates
function storeCitySearch() {
    var cityInput = document.getElementById("cityInput").value;
    localStorage.setItem("citySearchHistory", cityInput);

    // Call function to get coordinates 
    getCityCoordinates();
}

// takes user input and gets city coordinates for city, calls next functions to display weather data
function getCityCoordinates() {
    var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + localStorage.getItem("citySearchHistory") + '&appid=585f64e0a63a1964d8bafef222a8e541';

    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then (function(data) {
    //    get lat and lon from data
        var cityLat = data[0].lat;
        var cityLon = data[0].lon;

        console.log('City Lat: ' + cityLat);
        console.log('City Lon: ' + cityLon);

        // call Current Weather function
        var currentUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + cityLat + '&lon='  + cityLon + '&appid=585f64e0a63a1964d8bafef222a8e541&units=imperial';
        getCurrentWeather(currentUrl);

        // call Five Day Forecast function
        var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=585f64e0a63a1964d8bafef222a8e541&units=imperial';
        getFiveDayForecast(forecastUrl);
    });
}

// fetches current weather data for selected city and displays to page
function getCurrentWeather(currentUrl) {
    fetch(currentUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        var today = document.getElementById('today');
        console.log('BROKEN: Weather Icon ID: ' + data.weather.icon);
        console.log('BROKEN: Weather Descr.: ' + data.weather.description);
        console.log('Temp today(F): ' + data.main.temp);
        console.log('Humidity today: ' + data.main.humidity);
        console.log('Wind Speed today: ' + data.wind.speed);
        console.log('Weather today: ' + JSON.stringify(data.weather));
        

        today.innerHTML = 
        '<div class="card-body">' +
            // City Name
            '<h5 class="card-title" id="cityName">' + data.name + ', ' + data.sys.country + '</h5>' +
            // Today's Date
            '<h6 class="card-subtitle mb-2 text-muted">' + 'Current Date' + '</h6>' +
            // TO DO: Weather Image
            // '<img src="https://openweathermap.org/img/wn/' + data.weather.icon + '@2x.png" alt="' + data.weather.description + '">';
            // Temp
            '<p class="card-text">' + 'Temp: ' + data.main.temp + '</p>' +
            // Wind Speed
            '<p class="card-text">' + 'Wind: ' + data.wind.speed + '</p>' +
            // Humidity
            '<p class="card-text">' + 'Humidity: ' + data.main.humidity + '</p>' +
        '</div>';
    })
}

// fetches five day forecast for selected city and displays to page
function getFiveDayForecast(forecastUrl) {
    
    fetch(forecastUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        // selects page elements
        var day1 = document.getElementById('day1');
        var day2 = document.getElementById('day2');
        var day3 = document.getElementById('day3');
        var day4 = document.getElementById('day4');
        var day5 = document.getElementById('day5');

        // loops through api results in console
        for (var i = 0; i < 5; i++) {
            console.log("Day " + (i+1) + ' Temp: ' + data.list[i].main.temp);
            console.log("Day " + (i+1) + ' Wind: ' + data.list[i].wind.speed);
            console.log("Day " + (i+1) + ' Humidity: ' + data.list[i].main.humidity);
            console.log("Day " + (i+1) + " Weather: " + JSON.stringify(data.list[i].weather));
        }
        //   append results to page
        day1.innerHTML =
        '<div class="card-body">' +
            '<h5 class="card-title">' + 'Day 1: ' + '</h5>' +
            '<p class="card-text">' + 'Temp: ' + data.list[0].main.temp + '</p>' +
            '<p class="card-text">' + 'Wind: ' + data.list[0].wind.speed + '</p>' +
            '<p class="card-text">' + 'Humidity: ' + data.list[0].main.humidity + '</p>' +
        '</div>';
        day2.innerHTML = 
        '<div class="card-body">' +
            '<h5 class="card-title">' + 'Day 2: ' + '</h5>' +
            '<p class="card-text">' + 'Temp: ' + data.list[1].main.temp + '</p>' +
            '<p class="card-text">' + 'Wind: ' + data.list[1].wind.speed + '</p>' +
            '<p class="card-text">' + 'Humidity: ' + data.list[1].main.humidity + '</p>' +
        '</div>';
        day3.innerHTML = 
        '<div class="card-body">' +
            '<h5 class="card-title">' + 'Day 3: ' + '</h5>' +
            '<p class="card-text">' + 'Temp: ' + data.list[2].main.temp + '</p>' +
            '<p class="card-text">' + 'Wind: ' + data.list[2].wind.speed + '</p>' +
            '<p class="card-text">' + 'Humidity: ' + data.list[2].main.humidity + '</p>' +
        '</div>';
        day4.innerHTML =  
        '<div class="card-body">' +
            '<h5 class="card-title">' + 'Day 4: ' + '</h5>' +
            '<p class="card-text">' + 'Temp: ' + data.list[3].main.temp + '</p>' +
            '<p class="card-text">' + 'Wind: ' + data.list[3].wind.speed + '</p>' +
            '<p class="card-text">' + 'Humidity: ' + data.list[3].main.humidity + '</p>' +
        '</div>';
        day5.innerHTML =  
        '<div class="card-body">' +
            '<h5 class="card-title">' + 'Day 5: ' + '</h5>' +
            '<p class="card-text">' + 'Temp: ' + data.list[4].main.temp + '</p>' +
            '<p class="card-text">' + 'Wind: ' + data.list[4].wind.speed + '</p>' +
            '<p class="card-text">' + 'Humidity: ' + data.list[4].main.humidity + '</p>' +
        '</div>';
    });

}