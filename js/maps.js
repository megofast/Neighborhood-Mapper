let map;
let largeInfoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.2411344, lng: -88.31619649999999},
    zoom: 13,
    mapTypeControl: false
  });
  largeInfoWindow = new google.maps.InfoWindow();
}

  function createMarker(pos, title, id) {
    let marker = new google.maps.Marker({
      map: map,
      position: pos,
      title: title,
      animation: google.maps.Animation.DROP,
      id: id
    });
    return marker;
  }

  function setupMapMarker(vm, i, markers) {
    let marker = createMarker(vm.pois()[i].location(), vm.pois()[i].name(), i);

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
      let content = '<div class="txt-clr-blk"><div><h4>' + vm.pois()[id].name() + '</h4></div>' +
                      '<div><img src="' + vm.pois()[id].image() + '" height="75px" /></div>' +
                      '<div>' + vm.pois()[id].phone() + '</div>' +
                      '<div>' + vm.pois()[id].formatted_address() + '</div><div>';
      // Create the stars for the rating
      let stars = parseFloat(vm.pois()[id].rating());
      let half_star = stars % 1;
      if (half_star == 0) {
        for (i = 0; i < stars; i++) {
            // Loop and create the full stars
            content = content + '<img src="images/star.png" height="24px" width="24px" />';
        }
      } else {
        // There is a half star
        for (i = 0; i < stars; i++) {
          // Loop and create the full stars
          if (i == parseInt(stars)) {
            content = content + '<img src="images/half_star.png" height="24px" width="24px" />';
          } else {
            content = content + '<img src="images/star.png" height="24px" width="24px" />';
          }
        }
      }
      largeInfoWindow.setContent(content);
    } else if (status == 'failure') {
      // The request for api data failed, inform the user
      content = '<div class="txt-clr-blk">There was an error loading the Yelp Data, Please try again.</div>';
      largeInfoWindow.setContent(content);
    }
  }

  function createInfoWindow(map, marker, infoWindow, vm) {
    // Make sure the infowindow is not already open

    if (infoWindow.marker !== marker) {
      infoWindow.marker = marker;
      let content_loading = '<div class="info-container"><div class="box">Loading...</div><div class="box"><div class="spinner"></div></div></div>';
      infoWindow.setContent(content_loading);
      infoWindow.open(map, marker);
      infoWindow.addListener('closeclick', function() {
        infoWindow.marker = null;
      });
    }
  }

function showAllMarkers(markers) {
  let bounds = new google.maps.LatLngBounds();
  for(let i = 0; i < markers().length; i++) {
    showMarker(markers()[i]);
    bounds.extend(markers()[i].position);
  }
  map.fitBounds(bounds);
}

function hideAllMarkers(markers) {
  for(let i = 0; i < markers().length; i++) {
    hideMarker(markers()[i]);
  }
}

function setBounds(markers) {
  // Set the bounds
  let bounds = new google.maps.LatLngBounds();
  for (let i = 0; i < markers().length; i++) {
      if (markers()[i].getMap == null) {
        // The marker is not visible
      } else {
        // The marker is visible, set bounds
        bounds.extend(markers()[i].position);
      }
  }
  map.fitBounds(bounds);
}

function showMarker(marker) {
  marker.setAnimation(google.maps.Animation.DROP);
  marker.setMap(map);
}

function hideMarker(marker) {
  marker.setMap(null);
}
