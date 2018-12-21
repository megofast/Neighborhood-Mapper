var map;
var markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.2411344, lng: -88.31619649999999},
    zoom: 13, mapTypeControl: false
  });
  var locs = new model();
  
  var largeInfoWindow = new google.maps.InfoWindow();
  for (var i = 0; i < locs.locations.length; i++) {
    var position = locs.locations[i].location;
    var name = locs.locations[i].name;

    // Create a marker for each locations
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: name,
      animation: google.maps.Animation.DROP,
      id: i
    });

    // Add the marker to the markers array
    markers.push(marker);

    // Create a click listener for each marker
    marker.addListener('click', function() {
      createInfoWindow(this, largeInfoWindow);
    });
  } // Close for loop
}

function createInfoWindow(marker, infoWindow) {
  // Make sure the infowindow is not already open
  if (infoWindow.marker !== marker) {
    infoWindow.marker = marker;
    infoWindow.setContent('<div>' + marker.title + '</div>');
    infoWindow.open(map, marker);
    infoWindow.addListener('closeclick', function() {
      infoWindow.marker = null;
    });
  }
}
