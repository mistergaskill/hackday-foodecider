"use strict";

var request = require("request"),
	assert = require("assert"),
	API_URL = "http://localhost:8000";

describe("Foodecider", function() {
	it("should Run this test", function(done) {
		request.post(API_URL + "/", {
			people: [
				{name: "jeff", phone: "9492370653"},
				{name: "parsha", phone: "9492301333"},
			],
		}, function(err, res, body) {
			assert.ifError(err);
			assert.equal(res.statusCode, 200);
			var response = JSON.parse(body);
			assert.ok(response.sessionID);
			assert.ok(response.texted);
			assert.ok(response.failed);

			assert.equal(response.texted.length, 2);
			assert.equal(response.failed.length, 2);
			done();
		});
	});
});
