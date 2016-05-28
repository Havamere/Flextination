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
            console.log(response);
            
            var days = response.forecast.simpleforecast.forecastday.length;
            // console.log(tryDate+2);
            for (var i = 0; i < days; i++) {
                // console.log(response);
                $('#destinationWeatherContainer').append('<ul id="destinationWeatherContent' + i + '">');
                $('#destinationWeatherContent' + i).append('<li>' + response.forecast.simpleforecast.forecastday[i].date.pretty + '</li>');
                // $('#destinationWeatherContent' + i).append('<i class="owf owf-' + response.list[i].weather[0].id + ' owf-5x"></i>');
                // $('#destinationWeatherContent' + i).append('<input type="radio" name="weatherRadioButtons" data=' + start + i + ' value="' + response.list[i].weather[0].description + '" class="weatherRadioButtons" id="weatherRadioButton' + i + '">');
                $('#destinationWeatherContent' + i).append('<li>weather-description = ' + response.forecast.simpleforecast.forecastday[i].conditions + '</li>');
                $('#destinationWeatherContent' + i).append('<li>temperature high = ' + response.forecast.simpleforecast.forecastday[i].high.fahrenheit + '\&deg;F</li>');
                $('#destinationWeatherContent' + i).append('<li>temperature low = ' + response.forecast.simpleforecast.forecastday[i].low.fahrenheit + '%</li>');
                $('#destinationWeatherContent' + i).append('<li>Chance of Rain = ' + response.forecast.simpleforecast.forecastday[i].pop + '%</li>');
           
            } //END for-loop
        }); //END AJAX API response function

})(window); //END IIFE
