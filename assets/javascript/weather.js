/* Flextination weather */
(function () {
  'use strict';

  var destinationCity = 'London';
  var weatherAPIkey = "524901&APPID=49d879c3e237943a90e1e4d5e68e9770";
  var queryURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + destinationCity + "&mode=xml&units=standard&cnt=7?id="+weatherAPIkey;

  $.ajax({
      url: queryURL,
      method: 'GET'
    })
    .done(function(response) {
      console.log(response);

      $.ajax({
          url: queryURL,
          method: 'GET'
        })
        .done(function(response) {
          console.log(response);
          $('#destinationWeatherContent').append(response.data);
        });
    });

})(window);
