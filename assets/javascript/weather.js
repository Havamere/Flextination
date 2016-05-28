/* Flextination weather */
(function() {
    'use strict';
    var destinationCity = localStorage.getItem('address');
    var destinationLatitude = parseFloat(localStorage.getItem('lat'));
    var destinationLongitude = parseFloat(localStorage.getItem('long'));
    var destinationStartDate = localStorage.getItem('startDate');
    var destinationEndDate = localStorage.getItem('endDate');

    var start = moment(new Date(destinationStartDate));
    var end = moment(new Date(destinationEndDate));

    var difference = end.diff(start, 'days');
    console.log(destinationLatitude);
    console.log(destinationLongitude);
    console.log(difference);

    http://api.wunderground.com/api/d84ebb97775dfb1d/geolookup/q/37.776289,-122.395234.json

    $("#search-parameters").append(destinationCity + " between the dates of " + start.format("MM/DD/YYYY") + " and " + end.format("MM/DD/YYYY") + ".");
    var weatherAPIkey = "d84ebb97775dfb1d";
    var baseURL = "http://api.wunderground.com/api/" + weatherAPIkey + "/forecast/geolookup/q/"
    var latlong = destinationLatitude + "," + destinationLongitude


    var queryURL = baseURL + latlong +".json";
console.log(queryURL);
    //api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}

    // var queryURL = "http://api.openweathermap.org/data/2.5/forecast/" + "city?lat=" + destinationLatitude + "&lon=" + destinationLongitude + "&units=imperial&start=" + "1369728000" + "&cnt=16" + weatherAPIkey;

    $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            //console.log(response);
            var tryDate = "2016/05/";
            console.log(tryDate);
            // console.log(tryDate+2);
            for (var i = 0; i < response.list.length - 1; i++) {
                // console.log(response);
                $('#destinationWeatherContainer').append('<ul id="destinationWeatherContent' + i + '">');
                $('#destinationWeatherContent' + i).append('<li>' + response.list[i].dt_txt + '</li>');
                $('#destinationWeatherContent' + i).append('<i class="owf owf-' + response.list[i].weather[0].id + ' owf-5x"></i>');
                $('#destinationWeatherContent' + i).append('<input type="radio" name="weatherRadioButtons" data=' + start + i + ' value="' + response.list[i].weather[0].description + '" class="weatherRadioButtons" id="weatherRadioButton' + i + '">');
                $('#destinationWeatherContent' + i).append('<li>weather-description = ' + response.list[i].weather[0].description + '</li>');
                $('#destinationWeatherContent' + i).append('<li>temperature = ' + response.list[i].main.temp + '\&deg;F</li>');
                $('#destinationWeatherContent' + i).append('<li>humidity = ' + response.list[i].main.humidity + '%</li>');
                $('#destinationWeatherContent' + i).append('<li>pressure = ' + response.list[i].main.pressure + '</li>');
                $('#destinationWeatherContent' + i).append('<li>windspeed = ' + response.list[i].wind.speed + 'mph</li>');
            } //END for-loop
        }); //END AJAX API response function

})(window); //END IIFE
