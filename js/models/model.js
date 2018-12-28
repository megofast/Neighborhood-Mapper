const locations = [
  {name: 'Veterans Acres Park', location: {lat: 42.252071, lng: -88.318866}},
  {name: 'Main Beach', location: {lat: 42.232333, lng: -88.344324}},
  {name: 'The Cottage', location: {lat: 42.241346, lng: -88.320419}},
  {name: 'Sterns Woods', location: {lat: 42.263007, lng: -88.307918}},
  {name: 'Cafe Olympic', location: {lat: 42.24338, lng: -88.317306}},
  {name: 'Raue Center', location: {lat: 42.241961, lng: -88.319034}}
];

let POI = function(loc_data) {
    self = this;
    self.name = ko.observable(loc_data.name);
    self.rating = ko.observable();
    self.formatted_address = ko.observable();
    self.phone = ko.observable();
    self.location = ko.observableArray([]);
    self.image = ko.observable();
    self.location(loc_data.location);
};

function requestYelpData(id, vm, name, loc) {
  let promise = getYelpData(name, loc);
  promise.then(function(data) {
    vm.pois()[id].phone(data.businesses[0].display_phone);
    vm.pois()[id].rating(data.businesses[0].rating);
    vm.pois()[id].image(data.businesses[0].image_url);
    vm.pois()[id].formatted_address(data.businesses[0].location.address1 +
                                    ', ' + data.businesses[0].location.city +
                                    ', ' + data.businesses[0].location.state +
                                    ' ' + data.businesses[0].location.zip_code );
    // Tell the infowindow the data is ready to be displayed
    updateInfoWindow(vm, id, "success");
  });
  // Handle if the Yelp data request fails
  promise.fail(function(error) {
    updateInfoWindow(vm, id, "failure");
  });
}

function getYelpData(businessName, loc) {
  let yelpUrl = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=' + businessName + '&latitude=' + loc.lat + '&longitude=' + loc.lng + '&limit=1';
  return $.ajax({
      url: yelpUrl,
      method: 'GET',
      dataType: "json",
      headers: {
        'Authorization': 'Bearer sLO_kLMdzCbgJI1PJq--7F209ejJVW4iO0KGXClPsH81jk2DY-z1VMvFOme5yh7XzOXhj-b3QE1iKWfk8KihTlB_OW9HI2j9OrGkk3RN6W4R-S3SiSvgXF84ZDIcXHYx',
      },
  });
}
