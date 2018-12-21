var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.2411344, lng: -88.31619649999999},
    zoom: 13, mapTypeControl: false, gestureHandling: 'none'
  });

  // Create a view model
  ko.applyBindings(new viewModel());
}

var viewModel = function() {
  var self = this;
  self.pois = ko.observableArray([]);
  var markers = [];
  var largeInfoWindow = new google.maps.InfoWindow();

  for (i = 0; i < locations.length; i++) {
    this.pois.push(new POI(locations[i]));
  }

  for (i = 0; i < self.pois().length; i++) {
    // Create a marker for each locations
    var marker = new google.maps.Marker({
      map: map,
      position: self.pois()[i].location(),
      title: self.pois()[i].name(),
      animation: google.maps.Animation.DROP,
      id: i
    });

    // Add the marker to the markers array
    markers.push(marker);

    // Create a click listener for each marker
    marker.addListener('click', function() {
      createInfoWindow(this, largeInfoWindow);
    });
  }
};

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
