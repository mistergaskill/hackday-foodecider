define(function(require) {
  return Backbone.Collection.extend({
    initialize: function(options) {
      this.sessionID = options.sessionID || null;
    },

    url: function() {
      return 'http://localhost:8001/' + this.sessionID + '/people';
    },

    hasEveryoneVoted: function() {
      this.every(function(model) {
        return model.get('voted');
      });
    },

    hasAnyoneVoted: function() {
      this.some(function(model) {
        return model.get('voted');
      });
    },

    model: require('model/eater')
  });
});
