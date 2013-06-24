define(function(require) {
  var Router = require('lib/router');
  var success = new Router();

  Backbone.history.start({
    pushState: true
  });
});
