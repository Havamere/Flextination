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
    // console.log(place);
    lat = place.geometry.location.lat();
    long = place.geometry.location.lng()
    address = place.formatted_address;

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
    //console.log(haightAshbury);
    // console.log(lat, long);

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: haightAshbury,
        mapTypeId: google.maps.MapTypeId.TERRAIN
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

    var startDate = $('#startDate').val();
    var endDate = $('#endDate').val();

    localStorage.setItem('startDate', startDate);
    localStorage.setItem('endDate', endDate);


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
        //bounds: map.getBounds(),
        map: map,
        location: haightAshbury,
        keyword: type,
        rankBy: google.maps.places.RankBy.PROMINENCE,
        radius: 5000,
        zoom: 13,
        // limit: 5,

    };

    service.radarSearch(request, callback);



    function callback(results, status) {
        // console.log(results)//Array of results with place information
        markerArr = [];
        for (var i = 0; i < results.length; i++) {
            service.getDetails(results[i], function(result, status) {
                // console.log(result);

                if (result.rating > 4) {
                    console.log("Only the best of the best, Ratings are greater than 4")
                    addMarker(result);
                    addResults(result);
                }

            })
        } //End for loop
    }

    function addResults(place) {
        var b = $('<button>');
        b.addClass('btn btn-default addToItin');
        b.text('Add To Itinerary');
        b.attr('data-name', place.name);
        b.attr('data-addr', place.formatted_address);
        b.attr('data-phone', place.formatted_phone_number);
        b.attr('data-rating', place.rating);

        $('#list2').append("<li><p><b>Name: </b>" + place.name + "</p><p><b>Address: </b>" + place.formatted_address + "</p><p><b>Phone Number: </b>" + place.formatted_phone_number + "</p><p><b>Rating: </b>" + place.rating + "</p></li>");
        $('#list2').append(b);
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
    console.log('inside addToItin function');
    //pulls info from the button
    var name = $(this).attr('data-name');
    var address = $(this).attr('data-addr');
    var rating = $(this).attr('data-rating');
    var phone = $(this).attr('data-phone');

    // pulls in info from the date/weather section
    var itinDate = $('.weatherRadioButtons:checked').attr('data'); /*selector for radio button date value*/
    //console.log(itineraryDate);
    var itinWeather = $('.weatherRadioButtons:checked').val(); /*selector for radio button weather value*/
    //console.log(itineraryWeather);
    
    console.log('name: ' + name);
    console.log('address: ' + address);
    console.log('rating: ' + rating);
    console.log('phone: ' + phone);
    console.log('itineraryDate: ' + itinDate);
    console.log('itineraryWeather: ' + itinWeather);

    var itineraryObj = new itinerary(itinDate, itinWeather, name, address, rating, phone);

    console.log(itineraryObj);

    $('#date-weather').append('<div class="day-and-weather">' +
        '<p>Date: ' + itineraryObj.date + '</p>' +
        '<p>Forecast: ' + itineraryObj.weather + '</p>' +
        '</div>');

    $('#place-to-go').append('<div class="place">' +
        '<p>Place: ' + itineraryObj.name + '    Address: ' + itineraryObj.address + '</p>' +
        '<p>Google User Rating: ' + itineraryObj.rating + '    Phone Number: ' + itineraryObj.phone + '</p>' +
        '</div>');

}


$(document).on('click', '#next', moveToInfo);

//When one of the options from the dropdown menu is clicked, run the function that displays the results
$(document).on('click', '.dropdown-menu li', newResults);

$(document).on('click', '.addToItin', addToItin);
