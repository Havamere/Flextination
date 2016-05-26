//Google API Key -- AIzaSyCGbLaGsRnpqv8rORu25GIJ5Xs_NzU0xR0

var map;
var infoWindow;
var service;
var markers = [];

var latlong = {};


var autocomplete;

function initAutocomplete() {
  
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
      {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);

}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
  console.log(place);
  lat = place.geometry.location.lat();  
  long  = place.geometry.location.lng()
    
    localStorage.setItem('lat',lat);
    localStorage.setItem('long',long);   

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.

}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}


// function initMap() {
//   var haightAshbury = {lat: 37.769, lng: -122.446};

//Initialize the map
function initMap() {
    var lat = parseFloat(localStorage.getItem('lat'));
    var long = parseFloat(localStorage.getItem('long'));

   // var numIndex = lat.indexOf(".");
   // lat = lat.substring(0, numIndex+4);
   // numIndex = long.indexOf(".");
   // long = long.substring(0,numIndex+4);

    var haightAshbury = {lat: lat, lng: long};
        console.log(haightAshbury);
    // console.log(lat, long);

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: haightAshbury,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  // This event listener will call addMarker() when the map is clicked.
  map.addListener('click', function(event) {
    addMarker(event.latLng);
  });

  // Adds a marker at the center of the map.
 addMarker(haightAshbury);
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}


function addResults(place) {
    google.maps.event.addListener(marker, 'click', function() {
                service.getDetails(place, function(result, status) {
                    console.log(result);
                    if (status !== google.maps.places.PlacesServiceStatus.OK) {
                        console.error(status);
                        return;
                    }
                    infoWindow.setContent("<strong>name: </strong>" + result.name + "<p>" + "<strong>address:  </strong>" + result.formatted_address + "<p>" + "<strong>phone number:  </strong>" + result.formatted_phone_number + "<p>" + "<strong>rating: </strong>" + result.rating + "<p>");

                    infoWindow.open(map, marker);
                });
            })
          }

function moveToInfo(){
    console.log("Heyyy");

    window.location.href = 'info.html';
    
    initMap();

}
$(document).on('click', '#next', moveToInfo);