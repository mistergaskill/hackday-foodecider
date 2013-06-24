"use strict";

var connect = require("connect"),
	createRouter = require("connect-route"),
	Session = require("./lib/session"),
	sms = require("./lib/sms"),
	parseSMS = require("./lib/parseSMS");

var server = connect();

server.use(connect.logger("dev"));
server.use(connect.json());
server.use(connect.errorHandler());
server.use(allowCORS);

// Add CORS header
function allowCORS(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader("Access-Control-Allow-Methods", "*");

	if ('OPTIONS' === req.method) {
		return res.end();
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
		session.addPeople(req.body.people);

		// Send the session announcement
		sms.announceSession(req.body.people);

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
		session.addChoice(req.body.choice);
		res.json(session);
	});

	// Delete choice
	router.delete("/:sid/choices/:name", function(req, res, next) {
		var session = Session.get(req.params.sid);
		session.removeChoice(req.params.name);
		res.end();
	});

	// Start voting
	router.post("/:sid/start", function(req, res, next) {
		var session = Session.get(req.params.sid);
		session.voting = true;
		sms.announceVoting(session.people, session.choices);
		res.end();
	});

	router.post("/:sid/end", function(req, res, next) {
		var session = Session.get(req.params.sid);
		var winner = session.getWinner();
		sms.announceWinner(session.people, session.getWinner());
		Session.delete(session.id);
		res.end();
	});

	// Set votes/vetoes
	router.post("/:sid/people/:phone/votes", function(req, res, next) {
		var session = Session.get(req.params.sid);
		var phone = req.params.phone;
		session.setVotes(phone, req.body.votes);
		session.setVetoes(phone, req.body.vetoes);
		res.end();
	});
}));

function getSession(req, res, next) {
	var session = Session.get(req.params.sid);
	res.json(session);
}

setInterval(function() {
	sms.getNew(function(err, messages) {
		messages.forEach(function(message) {
			var session = Session.getByPhone(message.phone);
			var result = parseSMS(message.message);

			if (result.type === "add") {
				session.addChoice({
					name: result.name,
					suggester: message.phone,
				});
			}
			else if (result.type === "vote") {
				var votes = result.votes || [];
				var vetoes = result.vetoes || [];
				session.setVotes(message.phone, votes, vetoes);
			}
			else if (result.type === "none") {
				console.error("Bad message", message);
			}
		});
	});
}, 5000);

server.listen(process.env.PORT, function() {
	console.log("Listening");
});
