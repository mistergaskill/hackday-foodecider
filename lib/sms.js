"use strict";

var SID = "AC9607667b4abb98a553769489df068403",
	AUTH_TOKEN = "1b821fbcca90a06a666f2a4c5b5d7787",
	PHONE_NUMBER = "+15705056279",
	async = require("async"),
	twilio = require("twilio")(SID, AUTH_TOKEN),
	sms = module.exports;

sms.announceSession = function(people, callback) {
	if ( ! callback) callback = function(){};

	var numbers = people.map(function(person) {
			return person.phone;
		}),
		message = "You have been invited to a Foodecider session.";

	sms.send(message, numbers, callback);
};

sms.send = function(message, phoneNumbers, callback) {
	// Phone number should be in the format: 1213435665
	async.forEach(phoneNumbers, function(phoneNumber, cb) {
		twilio.sms.messages.create({
			body: message,
			to: "+1" + phoneNumber,
			from:PHONE_NUMBER,
		}, cb);
	}, callback);
};
