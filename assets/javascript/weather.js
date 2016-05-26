/* Flextination weather */
(function() {
  'use strict';

  var destinationCity = 'Orlando';
  var destinationLatitude = "41.85";
  var destinationLongitude = "87.65";
  var weatherAPIkey = "524901&APPID=49d879c3e237943a90e1e4d5e68e9770";
  // var queryURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + destinationCity + "&units=imperial&cnt=16?id=" + weatherAPIkey;
  // var queryURL = "http://api.openweathermap.org/data/2.5/history/city?lat=" + destinationLatitude + "&lon=" + destinationLongitude + "&type=hour&start=" + "1369728000" + "&end=" + "1369789200" + "&units=imperial?id=" + weatherAPIkey;
  var queryURL = "http://api.openweathermap.org/data/2.5/forecast/" + "city?lat=" + destinationLatitude + "&lon=" + destinationLongitude + "&units=imperial&start=" + "1369728000" + "&cnt=16?id=" + weatherAPIkey;

  $.ajax({
      url: queryURL,
      method: 'GET'
    })
    .done(function(response) {
      //console.log(response);

      $.ajax({
          url: queryURL,
          method: 'GET',
          data: "json"
        })
        .done(function(response) {

          for (var i = 0; i < response.list.length - 1; i++) {
   //         console.log(response.list[i]);
            $('#destinationWeatherContainer').append('<ul id="destinationWeatherContent' + i + '">');
            $('#destinationWeatherContent' + i).append('<li>' + response.list[i].dt_txt + '</li>');
            $('#destinationWeatherContent' + i).append('<i class="owf owf-' + response.list[i].weather[0].id + ' owf-5x"></i>');
            $('.owf').html('<input type="radio" name="weatherRadioButtons" value="' + response.list[i].weather[0].description + '" class="weatherRadioButtons" id="weatherRadioButton' + i + '">');
            $('#destinationWeatherContent' + i).append('<li>weather-description = ' + response.list[i].weather[0].description + '</li>');
            $('#destinationWeatherContent' + i).append('<li>temperature = ' + response.list[i].main.temp + 'ºF</li>');
            $('#destinationWeatherContent' + i).append('<li>humidity = ' + response.list[i].main.humidity + '%</li>');
            $('#destinationWeatherContent' + i).append('<li>pressure = ' + response.list[i].main.pressure + '</li>');
            $('#destinationWeatherContent' + i).append('<li>windspeed = ' + response.list[i].wind.speed + 'mph</li>');
            $('#destinationWeatherContent' + i).append('<input type="radio" name="weatherRadioButtons" value="' + response.list[i].weather[0].description + '" id="weatherRadioButton' + i + '" />').insertBefore('.owf-5x');


          } //END for-loop

          // var selectedStartDateTime = "05/25/2016 9:00";
          // var unixSelectedStartDateTime = moment(moment(selectedStartDateTime, "MM/DD/YYYY HH:mm").unix()*1000);
          // console.log(unixSelectedStartDateTime);
          //
          // var now = moment();
          // var tooFar = (now+(moment().date() + 16));
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

        }); //END JSON to HTML response function
    }); //END AJAX API response function

})(window); //END IIFE
