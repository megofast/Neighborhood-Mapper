var viewModel = function() {
  var self = this;
  self.pois = ko.observableArray([]);
  self.markers = ko.observableArray([]);

  // Create all the POI in to the pois array
  for (i = 0; i < locations.length; i++) {
    this.pois.push(new POI(locations[i]));
    setupMapMarker(self, i, self.markers);
  }
  console.log(self.markers());
};

// Start the app after the googlemaps api is ready
function initialize() {
  initMap();
  ko.applyBindings(new viewModel());
  // Programatically invoke a click to start with the markers as shown.
  $('#show-btn').click();
}
