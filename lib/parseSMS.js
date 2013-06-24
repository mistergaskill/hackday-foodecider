"use strict";

var parse = module.exports = function(message) {
	message = message.toLowerCase();
	if (message.indexOf("add") === 0) {
		return {
			action: "add",
			name: message.slice(4),
		};
	}
	if (message.indexOf("veto") === 0 || message.indexOf("vote") === 0) {
		return parseVote(message);
	}
	else {
		return { action: "none" };
	}
}

function parseVote(message) {
	var vetoIndex = message.indexOf("veto"),
		voteIndex = message.indexOf("vote");

	if (vetoIndex !== -1 && voteIndex !== -1) {
		var votes, vetoes;

		if (vetoIndex > voteIndex) {
			votes = message.slice(0, vetoIndex);
			vetoes = message.slice(vetoIndex);
		}
		else {
			votes = message.slice(0, voteIndex);
			vetoes = message.slice(voteIndex);
		}

		return {
			action: "vote",
			votes: votes.slice(5).split(" ").slice(0,3),
			vetoes: vetoes.slice(5).split(" ").slice(0,1),
		};
	}
	else if (vetoIndex !== -1) {
		return {
			action: "vote",
			vetoes: message.slice(5).split(" ").slice(0,1),
		};
	}
	else if (voteIndex !== -1) {
		return {
			action: "vote",
			votes: message.slice(5).split(" ").slice(0,3),
		};
	}
	else {
		return {action: "none"};
	}
}
