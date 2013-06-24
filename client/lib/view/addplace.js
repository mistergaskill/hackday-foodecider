define(function(require) {
  return Backbone.View.extend({
    tagName: 'form',
    className: 'add-place-form',
    events: {
      "submit": function(e) {
        e.preventDefault();
        this.submit();
      }
    },
    initialize: function() {
      this.$name = $('<input name="name" type="text">');
    },
    render: function() {
      this.$el.html('').
        append(this.$name).
        append($('<button type="submit">').text('Add Place'));
      return this;
    },
    submit: function() {
      this.collection.create({
        name: this.$name.val()
      });
      this.el.reset();
    }
  });
});
