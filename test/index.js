"use strict";

var request = require("request"),
	assert = require("assert"),
	API_URL = "http://localhost:8000";

describe("Foodecider", function() {
	it("should Run this test", function(done) {
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
			done();
		});
	});
});
