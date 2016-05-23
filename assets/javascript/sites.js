// YELP API v2.0
// Consumer Key BSS68rjsPO2lQBw7PpuhZA
// Consumer Secret  dF-czw4ou1J7y6Dm12PKwKtrxKU
// Token  xzujGzICCw693PrkVleQqN7DcdSbWdYw
// Token Secret HuLf7jP9w2l9WNd5yYhJSeyS2l4

//Google API Key -- AIzaSyCGbLaGsRnpqv8rORu25GIJ5Xs_NzU0xR0


var map;
var infoWindow;
var service;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 45.4408, lng: 12.3155 },
        zoom: 15,
        styles: [{
            stylers: [{ visibility: 'simplified' }]
        }, {
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
        }]
    });

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

    // if (status !== google.maps.places.PlacesServiceStatus.OK) {
    //     console.error(status);
    //     return;
    // }
    // for (var i = 0; result = results[i]; i++) {

    //     // console.log(status;);
    //     addMarker(result);
    // }


    if (status == google.maps.places.PlacesServiceStatus.OK) {
        //initialize();
        //  iterator = 0;
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

    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: {
            url: 'http://maps.gstatic.com/mapfiles/circle.png',
            anchor: new google.maps.Point(10, 10),
            scaledSize: new google.maps.Size(10, 17)
        }
    });

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
