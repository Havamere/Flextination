//Google API Key -- AIzaSyCGbLaGsRnpqv8rORu25GIJ5Xs_NzU0xR0

var map;
var infoWindow;
var service;
var markers = [];
var details = {};

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
  latlong = {lat: place.geometry.location.lat(),
             lng: place.geometry.location.lng(),

         }
    console.log(latlong);  

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

//Initialize the map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: latlong,
        zoom: 9,
        heading: 90,
        tilt: 45,
        styles: [ 
        {
            elementType: 'labels'
            
        },

 {
        "featureType": "administrative",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#abbaa4"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3f518c"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "stylers": [
            {
                "color": "#ad9b8d"
            }
        ]
    }
    ]

    }); //close map variable
    

    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    // The idle event is a debounced event, so we can query & listen without
    // throwing too many requests at the server.
    map.addListener('idle', performSearch);
}

function performSearch() {
    var request = {
        bounds: map.getBounds(),
        keyword: 'pizza',
        limit: 5,

    };

    service.radarSearch(request, callback);

}

function callback(results, status) {


    if (status == google.maps.places.PlacesServiceStatus.OK) {
        markerArr = [];
        for (var i = 0; i < 5; i++) {
            markerArr.push(results[i].geometry.location);
            result = results[i];
            addMarker(results[i]);
        }
    } else {
        alert("Sorry, there are no locations in your area");
    }

}

function addMarker(place) {

         // Try to get user physical location
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };

              infoWindow.setPosition(pos);
              infoWindow.setContent('Location found.');
              map.setCenter(pos);
            }, function() {
              handleLocationError(true, infoWindow, map.getCenter());
            });
          } 
          else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
          }

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
          infoWindow.setPosition(pos);
          infoWindow.setContent(browserHasGeolocation ?
                                'Error: The Geolocation service failed.' :
                                'Error: Your browser doesn\'t support geolocation.');
        }


    // The idle event is a debounced event, so we can query & listen without
    // throwing too many requests at the server.
    map.addListener('idle', performSearch);

    // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Binds the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });


        
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
        return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
              var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
              };


              // Create a marker for each place.
              markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
              }));

                   if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
              } else {
                bounds.extend(place.geometry.location);
              }
            });//Place for each closer
    
    map.fitBounds(bounds);
  
 });//Searchbox listener closer

}//Close initmap

//Pass the text value of the button as an argument to the performSearch function when user clicks the button
$(".pass").on("click", function () {
    console.log($(this).text());
    var buttonSearch = $(this).text();
    performSearch(buttonSearch);
   
})
//Function to perform the search
function performSearch(buttonSearch) {

  for (var i = 0; i < markers.length; i++ ) {
    markers[i].setMap(null);
  }
  markers.length = 0;

    if (buttonSearch == null) {
     buttonSearch = 'pizza';
    }  

    var request = {
        bounds: map.getBounds(),
        keyword: buttonSearch        
    };
//Radar search that returns a large list of places within specific radius
    service.radarSearch(request, callback);
}

function callback(results, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
    }
    for (var i = 0; i < results.length; i++) {
        addMarker(results[i]);
    }
}

//Function that adds markers
function addMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: {
            url: 'http://maps.gstatic.com/mapfiles/circle.png',
            anchor: new google.maps.Point(10, 10),
            scaledSize: new google.maps.Size(10, 17)
        }
    });

    //Event Listener thats executed when a marker is clicked to display place info
    google.maps.event.addListener(marker, 'click', function() {
        service.getDetails(place, function(result, status) {
            // console.log(result)
            
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
            }
            infoWindow.setContent("<strong>name: </strong>" + result.name + "<p>" + "<strong>address:  </strong>" + result.formatted_address + "<p>" + "<strong>phone number:  </strong>" + result.formatted_phone_number + "<p>" + "<strong>rating: </strong>" + result.rating + "<p>");

            infoWindow.open(map, marker);
        });
    });
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
}
$(document).on('click', '#next', moveToInfo);