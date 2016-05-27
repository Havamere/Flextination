//Google API Key -- AIzaSyCGbLaGsRnpqv8rORu25GIJ5Xs_NzU0xR0

var map;
var infoWindow;
var service;
var markers = [];
var latlong = {};
var haightAshbury = {};
var autocomplete;
var markerArr = [];

function initAutocomplete() {

    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (document.getElementById('autocomplete')), { types: ['geocode'] });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);

}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    lat = place.geometry.location.lat();
    long = place.geometry.location.lng();
    address = place.formatted_address;
    console.log(lat)
    console.log(long)
    localStorage.setItem('lat', lat);
    localStorage.setItem('long', long);
    localStorage.setItem('address', address);


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
    var lat = parseFloat(localStorage.getItem('lat'));
    var long = parseFloat(localStorage.getItem('long'));

    haightAshbury = { lat: lat, lng: long };
    console.log(haightAshbury);
    // console.log(lat, long);

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: haightAshbury,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    // This event listener will call addMarker() when the map is clicked.
    map.addListener('click', function(event) {
        addMarker(event.latLng);

    });

    // Adds a marker at the center of the map.
    var centerMarker = new google.maps.Marker({
    position: haightAshbury,
    icon: 'assets/images/center.png',
    map: map
  });
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
    console.log(markers);
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
// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}



// function addResults(place) {
//     google.maps.event.addListener(marker, 'click', function() {
//         service.getDetails(place, function(result, status) {
//             console.log(result);
//             if (status !== google.maps.places.PlacesServiceStatus.OK) {
//                 console.error(status);
//                 return;
//             }
//             infoWindow.setContent("<strong>name: </strong>" + result.name + "<p>" + "<strong>address:  </strong>" + result.formatted_address + "<p>" + "<strong>phone number:  </strong>" + result.formatted_phone_number + "<p>" + "<strong>rating: </strong>" + result.rating + "<p>");

//             infoWindow.open(map, marker);
//         });
//     })
// }

function moveToInfo() {
    window.location.href = 'info.html';
    initMap();
}


function newResults() {
    console.log(typeof(markerArr));
    console.log(markerArr);

    //Remove the old results and add the new results
    $("#mapResults").empty(); 
   
   //If markerArr
   if (markerArr) {  
    for (var i=0; i < markerArr.length; i++) {
    markerArr[i].setMap(null);
}
}
    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    var type = $(this).text();
    var request = {
        bounds: map.getBounds(),
        keyword: type,
        rankBy: google.maps.places.RankBy.PROMINENCE,
        limit: 5,

    };

    service.radarSearch(request, callback);



    function callback(results, status) {
    console.log(results)
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            //initialize();
            //  iterator = 0;
            markerArr = [];
            for (var i = 0; i < 5; i++) {
                addMarker(results[i]);
                addResults(results[i]);
            }
        } else {
            alert("Sorry, there are no locations in your area");
        }
        
    }
    function addResults(place) {


            service.getDetails(place, function(result, status) {
                // console.log(result);
                if (status !== google.maps.places.PlacesServiceStatus.OK) {
                    console.error(status);
                    return;
                }
                $('#mapResults').append("<p><b>Name:</b>" + result.name + "<p><b>Address:  </b>" + result.formatted_address + "<p><b>Phone number:  </b>" + result.formatted_phone_number + "<p><b>Rating: </b>" + result.rating);

               // infoWindow.open(map, marker);



            });


        // addResults(place, marker);
    }
    function addMarker(place) {
           // console.log(place)
            // markerArr.setMap(null);
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            // icon: {
            //     url: 'http://maps.gstatic.com/mapfiles/circle.png',
            //     anchor: new google.maps.Point(10, 10),
            //     scaledSize: new google.maps.Size(10, 17)
            // }

        });
                markerArr.push(marker);
                console.log(markerArr);

        google.maps.event.addListener(marker, 'click', function() {
            service.getDetails(place, function(result, status) {
                console.log(result);
                if (status !== google.maps.places.PlacesServiceStatus.OK) {
                    console.error(status);
                    return;
                }
                infoWindow.setContent("<p><b>Name:</b>" + result.name + "<p><b>address:  </b>" + result.formatted_address + "<p><b>phone number:  </b>" + result.formatted_phone_number + "<p><b>rating: </b>" + result.rating);

                infoWindow.open(map, marker);



            });

        });
        // addResults(place, marker);
    }


    // function addResults(place, marker) {
    //     google.maps.event.addListener(marker, 'click', function() {
    //         service.getDetails(place, function(result, status) {
    //             console.log(result);
    //             if (status !== google.maps.places.PlacesServiceStatus.OK) {
    //                 console.error(status);
    //                 return;
    //             }
    //             infoWindow.setContent("<strong>name: </strong>" + result.name + "<p>" + "<strong>address:  </strong>" + result.formatted_address + "<p>" + "<strong>phone number:  </strong>" + result.formatted_phone_number + "<p>" + "<strong>rating: </strong>" + result.rating + "<p>");

    //             infoWindow.open(map, marker);
    //         });
    //     })
    // }
}
//     console.log('sup');
//     console.log($(this).val());
//     type = $(this).val();


//   infowindow = new google.maps.InfoWindow();
//   var service = new google.maps.places.PlacesService(map);
//   service.nearbySearch({
//     location: haightAshbury,
//     radius: 1500,
//     type: type,
//   }, callback);
// }

// function callback(results, status) {
//   if (status === google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       createMarker(results[i]);
//       //console.log(results[i]);
//     }
//   }
// }

// function createMarker(place) {
//   var placeLoc = place.geometry.location;
//   var marker = new google.maps.Marker({
//     map: map,
//     position: place.geometry.location
//   });

//   google.maps.event.addListener(marker, 'click', function() {
//     infowindow.setContent("<p><b>Name:</b>" + place.name + "<p><b>address:  </b>" + place.formatted_address + "<p><b>phone number:  </b>" + place.formatted_phone_number + "<p><b>rating: </b>" + place.rating);
//     infowindow.open(map, this);
//   });
// }

$(document).on('click', '#next', moveToInfo);

//When one of the options from the dropdown menu is clicked, run the function that displays the results
$(document).on('click', '.dropdown-menu li', newResults);
