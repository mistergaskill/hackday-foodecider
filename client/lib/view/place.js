define(function() {
  return Backbone.View.extend({
    tagName: 'li',
    events: {
      "click .remove": function(e) {
        e.preventDefault();
        this.collection.remove(this.model);
      }
    },
    render: function() {
      this.$el.html('').
        text(this.model.get('name')).
        append($('<button>').addClass('btn remove').text('Remove'));
      return this;
    }
  });
});
