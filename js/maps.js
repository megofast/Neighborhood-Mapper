var map;
var largeInfoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.2411344, lng: -88.31619649999999},
    zoom: 13, mapTypeControl: false, gestureHandling: 'none'
  });
  largeInfoWindow = new google.maps.InfoWindow();
}

  function createMarker(pos, title, id) {
    var marker = new google.maps.Marker({
      map: map,
      position: pos,
      title: title,
      animation: google.maps.Animation.DROP,
      id: id
    });
    return marker;
  }

  function setupMapMarker(vm, i, markers) {
    var marker = createMarker(vm.pois()[i].location(), vm.pois()[i].name(), i);

    // Add the marker to the markers array
    markers.push(marker);

    // Create a click listener for each marker
    marker.addListener('click', function() {
      // Check to see whether the yelp data has previously been retrieved
      if (vm.pois()[this.id].phone() == null && vm.pois()[this.id].formatted_address() == null) {
        // Create an api request to get the yelp data for just this item
        requestYelpData(i, vm, vm.pois()[this.id].name(), vm.pois()[this.id].location());
        createInfoWindow(map, this, largeInfoWindow, vm);
      } else {
        // The data has previously been retrieved
        createInfoWindow(map, this, largeInfoWindow, vm);
        updateInfoWindow(vm, this.id, 'preloaded');
      }
      // Create the info window
    });
  }

  function updateInfoWindow(vm, id, status) {
    if (status == 'success' || status == 'preloaded') {
      // The data was retreived asynchronously successfully, show infowindow data
      var content = '<div class="inf"><div>' + vm.pois()[id].name() + '</div>' +
                      '<div>' + vm.pois()[id].phone() + '</div>' +
                      '<div>' + vm.pois()[id].formatted_address() + '</div>' +
                      '<div>' + vm.pois()[id].rating() + '</div>' +
                      '<div>5 Reviews</div></div>';
      largeInfoWindow.setContent(content);
    } else if (status == 'failure') {
      // The data has previously been retreived, do not refetch with api.
    }
  }

  function createInfoWindow(map, marker, infoWindow, vm) {
    // Make sure the infowindow is not already open

    if (infoWindow.marker !== marker) {
      infoWindow.marker = marker;
      var content_loading = '<div class="info-container"><div class="box">Loading...</div><div class="box"><div class="spinner"></div></div></div>';
      infoWindow.setContent(content_loading);
      infoWindow.open(map, marker);
      infoWindow.addListener('closeclick', function() {
        infoWindow.marker = null;
      });
    }
  }

function showAllMarkers(markers) {
  var bounds = new google.maps.LatLngBounds();
  for(var i = 0; i < markers().length; i++) {
    showMarker(markers()[i]);
    bounds.extend(markers()[i].position);
  }
  map.fitBounds(bounds);
}

function hideAllMarkers(markers) {
  for(var i = 0; i < markers().length; i++) {
    hideMarker(markers()[i]);
  }
}

function showMarker(marker, bounds) {
  marker.setMap(map);
}

function hideMarker(marker) {
  marker.setMap(null);
}
