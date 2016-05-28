/* Flextination weather */
(function() {
  'use strict';
  var destinationCity = localStorage.getItem('address');
  var destinationLatitude = parseFloat(localStorage.getItem('lat'));
  var destinationLongitude = parseFloat(localStorage.getItem('long'));
  var destinationStartDate = localStorage.getItem('startDate');
  var destinationEndDate = localStorage.getItem('endDate');

  var start = moment(destinationStartDate, "MM/DD/YYYY");
  var end = moment(destinationEndDate, "MM/DD/YYYY");

  $("#search-parameters").append(destinationCity + " between the dates of " + start.format("MM/DD/YYYY") + " and " + end.format("MM/DD/YYYY") + ".");
  var weatherAPIkey = "524901&APPID=49d879c3e237943a90e1e4d5e68e9770";
  // var queryURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + destinationCity + "&units=imperial&cnt=16?id=" + weatherAPIkey;
  // var queryURL = "http://api.openweathermap.org/data/2.5/history/city?lat=" + destinationLatitude + "&lon=" + destinationLongitude + "&type=hour&start=" + "1369728000" + "&end=" + "1369789200" + "&units=imperial?id=" + weatherAPIkey;
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast/" + "city?lat=" + destinationLatitude + "&lon=" + destinationLongitude + "&units=imperial&start=" + "1369728000" + "&cnt=16?id=" + weatherAPIkey;

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
            $('#destinationWeatherContent' + i).append('<li>prevailing conditions = ' + response.list[i].weather[0].description + '</li>');
            $('#destinationWeatherContent' + i).append('<input type="radio" name="weatherRadioButtons" data='+ start + i +' value="' + response.list[i].weather[0].description + '" class="weatherRadioButtons" id="weatherRadioButton' + i + '">');
            $('#destinationWeatherContent' + i).append('<li>temperature = ' + response.list[i].main.temp + '\&deg;F</li>');
            $('#destinationWeatherContent' + i).append('<li>humidity = ' + response.list[i].main.humidity + '%</li>');
            $('#destinationWeatherContent' + i).append('<li>windspeed = ' + response.list[i].wind.speed + 'mph</li>');
          } //END for-loop
    }); //END AJAX API response function

})(window); //END IIFE
