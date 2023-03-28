// Declared days of week twice to make sure five day forecast does not show undefined
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const d = new Date();
let day = weekday[d.getDay()];

// Event listener for search button
var searchButton = document.getElementById("searchBtn");
searchButton.addEventListener("click", storeCitySearch);

// Gets user input and saves to local storage, calls next function to get coordinates
function storeCitySearch() {
    var cityInput = document.getElementById("cityInput").value;
    var searchHistoryStorage = [cityInput,];
    localStorage.setItem("citySearchHistory", JSON.stringify(searchHistoryStorage));


    // Call function to get coordinates 
    getCityCoordinates();
}

// TO DO: DISPLAY LINK OF PREVIOUS SEARCHES THAT WILL PULL UP THE WEATHER DATA FOR THAT CITY
// function displaySearchHistory() {
//     var searchUl = document.getElementById("history");
//     searchUl.innerHTML = "<a>cityInput<a>";
    
//     var sea
// }

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
        var currentUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + cityLat + '&lon='  + cityLon + '&appid=585f64e0a63a1964d8bafef222a8e541&units=imperial&lang=en';
        getCurrentWeather(currentUrl);

        // call Five Day Forecast function
        var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=585f64e0a63a1964d8bafef222a8e541&units=imperial&lang=en';
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
        console.log('Temp today(F): ' + data.main.temp);
        console.log('Humidity today: ' + data.main.humidity);
        console.log('Wind Speed today: ' + data.wind.speed);
        console.log('Weather Icon ID: ' + data.weather[0].icon);
        console.log('Weather Descr.: ' + data.weather[0].description);

        var today = document.getElementById('today');
        today.innerHTML = 
        '<div class="card-body">' +
            // City Name
            '<h5 class="card-title" id="cityName">' + data.name + ', ' + data.sys.country + '</h5>' +
            // Today's Date
            '<h6 class="card-subtitle mb-2 text-muted">' + day + '</h6>' +
            // Weather Image
            '<img src="https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png" alt="' + data.weather[0].description + '">' +
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
            '<h5 class="card-title">' + weekday[d.getDay() +1] + '</h5>' +
            // To Do: add icon and desc from weather
             '<img src="https://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png" alt="' + data.list[0].weather[0].description + '">' +
            // Day 1 Temp
            '<p class="card-text">' + 'Temp: ' + data.list[0].main.temp + '</p>' +
            // Day 1 Wind Speed
            '<p class="card-text">' + 'Wind: ' + data.list[0].wind.speed + '</p>' +
            // Day 1 Humidity
            '<p class="card-text">' + 'Humidity: ' + data.list[0].main.humidity + '</p>' +
        '</div>';
        day2.innerHTML = 
        '<div class="card-body">' +
            '<h5 class="card-title">' + weekday[d.getDay() +2] + '</h5>' +
            // To Do: add icon and desc from weather
             '<img src="https://openweathermap.org/img/wn/' + data.list[1].weather[0].icon + '@2x.png" alt="' + data.list[1].weather[0].description + '">' +
            //  Day 2 Temp
            '<p class="card-text">' + 'Temp: ' + data.list[1].main.temp + '</p>' +
            // Day 2 Wind Speed
            '<p class="card-text">' + 'Wind: ' + data.list[1].wind.speed + '</p>' +
            // Day 2 Humidity
            '<p class="card-text">' + 'Humidity: ' + data.list[1].main.humidity + '</p>' +
        '</div>';
        day3.innerHTML = 
        '<div class="card-body">' +
            '<h5 class="card-title">' + weekday[d.getDay() +3] + '</h5>' +
            // To Do: add icon and desc from weather
             '<img src="https://openweathermap.org/img/wn/' + data.list[2].weather[0].icon + '@2x.png" alt="' + data.list[2].weather[0].description + '">' +
            //  Day 3 Temp
            '<p class="card-text">' + 'Temp: ' + data.list[2].main.temp + '</p>' +
            // Day 3 Wind Speed
            '<p class="card-text">' + 'Wind: ' + data.list[2].wind.speed + '</p>' +
            // Day 3 Humidity
            '<p class="card-text">' + 'Humidity: ' + data.list[2].main.humidity + '</p>' +
        '</div>';
        day4.innerHTML =  
        '<div class="card-body">' +
            '<h5 class="card-title">' + weekday[d.getDay() +4] + '</h5>' +
            // To Do: add icon and desc from weather
             '<img src="https://openweathermap.org/img/wn/' + data.list[3].weather[0].icon + '@2x.png" alt="' + data.list[3].weather[0].description + '">' +
            //  Day 4 Temp
            '<p class="card-text">' + 'Temp: ' + data.list[3].main.temp + '</p>' +
            // Day 4 Wind Speed
            '<p class="card-text">' + 'Wind: ' + data.list[3].wind.speed + '</p>' +
            // Day 4 Humidity
            '<p class="card-text">' + 'Humidity: ' + data.list[3].main.humidity + '</p>' +
        '</div>';
        day5.innerHTML =  
        '<div class="card-body">' +
            '<h5 class="card-title">' + weekday[d.getDay() +5] + '</h5>' +
            // To Do: add icon and desc from weather
             '<img src="https://openweathermap.org/img/wn/' + data.list[4].weather[0].icon + '@2x.png" alt="' + data.list[4].weather[0].description + '">' +
            //  Day 5 Temp
            '<p class="card-text">' + 'Temp: ' + data.list[4].main.temp + '</p>' +
            // Day 5 Wind Speed
            '<p class="card-text">' + 'Wind: ' + data.list[4].wind.speed + '</p>' +
            // Day 5 Humidity
            '<p class="card-text">' + 'Humidity: ' + data.list[4].main.humidity + '</p>' +
        '</div>';
    });

}