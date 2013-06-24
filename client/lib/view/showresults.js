define(function(require) {
  var NOT_DONE_TEXT = "Show Results"
  return Backbone.View.extend({
    tagName: 'div',

    className: 'results',

    events: {
      "click": function(e) {
        e.preventDefault();
        this.getResult();
      }
    },

    initialize: function(options) {
      this.router = options.router;
      this.sessionID: options.sessionID;

      this.$button = $('<button>').text('Show Results');
      this.updateStatus();

      this.on('sync', function(coll) {
        if (coll === this.collection()) {
          this.updateStatus();
        }
      });
    },

    render: function() {
      this.$el.append(this.$button).hide();
      return this;
    },

    renderNotDone: function() {
      this.$button.addClass('danger').removeClass('success');
    },

    renderDone: function() {
      this.$button.removeClass('danger').addClass('success');
    },

    updateStatus: function() {
      if (this.collection.hasSomeoneVoted()) {
        this.$el.show();
      }
      if (this.collection.hasEveryoneVoted()) {
        this.renderDone();
      } else {
        this.renderNotDone();
      }
    },

    url: function() {
      return 'http://localhost:8001/' + this.sessionID + '/end';
    },

    getResult: function() {
      Backbone.ajax(this.url(), {
        type: 'POST',
        callback: this.displayResults,
        context: this
      });
    },

    displayResults: function(response) {
      var $result = $('<h1>').text(response.winner);
      this.$el.html('').
        append('<h3>You\'re eating at</h3>').
        append($result);
    }
  });
});
