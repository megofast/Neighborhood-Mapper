function createMarker(map, pos, title, id) {
  var marker = new google.maps.Marker({
    map: map,
    position: pos,
    title: title,
    animation: google.maps.Animation.DROP,
    id: id
  });
  return marker;
}

function createInfoWindow(map, marker, infoWindow) {
  // Make sure the infowindow is not already open
  
  if (infoWindow.marker !== marker) {
    infoWindow.marker = marker;
    infoWindow.setContent('<div id="info-window">' + marker.title + '</div>');
    infoWindow.open(map, marker);
    infoWindow.addListener('closeclick', function() {
      infoWindow.marker = null;
    });
  }
}
