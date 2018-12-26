var viewModel = function() {
  var self = this;
  self.pois = ko.observableArray([]);
  self.markers = ko.observableArray([]);

  self.listSelectionChange = function(data, event, id) {
    // If no item has been selected yet, remove all markers from map
    if ($('.active').length == 0) {
      hideAllMarkers(self.markers);
    }

    if ($(event.currentTarget).hasClass('active')) {
      // The current selection was made twice, remove the active class and hide marker
      $(event.currentTarget).removeClass('active');
      hideMarker(self.markers()[id()]);
    } else {
      $(event.currentTarget).addClass('active');
      showMarker(self.markers()[id()]);
    }

    // We must check again if no markers are selected after click, show all markers
    if ($('.active').length == 0) {
      showAllMarkers(self.markers);
    }
  };

  // Create all the POI in to the pois array
  for (i = 0; i < locations.length; i++) {
    this.pois.push(new POI(locations[i]));
    setupMapMarker(self, i, self.markers);
  }
};

// Start the app after the googlemaps api is ready
function initialize() {
  initMap();
  ko.applyBindings(new viewModel());
  // Programatically invoke a click to start with the markers as shown.
}
