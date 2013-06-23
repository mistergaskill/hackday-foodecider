"use strict";

function generateID() {
	return Object.keys(Session.data).length + 1;
}

var Session = module.exports = function Session() {
	var id = generateID();

	if (Session.exists(id)) {
		throw new Error("ID already exists");
	}

	this.id = id;
	this.choices = [];
	Session.data[id] = this;
};

Session.data = {};

Session.get = function(id) {
	if ( ! Session.exists(id)) {
		throw new Error("ID does not exist");
	}

	return Session.data[id];
};

Session.exists = function(id) {
	return Session.data.hasOwnProperty(id);
};

Session.prototype = {
	addChoice: function(name) {
		if (this.choices.indexOf(name) === -1) {
			this.choices.push(name);
		}
	},
};
