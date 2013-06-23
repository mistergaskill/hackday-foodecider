"use strict";

var connect = require("connect"),
	createRouter = require("connect-route"),
	Session = require("./lib/session");

var server = connect();

server.use(connect.logger("dev"));
server.use(connect.json());
server.use(connect.errorHandler());

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
		var session = new Session();
		session.people = req.body.people;
		res.json({
			sessionID: session.id,
			texted: [],
			failed: [],
		});
	});

	// Get list of people
	router.get("/:sid/people", function(req, res, next) {
	});
}));

var people = createRouter(function(router) {
	router.get("/foo", function(req, res, next) {
	});
});

server.listen(8000, function() {
	console.log("Listening");
});
