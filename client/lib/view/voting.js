define(function(require) {
  var PlacesCollectionView   = require('view/placescollection');
  var AddPlaceView           = require('view/addplace');
  var StartVotingView        = require('view/startvotingbutton');

  var FETCH_INTERVAL = 2000;

  return Backbone.View.extend({
    initialize: function(options) {
      this.placeList = new PlacesCollectionView({
        collection : this.collection,
        router     : options.router
      });

      this.addPlace = new AddPlaceView({
        collection : this.collection,
        sessionID  : options.sessionID,
        router     : options.router
      });

      this.startVoting = new StartVotingView({
        router    : options.router,
        sessionID : options.sessionID
      });

      this.fetchTimeout = setTimeout(this.collection.fetch, FETCH_INTERVAL);
    },

    render: function() {
      this.$el.
        append(this.addPlace.render().el).
        append(this.placeList.render().el).
        append(this.startVoting.render().el);
      return this;
    }
  });
});
