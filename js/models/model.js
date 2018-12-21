locations = [
  {name: 'Veterans Acres Park', location: {lat: 42.241134, lng: -88.316196}},
  {name: 'Main Beach', location: {lat: 42.2311724, lng: -88.3478235}},
  {name: 'The Cottage', location: {lat: 42.24132, lng: -88.3226819}},
  {name: 'Sterns Woods', location: {lat: 42.2589705, lng: -88.3219884}},
  {name: 'Lippold Park', location: {lat: 42.2456814, lng: -88.362401}}
];

var POI = function(loc_data) {
    self = this;
    self.name = ko.observable(loc_data.name);
    self.location = ko.observableArray([]);
    self.reviews = ko.observableArray([]); // From yelp
    self.images = ko.observableArray([]); // From foursquare

    self.location(loc_data.location);
    // Get reviews for the POI
    console.log(getYelpBusinessID(self.name()));

  // TODO: Add function to use ajax to get yelp reviews for place


  // TODO: Add function to get photos from foursquare for place
};

function getYelpBusinessID(businessName) {
  var yelpUrl = 'https://api.yelp.com/v3/businesses/search?term=' + businessName;
  $.ajax({
      url: yelpUrl,
      dataType: "jsonp",
      jsonp: "callback",
      headers: {
        'Authorization': 'Bearer sLO_kLMdzCbgJI1PJq--7F209ejJVW4iO0KGXClPsH81jk2DY-z1VMvFOme5yh7XzOXhj-b3QE1iKWfk8KihTlB_OW9HI2j9OrGkk3RN6W4R-S3SiSvgXF84ZDIcXHYx',
      },
      success: function( response ) {
          return response;

      }
  });
}

function getYelpReviews() {
  var yelpUrl = 'https://api.yelp.com/v3/businesses/{id}/reviews';
  $.ajax({
      url: yelpUrl,
      dataType: "jsonp",
      jsonp: "callback",
      headers: {
        'Authorization': 'Bearer sLO_kLMdzCbgJI1PJq--7F209ejJVW4iO0KGXClPsH81jk2DY-z1VMvFOme5yh7XzOXhj-b3QE1iKWfk8KihTlB_OW9HI2j9OrGkk3RN6W4R-S3SiSvgXF84ZDIcXHYx',
      },
      success: function( response ) {
          var articleList = response[1];

          for (var i = 0; i < articleList.length; i++) {
              articleStr = articleList[i];
              var url = 'http://en.wikipedia.org/wiki/' + articleStr;
              $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
          };
      }
  });
}
