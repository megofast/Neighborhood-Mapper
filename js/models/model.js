
var model = function() {
  this.locations = [
    {name: 'Veterans Acres Park', location: {lat: 42.241134, lng: -88.316196}},
    {name: 'Main Beach', location: {lat: 42.2311724, lng: -88.3478235}},
    {name: 'The Cottage', location: {lat: 42.24132, lng: -88.3226819}},
    {name: 'Sterns Woods', location: {lat: 42.2589705, lng: -88.3219884}},
    {name: 'Lippold Park', location: {lat: 42.2456814, lng: -88.362401}}
  ];

  this.poi = function(location) {
    this.name = ko.observable(location.name);
    this.location = ko.observableArray(location.location);
    this.reviews = ko.observableArray(location.reviews); // From yelp
    this.images = ko.observableArray(location.images); // From flickr

  };

  function init_model() {
    // TODO: Add functionality to fill poi data
    
  }
  // TODO: Add function to use ajax to get yelp reviews for place
  function getYelpReview(location_name) {

  }

  // TODO: Add function to get photos from flickr for place
};
