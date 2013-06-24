define(function() {
  return Backbone.View.extend({
    tagName: 'li',
    className: 'eater-result',
    initialize: function() {
      this.$name = $('<div>').addClass('eater-name').text(this.model.get('name'));
    },
    updateStatus: function() {
      this.$el.toggleClass('voted', this.model.get('voted'));
    },
    render: function() {
      this.$el.html('').
        append(this.$name);
      this.updateStatus();
      return this;
    }
  });
});
