var map;

function initMap(map) {
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
    var poi = new POI;
    self.pois.push(poi.init(location[i]));
  }
  //locations.forEach(function(loc) {
  //  var poi = new POI;
  //  self.pois.push(poi.init(loc));
  //});

  for (i = 0; i < self.pois.length; i++) {
    // Create a marker for each locations
    var marker = new google.maps.Marker({
      map: map,
      position: self.pois.position,
      title: self.pois.name,
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
