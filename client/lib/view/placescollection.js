define(function(require) {
  var PlaceView = require('view/place');

  return Backbone.View.extend({
    tagName: 'ul',
    className: 'unstyled places',
    initialize: function() {
      this.collection.on('add', this.add, this);
    },
    render: function() {
      this.$el.html('');
      this.collection.forEach(this.add, this);
      return this;
    },
    add: function(eater) {
      var placeView = new PlaceView({
        model: eater,
        collection: this.collection
      }).render();
      eater.on('remove', function(model, collection) {
        if (collection === this.collection) {
          placeView.remove();
        }
      }, this);
      this.$el.append(placeView.el);
    }
  });
});
