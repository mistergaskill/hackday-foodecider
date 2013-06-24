var connect = require('connect');
var bouncy  = require('bouncy');

var API_PORT = 8001;

var whitelist = [/^\/vendor/, /^\/lib/, /^\/css/, /^\/app.js/, /^\/main.js/];
var isStaticFile = function(file) {
  return whitelist.some(function(regex) {
    return regex.test(file);
  });
};


var app = connect()
  .use(function(req, res, next) {
    console.log('hi');
    if (!isStaticFile(req.url)) {
      req.url = '/'
    }
    next();
  })
  .use(connect.static(__dirname))
  .listen(8000);

/*
var b = bouncy(function(req, res, bounce) {
  console.log('bouncy');
  if (/^\/api/.test(req.url)) {
    console.log("bouncing", req.url);
    bounce(API_PORT, {
      path: req.url.slice(4) || "/"
    });
  }
  else {
    bounce(8002);
  }
});

b.listen(8000);
*/
