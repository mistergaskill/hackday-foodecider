"use strict";

var sessions = {};

function generateID() {
	return Object.keys(sessions).length + 1;
}

module.exports = function Session() {
	this.id = generateID();
	sessions[this.id] = this;
};
