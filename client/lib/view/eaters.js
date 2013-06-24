define(function(require) {
  var EaterCollectionView    = require('view/eatercollection');
  var AddEaterView           = require('view/addeater');
  var InitializeAddPhaseView = require('view/initializeaddphase');

  return Backbone.View.extend({
    initialize: function(options) {
      this.eaterCollectionView = new EaterCollectionView({
        collection: this.collection,
        router: options.router
      });

      this.addEaterView = new AddEaterView({
        collection: this.collection,
        router: options.router
      });

      this.initializeAddPhaseView = new InitializeAddPhaseView({
        collection: this.collection,
        router: options.router
      });
    },

    render: function() {
      this.$el.
        append(this.addEaterView.render().el).
        append(this.eaterCollectionView.render().el).
        append(this.initializeAddPhaseView.render().el);
      return this;
    }
  });
});
