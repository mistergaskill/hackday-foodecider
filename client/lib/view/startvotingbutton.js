define(function(require) {
  return Backbone.View.extend({
    tagName: 'button',

    className: 'btn success',

    events: {
      "click": function(e) {
        e.preventDefault();
        e.target.setAttribute('disabled', 'disabled');
        this.sendStartVoting();
      }
    },

    initialize: function(options) {
      this.router = options.router;
      this.sessionID = options.sessionID;
    },

    render: function() {
      this.$el.text('Start Voting');
      return this;
    },

    sendStartVoting: function() {
      Backbone.ajax(this.startSessionUrl(), {
        type: 'POST',
        success: this.succsesCb
      });
    },

    startSessionUrl: function() {
      return '/' + this.sessionID + '/start';
    },

    successCb: function(response) {
      this.router.navigate(response.sessionID, {trigger: true});
    }
  });
});
