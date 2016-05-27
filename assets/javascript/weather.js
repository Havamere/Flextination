/* Flextination weather */
(function() {
  'use strict';
var destinationCity = localStorage.getItem('address');
var destinationLatitude = parseFloat(localStorage.getItem('lat'));
var destinationLongitude = parseFloat(localStorage.getItem('long'));
  
  // var destinationLatitude = "41.85";
  // var destinationLongitude = "87.65";
  
  var weatherAPIkey = "524901&APPID=49d879c3e237943a90e1e4d5e68e9770";
  // var queryURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + destinationCity + "&units=imperial&cnt=16?id=" + weatherAPIkey;
  // var queryURL = "http://api.openweathermap.org/data/2.5/history/city?lat=" + destinationLatitude + "&lon=" + destinationLongitude + "&type=hour&start=" + "1369728000" + "&end=" + "1369789200" + "&units=imperial?id=" + weatherAPIkey;
  var queryURL = "http://api.openweathermap.org/data/2.5/forecast/" + "city?lat=" + destinationLatitude + "&lon=" + destinationLongitude + "&units=imperial&start=" + "1369728000" + "&cnt=16?id=" + weatherAPIkey;

  $.ajax({
      url: queryURL,
      method: 'GET',
      data: "json"
    })
    .done(function(response) {
      console.log(response);
        for (var i = 0; i < response.list.length - 1; i++) {
            $('#destinationWeatherContainer').append('<ul id="destinationWeatherContent' + i + '">');
            $('#destinationWeatherContent' + i).append('<li>' + response.list[i].dt_txt + '</li>');
            $('#destinationWeatherContent' + i).append('<i class="owf owf-' + response.list[i].weather[0].id + ' owf-5x"></i>');
            $('.owf').html('<input type="radio" name="weatherRadioButtons" value="' + response.list[i].weather[0].description + '" class="weatherRadioButtons" id="weatherRadioButton' + i + '">');
            $('#destinationWeatherContent' + i).append('<li>weather-description = ' + response.list[i].weather[0].description + '</li>');
            $('#destinationWeatherContent' + i).append('<li>temperature = ' + response.list[i].main.temp + 'ºF</li>');
            $('#destinationWeatherContent' + i).append('<li>humidity = ' + response.list[i].main.humidity + '%</li>');
            $('#destinationWeatherContent' + i).append('<li>pressure = ' + response.list[i].main.pressure + '</li>');
            $('#destinationWeatherContent' + i).append('<li>windspeed = ' + response.list[i].wind.speed + 'mph</li>');
          } //END for-loop
    

        }); //END JSON to HTML response function

})(window); //END IIFE
