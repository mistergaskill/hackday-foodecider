"use strict";

var SID = "AC9607667b4abb98a553769489df068403",
	AUTH_TOKEN = "1b821fbcca90a06a666f2a4c5b5d7787",
	PHONE_NUMBER = "+15705056279",
	client = require("twilio")(SID, AUTH_TOKEN),
	twilio = module.exports;

twilio.send = function(message, phoneNumber, callback) {
	// Phone number should be in the format: 1213435665
	client.sms.messages.create({
		body: message,
		to: "+1" + phoneNumber,
		from:PHONE_NUMBER,
	}, callback);
};
