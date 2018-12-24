var map;
var vm;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.2411344, lng: -88.31619649999999},
    zoom: 13, mapTypeControl: false, gestureHandling: 'none'
  });

  // Create a view model
  vm = new viewModel();
  ko.applyBindings(vm);
}

var viewModel = function() {
  var self = this;
  self.pois = ko.observableArray([]);
  var markers = [];
  var largeInfoWindow = new google.maps.InfoWindow();

  // Create all the POI in to the pois array
  for (i = 0; i < locations.length; i++) {
    this.pois.push(new POI(locations[i]));
  }

  // Use the pois array to create the map markers via googlemaps api.
  for (i = 0; i < self.pois().length; i++) {
    var marker = createMarker(map, self.pois()[i].location(), self.pois()[i].name(), i);

    // Add the marker to the markers array
    markers.push(marker);

    // Create a click listener for each marker
    marker.addListener('click', function() {
      createInfoWindow(map, this, largeInfoWindow);
    });
  }
};
