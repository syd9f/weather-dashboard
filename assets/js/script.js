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

        var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=585f64e0a63a1964d8bafef222a8e541&units=imperial';
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
        console.log(data.city.name + ', ' + data.city.country);
        var cityName = document.getElementById('cityName');
        cityName.innerHTML = data.city.name + ', ' + data.city.country;

        var fiveDayEl = document.getElementById('5-day');
        var day1 = document.getElementById('day1');
        var day2 = document.getElementById('day2');
        var day3 = document.getElementById('day3');
        var day4 = document.getElementById('day4');
        var day5 = document.getElementById('day5');

        for (var i = 0; i < 5; i++) {
            console.log("Day " + (i+1) + ' Temp: ' + data.list[i].main.temp);
            console.log("Day " + (i+1) + ' Wind: ' + data.list[i].wind.speed);
            console.log("Day " + (i+1) + ' Humidity: ' + data.list[i].main.humidity);
            console.log("Day " + (i+1) + " Weather: " + JSON.stringify(data.list[i].weather));
        
          //   append results to page
            day1.innerHTML =   '<div class="card text-bg-success col-2 forecast" style="width:20%">' + 
            '<div class="card-body">' +
                '<h5 class="card-title">' + 'Day 1: ' + '</h5>' +
                '<p class="card-text">' + 'Temp: ' + data.list[0].main.temp + '</p>' +
                '<p class="card-text">' + 'Wind: ' + data.list[0].wind.speed + '</p>' +
                '<p class="card-text">' + 'Humidity: ' + data.list[0].main.humidity + '</p>' +
            '</div>' + '</div>';
          day2.innerHTML = 
          '<div class="card text-bg-success col-2 forecast" style="width:20%">' + 
          '<div class="card-body">' +
              '<h5 class="card-title">' + 'Day 2: ' + '</h5>' +
              '<p class="card-text">' + 'Temp: ' + data.list[1].main.temp + '</p>' +
              '<p class="card-text">' + 'Wind: ' + data.list[1].wind.speed + '</p>' +
              '<p class="card-text">' + 'Humidity: ' + data.list[1].main.humidity + '</p>' +
          '</div>' + '</div>';
          day3.innerHTML = 
          '<div class="card text-bg-success col-2 forecast " style="width:20%">' + 
          '<div class="card-body">' +
              '<h5 class="card-title">' + 'Day 3: ' + '</h5>' +
              '<p class="card-text">' + 'Temp: ' + data.list[2].main.temp + '</p>' +
              '<p class="card-text">' + 'Wind: ' + data.list[2].wind.speed + '</p>' +
              '<p class="card-text">' + 'Humidity: ' + data.list[2].main.humidity + '</p>' +
          '</div>' + '</div>';
          day4.innerHTML = 
          '<div class="card text-bg-success col-2 forecast" style="width:20%">' + 
          '<div class="card-body">' +
              '<h5 class="card-title">' + 'Day 4: ' + '</h5>' +
              '<p class="card-text">' + 'Temp: ' + data.list[3].main.temp + '</p>' +
              '<p class="card-text">' + 'Wind: ' + data.list[3].wind.speed + '</p>' +
              '<p class="card-text">' + 'Humidity: ' + data.list[3].main.humidity + '</p>' +
          '</div>' + '</div>';
          day5.innerHTML = 
          '<div class="card text-bg-success col-2 forecast" style="width:20%">' + 
          '<div class="card-body">' +
              '<h5 class="card-title">' + 'Day 5: ' + '</h5>' +
              '<p class="card-text">' + 'Temp: ' + data.list[4].main.temp + '</p>' +
              '<p class="card-text">' + 'Wind: ' + data.list[4].wind.speed + '</p>' +
              '<p class="card-text">' + 'Humidity: ' + data.list[4].main.humidity + '</p>' +
          '</div>' + '</div>';
        }
    });

}