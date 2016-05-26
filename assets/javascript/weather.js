/* Flextination weather */
(function() {
  'use strict';

  var destinationCity = 'Orlando';
  var destinationLatitude = "41.85";
  var destinationLongitude = "87.65";
  var weatherAPIkey = "524901&APPID=49d879c3e237943a90e1e4d5e68e9770";
  // var queryURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + destinationCity + "&units=imperial&cnt=16?id=" + weatherAPIkey;
  var queryURL = "http://api.openweathermap.org/data/2.5/history/city?lat=" + destinationLatitude + "&lon=" + destinationLongitude + "&type=day&start=" + (moment()) + "&end=" + (moment().date() + 16) + "&units=imperial&cnt=16?id=" + weatherAPIkey;


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
          $('#destinationWeatherContent').append('<img>' + response.list[0].weather[0].icon);
          $('#destinationWeatherContent').append('<li>weather-description = ' + response.list[0].weather[0].description + '</li>');
          $('#destinationWeatherContent').append('<li>humidity = ' + response.list[0].humidity + '%</li>');
          $('#destinationWeatherContent').append('<li>pressure = ' + response.list[0].pressure + '</li>');
          $('#destinationWeatherContent').append('<li>rain = ' + response.list[0].rain + '</li>');
          $('#destinationWeatherContent').append('<li>windspeed = ' + response.list[0].speed + 'mph</li>');

          var selectedStartDateTime = "05/25/2016 9:00";
          var unixSelectedStartDateTime = moment(moment(selectedStartDateTime, "MM/DD/YYYY HH:mm").unix()*1000);
          console.log(unixSelectedStartDateTime);

          var now = moment();
          var tooFar = (now+(moment().date() + 16));
          // var tooFar = true
          // if ( >= unixSelectedStartDateTime) {
          //   var unixSelectedStartDateTime = historicalStartDateTime;
          //   var historicalStartDateTime = moment.unix(historicalStartDateTime);
          //   var m = moment(historicalStartDateTime);
          //   var s = m.format("M/D/YYYY H:mm");
          //   console.log(s);
          // } else {
          //   return;
          // }


/*
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
*/

        });
    });

})(window);
