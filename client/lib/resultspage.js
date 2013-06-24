define(function(require) {
  var ResultsList    = require('view/votingresultslist');
  var ShowResults    = require('view/showresults');

  return Backbone.View.extend({
    initialize: function(options) {
      this.resultsList = new ResultsList({
        collection: this.collection
      });

      this.showResults = new ShowResults
        collection: this.collection,
        sessionID: options.sessionID,
        router: options.router
      });

      var that = this;
      this.fetchTimeout = setTimeout(function() {
        that.collection.fetch();
      }, FETCH_INTERVAL);
    },

    render: function() {
      this.$el.
        append(this.reusltsList.render().el).
        append(this.showResults.render().el);
      return this;
    }
  });
});
