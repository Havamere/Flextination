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
    //console.log(place);
    lat = place.geometry.location.lat();
    long = place.geometry.location.lng()

    localStorage.setItem('lat', lat);
    localStorage.setItem('long', long);

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
    //console.log(haightAshbury);
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


function moveToInfo() {
    window.location.href = 'info.html';
    initMap();
}


function newResults() {
    console.log(typeof(markerArr));
    console.log(markerArr);

    //Refreshes the map results div with the new information
    $("#list2").empty();

    if (markerArr) {
        for (var i = 0; i < markerArr.length; i++) {
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

            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
            }

            $('#mapResults').append("<div class='col-xs-12 result'>" +
                "<p><b>Name:</b>" + result.name +
                "<p><b>address:  </b>" + result.formatted_address +
                "<p><b>phone number:  </b>" + result.formatted_phone_number +
                "<p><b>rating: </b>" + result.rating +
                "</div>");

            // infoWindow.open(map, marker);


            var btnHTML = '<button type="button" id = "itin" class="btn btn-default" data-name = result.name data-add = result.formatted_address>Add to Itinerary</button>'
            $('#list2').append("<li><p><b>Name: </b>" + result.name + "</p><p><b>Address: </b>" + result.formatted_address + "</p><p><b>Phone Number: </b>" + result.formatted_phone_number + "</p><p><b>Rating: </b>" + result.rating + "</p>" + btnHTML + "</li>");

        });

    }

    function addMarker(place) {

        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,

        });
        markerArr.push(marker);
        console.log(markerArr);

        google.maps.event.addListener(marker, 'click', function() {
            service.getDetails(place, function(result, status) {
                // console.log(result);
                if (status !== google.maps.places.PlacesServiceStatus.OK) {
                    console.error(status);
                    return;
                }
                infoWindow.setContent("<p><b>Name:</b>" + result.name + "<p><b>address:  </b>" + result.formatted_address + "<p><b>phone number:  </b>" + result.formatted_phone_number + "<p><b>rating: </b>" + result.rating);

                infoWindow.open(map, marker);
            });

        });

    }

}

function addToItin() {
    console.log("I was added to the Itinerary");

}

$(document).on('click', '#next', moveToInfo);

//When one of the options from the dropdown menu is clicked, run the function that displays the results
$(document).on('click', '.dropdown-menu li', newResults);

$(document).on('click', '#itin', addToItin);
