let viewModel = function() {
  let self = this;
  self.pois = ko.observableArray([]);
  self.markers = ko.observableArray([]);
  self.filterText = ko.observable('');
  self.listVisible = ko.observableArray([]);
  self.listSelected = ko.observableArray([]);

  // Create all the POI in to the pois array, setup markers and list
  for (i = 0; i < locations.length; i++) {
    self.pois.push(new POI(locations[i]));
    setupMapMarker(self, i, self.markers);
    self.listVisible.push(true);
    self.listSelected.push(false);
  }

  self.listSelectionChange = function(data, event, id) {
    // If no item has been selecte yet, remove all markers
    if (!self.listSelected().includes(true)) {
      hideAllMarkers(self.markers);
    }
    // If the list item is selected, unselect it, otherwise select it
    if (self.listSelected()[id()]) {
      // Selected twice...
      self.listSelected()[id()] = false;
      self.listSelected.valueHasMutated();
      hideMarker(self.markers()[id()]);
      google.maps.event.trigger(largeInfoWindow, 'closeclick');
    } else {
      self.listSelected()[id()] = true;
      self.listSelected.valueHasMutated();
      showMarker(self.markers()[id()]);
      // Close the open info window, stopping the animation
      google.maps.event.trigger(largeInfoWindow, 'closeclick');
      // Simulate a click and open an info window
      google.maps.event.trigger(self.markers()[id()], 'click');
      setBounds(self.markers);
    }
    // If the user deselects everything, show all markers
    if (!self.listSelected().includes(true)) {
      // Kill any open infowindows
      google.maps.event.trigger(largeInfoWindow, 'closeclick');
      // Display all the markers as no list items are selected
      showAllMarkers(self.markers);
    }
    console.log(largeInfoWindow);
  };

  self.filter = function() {
    let filter_text = self.filterText().toUpperCase();
    for (i = 0; i < self.pois().length; i++) {
      if (self.pois()[i].name().toUpperCase().indexOf(filter_text) > -1) {
        // The filter found text in the list item, show the item
        self.listVisible()[i] = true;
        showMarker(self.markers()[i]);
        self.listVisible.valueHasMutated();
      } else {
        // The filter did not find text in the item, hide the list item
        self.listVisible()[i] = false;
        hideMarker(self.markers()[i]);
        self.listVisible.valueHasMutated();
      }
    }
  };
};

// Start the app after the googlemaps api is ready
function initialize() {
  initMap();
  ko.applyBindings(new viewModel());
}
