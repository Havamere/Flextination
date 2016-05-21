/* Flextination weather */
(function () {
  'use strict';

  var destinationCity = 'London';
  var weatherAPIkey = "524901&APPID=49d879c3e237943a90e1e4d5e68e9770";
  var queryURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + destinationCity + "&units=standard&cnt=7?id="+weatherAPIkey;

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
          console.log(response.list[0].clouds);
          $('#destinationWeatherContent').append('<p>humidity = '+response.list[0].humidity+'</p>');
          $('#destinationWeatherContent').append('<p>pressure = '+response.list[0].pressure+'</p>');
          $('#destinationWeatherContent').append('<p>rain = '+response.list[0].rain+'</p>');
          $('#destinationWeatherContent').append('<p>windspeed = '+response.list[0].speed+'mph</p>');
        });
    });

})(window);
