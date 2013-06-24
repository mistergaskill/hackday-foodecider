define(function() {
  return Backbone.View.extend({
    tagName: 'li',
    events: {
      "click .remove": function(e) {
        e.preventDefault();
        this.collection.remove(this.model);
      }
    },
    initialize: function() {
      this.$name = $('<div>').addClass('eater-name').text(this.model.get('name'));
      this.$phone = $('<div>').addClass('eater-phone').text(this.model.get('phone'));
      this.$removeButton = $('<button>').addClass('remove').text('Remove');
    },
    render: function() {
      this.$el.html('').
        append(this.$name).
        append(this.$phone).
        append(this.$removeButton);
      return this;
    }
  });
});
