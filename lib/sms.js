"use strict";

var SID = "AC9607667b4abb98a553769489df068403",
	AUTH_TOKEN = "1b821fbcca90a06a666f2a4c5b5d7787",
	PHONE_NUMBER = "+15705056279",
	async = require("async"),
	twilio = require("twilio")(SID, AUTH_TOKEN),
	sms = module.exports,
	QUIET_MODE = process.env["QUIET"];

var lastSID;

sms.announceSession = function(people, callback) {
	sms.announce("You have been invited to a Foodecider session. Add some suggestions e.g. (add panda express)", people, callback);
};

sms.announceVoting = function(people, choices, callback) {
	var message = "vote now e.g. (vote 1 12 3 veto 7)\n";

	choices.forEach(function(choice, index) {
		message += "" + (index + 1) + ". " + choice.name + "\n";
	});

	sms.announce(message, people, callback);
};

sms.announceWinner = function(people, winner, callback) {
	sms.announce("You are eating at " + winner.name + ".", people, callback);
};

sms.announce = function(message, people, callback) {
	var numbers = people.map(function(person) {
			return person.phone;
		});

	sms.send(message, numbers, callback);
};

sms.send = function(message, phoneNumbers, callback) {
	if ( ! callback) callback = function(){};

	if (QUIET_MODE) {
		console.log(message);
	}
	else {
		// Phone number should be in the format: 1213435665
		async.forEach(phoneNumbers, function(phoneNumber, cb) {
			twilio.sms.messages.create({
				body: message,
				to: "+1" + phoneNumber,
				from:PHONE_NUMBER,
			}, cb);
		}, callback);
	}
};

sms.getNew = function(callback) {
	twilio.sms.messages.get(function(err, response) {
		if (err) return callback(err);

		var latestHit = true,
			newMessages = response.smsMessages.filter(function(message) {
				if (message.sid === lastSID) {
					latestHit = false;
				};
				return latestHit && message.to === PHONE_NUMBER;
			});

		if (newMessages.length > 0) {
			lastSID = newMessages[0].sid;
		}

		newMessages = newMessages.map(function(message) {
				return {
					message: message.body,
					phone: message.from.slice(2),
				};
			});

		callback(null, newMessages);
	});
};

sms.getLastSID = function(callback) {
	twilio.sms.messages.get(function(err, response) {
		if (err) return callback(err);

		if (response.smsMessages.length > 0) {
			callback(null, response.smsMessages[0].sid);
		}
		else {
			callback();
		}
	});
};

// Initialize last SID on server boot.
sms.getLastSID(function(err, SID) {
	if (err) return console.error(err);

	lastSID = SID;
});
