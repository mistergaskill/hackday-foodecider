define(function(require) {
  return Backbone.Router.extend({

    routes: {
      "": "addPeople",
      ":sessionID": "places",
      ":sessionID/voting": "votingResults",
    },

    initialize: function() {
      this.main = document.getElementById('main');
    },

    addPeople: function() {
      var EaterCollection = require('collection/eater');
      var EatersView = require("view/eaters");

      var eaterCollection = new EaterCollection([
        { name: 'Jordan',
          phone: '540-798-5881' },
        { name: 'Jeff',
          phone: '818-817-1849' },
        { name: 'Parsha',
          phone: '714-123-4567' },
      ]);

      this.cleanView();

      this.view = new EatersView({
        collection: eaterCollection,
        router: this
      }).render();

      this.renderView();
    },

    places: function(sessionID) {
      var PlacesCollection = require('collection/place');
      var PlacesPage = require('view/places');

      var placesCollection = new PlacesCollection([], {
        sessionID: sessionID
      });

      this.cleanView();

      this.view = new PlacesPage({
        collection: placesCollection,
        router: this,
        sessionID: sessionID
      }).render();

      this.renderView();
    },

    votingResults: function(sessionID) {
      this.cleanView();



    },

    cleanView: function() {
      if (this.view) {
        this.view.remove()
      }
    },

    renderView: function() {
      $(this.main).html(this.view.$el);
    },

  });
});
