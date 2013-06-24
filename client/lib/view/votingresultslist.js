define(function(require) {
  var EaterResultView = require('view/eaterresult');

  return EaterCollectionView.extend({
    createEaterView: function(eater) {
      return new EaterResultView({
        collection: this.collection,
        model: eater
      });
    }
  });
});
