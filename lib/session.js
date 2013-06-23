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
	Session.data[id] = this;
};

Session.data = {};

Session.get = function(id) {
	console.log(id, Session.data);
	if ( ! Session.exists(id)) {
		throw new Error("ID does not exist");
	}

	return Session.data[id];
};

Session.exists = function(id) {
	return Session.data.hasOwnProperty(id);
};
