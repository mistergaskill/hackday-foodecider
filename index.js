"use strict";

var connect = require("connect"),
	createRouter = require("connect-route"),
	Session = require("./lib/session");

var server = connect();

server.use(connect.logger("dev"));
server.use(connect.json());
server.use(connect.errorHandler());
server.use(allowCORS);

// Add CORS header
function allowCORS(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");

	if ('OPTIONS' === req.method) {
		return res.send(200);
	}

	next();
}

// Helpers
server.use(function(req, res, next) {
	res.json = function(obj) {
		res.setHeader("Content-Type", "application/json");
		res.end(JSON.stringify(obj));
	};
	next();
});

server.use(createRouter(function(router) {
	// -- Sessions

	// Create session
	router.post("/", function(req, res, next) {
		// Create the session
		var session = new Session();
		session.people = req.body.people;

		// Send the session announcement
		// sms.announceSession(req.body.people);

		res.json({
			sessionID: session.id,
			texted: session.people,
			failed: [],
		});
	});

	// Get
	router.get("/:sid", getSession);
	router.get("/:sid/people", getSession);
	router.get("/:sid/choices", getSession);

	// Add choice
	router.post("/:sid/choices", function(req, res, next) {
		var session = Session.get(req.params.sid);
		session.addChoice(req.body.name);
		res.json(session);
	});

	// Delete choice
	router.delete("/:sid/choices/:name", function(req, res, next) {
		var session = Session.get(req.params.sid);
		session.removeChoice(req.params.name);
		res.end();
	});

	// Start voting
	router.post(":/sid/start", function(req, res, next) {
	});
}));

function getSession(req, res, next) {
	var session = Session.get(req.params.sid);
	res.json(session);
}

server.listen(process.env.PORT, function() {
	console.log("Listening");
});
