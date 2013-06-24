define(function(require) {
  var EaterView = require('view/eater');

  return Backbone.View.extend({
    tagName: 'form',
    className: 'add-eater-form',
    events: {
      "submit": function(e) {
        e.preventDefault();
        this.submit();
      }
    },
    initialize: function() {
      this.$name = $('<input name="name" type="text">');
      this.$phone = $('<input name="phone" type="tel">');
    },
    render: function() {
      this.$el.html('').
        append(this.$name).
        append(this.$phone).
        append($('<button type="submit">').text('Add Eater'));
      return this;
    },
    submit: function() {
      this.collection.add({
        name: this.$name.val(),
        phone: this.$phone.val(),
      });
      this.el.reset();
    }
  });
});
