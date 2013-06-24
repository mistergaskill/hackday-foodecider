define(function(require) {
  var WEBUI_SUGGESTER_ALIAS = 'me';

  return Backbone.Collection.extend({
    initialize: function(model, options) {
      this.sessionID = options.sessionID;
    },

    parse: function(data, options) {
      return _.map(data, function(place) {
        if (!place.suggester) {
          place.suggester = WEBUI_SUGGESTER_ALIAS;
        }
        return place
      });
    },

    url: function() {
    debugger;
      return 'http://localhost:8001/' + this.sessionID + '/choices';
    },

    model: require('model/place')
  });
});
