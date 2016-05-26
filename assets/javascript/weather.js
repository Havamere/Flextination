/* Flextination weather */
(function() {
  'use strict';

  var destinationCity = 'London';
  var weatherAPIkey = "524901&APPID=49d879c3e237943a90e1e4d5e68e9770";
  var queryURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + destinationCity + "&units=imperial&cnt=16?id=" + weatherAPIkey;

  $.ajax({
      url: queryURL,
      method: 'GET'
    })
    .done(function(response) {
      console.log(response);

      $.ajax({
          url: queryURL,
          method: 'GET',
          data: "json"
        })
        .done(function(response) {
          // var day = $('<div>');
          // var weatherDescription = response.list[0].weather[0].description;
          // var humidity = response.list[0].humidity;
          // var pressure = response.list[0].pressure;
          // var rain = response.list[0].rain;
          // var speed = response.list[0].speed;
          // day.addClass('day');
          // day.attr('')
          $('#destinationWeatherContent').append('<p>weather-description = ' + response.list[0].weather[0].description + '</p>');
          $('#destinationWeatherContent').append('<p>humidity = ' + response.list[0].humidity + '%</p>');
          $('#destinationWeatherContent').append('<p>pressure = ' + response.list[0].pressure + '</p>');
          $('#destinationWeatherContent').append('<p>rain = ' + response.list[0].rain + '</p>');
          $('#destinationWeatherContent').append('<p>windspeed = ' + response.list[0].speed + 'mph</p>');
          $('#destinationWeatherContent').append('<input type="radio" value='+0+'>');
          // $('#destinationWeatherContent').append(day)

          var time;
          var UNIX_timestamp = response.list[0].dt;
          function timeConverter(UNIX_timestamp) {
            var a = new Date(UNIX_timestamp * 1000);
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
            return time;
          }
          $('#destinationWeatherContent').append('<p>time of day forecasted = ' + time + '</p>');


        });
    });

})(window);
