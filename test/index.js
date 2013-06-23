"use strict";

var request = require("request"),
	assert = require("assert"),
	API_URL = "http://localhost:8000";

describe("Session", function() {
	var sessionID;

	it("should create", function(done) {
		request({
			url: API_URL + "/",
			method: "POST",
			json: {
				people: [
					{name: "jeff", phone: "9492370653"},
					{name: "parsha", phone: "9492301333"},
				],
			},
		}, function(err, res, body) {
			assert.ifError(err);
			assert.equal(res.statusCode, 200);
			assert.ok(body.sessionID);
			assert.ok(body.texted);
			assert.ok(body.failed);

			assert.equal(body.texted.length, 2);
			assert.equal(body.failed.length, 0);

			sessionID = body.sessionID;

			done();
		});
	});

	it("should fetch people", function(done) {
		request({
			url: API_URL + "/" + sessionID + "/people",
			method: "GET",
			json: true,
		}, function(err, res, body) {
			assert.ifError(err);
			assert.equal(res.statusCode, 200);
			assert.equal(body.people.length, 2);
			done();
		});
	});

	it("should add choice", function(done) {
		request({
			url: API_URL + "/" + sessionID + "/choices",
			method: "POST",
			json: {
				name: "Chipotle",
			},
		}, function(err, res, body) {
			assert.ifError(err);
			assert.equal(res.statusCode, 200);
			assert.equal(body.choices.length, 1);
			assert.equal(body.choices[0], "Chipotle");
			done();
		});
	});
});
