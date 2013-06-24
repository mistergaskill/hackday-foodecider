define(function(require) {
  return Backbone.View.extend({
    tagName: 'button',

    className: 'btn success',

    events: {
      "click": function(e) {
        e.preventDefault();
        this.initializeAddPhase();
      }
    },

    initialize: function(options) {
      this.router = options.router;
    },

    render: function() {
      this.$el.text('Open Suggestions SMS');
      return this;
    },


    initializeAddPhase: function() {
      Backbone.ajax('http://localhost:8001/', {
        type: 'POST',
        data: JSON.stringify(this.collection.toJSON()),
        success: this.callback,
        context: this
      });
    },

    callback: function(response) {
      this.router.navigate(response.sessionID.toString(), {trigger: true});
    }
  });
});
