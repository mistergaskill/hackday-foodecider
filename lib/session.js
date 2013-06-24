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

Session.delete = function(id) {
	if ( ! Session.exists(id)) {
		throw new Error("ID does not exist");
	}

	delete Session.data[id];
};

Session.exists = function(id) {
	return Session.data.hasOwnProperty(id);
};

Session.getByPhone = function(phone) {
	var ids = Object.keys(Session.data);

	var foundSession;

	ids.some(function(id) {
		var session = Session.data[id];
		return session.people.some(function(person) {
			if (person.phone === phone) {
				foundSession = session;
				return true;
			}
		});
	});

	if ( ! foundSession) {
		throw new Error("No session matching given phone");
	}

	return foundSession;
};

Session.prototype = {
	hasChoice: function(aChoice) {
		return this.choices.some(function(choice) {
			return choice.name === aChoice.name;
		});
	},

	addChoice: function(choice) {
		if ( ! this.hasChoice(choice)) {
			this.choices.push(choice);
		}
	},

	removeChoice: function(choice) {
		throw new Error("Not implemented");
	},

	setVotes: function(phone, votes, vetoes) {
		this.votes.push({
			phone: phone,
			votes: votes,
			vetoes: vetoes,
		});
	},

	getWinner: function() {
		var votes = {};

		// Add up votes
		this.votes.forEach(function(vote) {
			vote.votes.forEach(function(index) {
				if ( ! votes[index]) {
					votes[index] = 0;
				}
				votes[index] += 1;
			});
		});

		this.votes.forEach(function(vote) {
			vote.vetoes.forEach(function(index) {
				if ( ! votes[index]) {
					votes[index] = 0;
				}
				votes[index] -= 3;
			});
		});

		var maxVote = -Infinity;
		var maxIndex;
		Object.keys(votes).forEach(function(index) {
			var vote = votes[index];
			if (vote > maxVote) {
				maxVote = vote;
				maxIndex = index;
			}
		});

		var arrIndex = parseInt(maxIndex, 10) - 1;
		return this.choices[arrIndex];
	},

	addPeople: function(people) {
		people.forEach(function(people) {
			people.id = people.name;
		});
		this.people = people;
	},
};
