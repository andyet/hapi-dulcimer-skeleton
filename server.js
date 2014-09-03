var hapi = require('hapi');
var moonboots = require('moonboots_hapi');
var config = require('getconfig');
var templatizer = require('templatizer');
var stylizer = require('stylizer');
var models = require('./models');
var dulcimer = require('dulcimer');
var platform_gateway_auth = require('platform-gateway-auth');

dulcimer.connect(config.dulcimer);

var server = hapi.createServer(config.api.http.port, config.api.http.host);

server.pack.register({
    plugin: platform_gateway_auth,
    options: {},
}, function () {
    console.log("gateway auth registered");
});


server.route({
    method: 'GET',
    path: '/task',
    handler: function (request, reply) {
        reply(200, {hi: 1});
        console.log(request.auth);
    },
    config: {
        auth: 'gateway',
    }
});

server.route({
    method: 'GET',
    path: '/task/{id}',
    handler: function (request, reply) {
    }
});


server.pack.register({
    plugin: moonboots,
    options: {
        appPath: '/{p*}',
        moonboots: {
            main: __dirname + '/client/app.js',
            developmentMode: config.devMode,
            beforeBuildJS: function () {
                templatizer(__dirname + '/templates', __dirname + '/client/templates.js');
            },
            beforeBuildCSS: function (callback) {
                stylizer({
                    infile: __dirname + '/assets/styles/main.styl',
                    outfile: __dirname + '/assets/main.css',
                    development: config.isDev,
                    watch: __dirname + '/assets/**/*.styl'
                }, function () {
                    callback();
                });
            },
            stylesheets: [
                //__dirname + '/assets/bootstrap.css',
                __dirname + '/assets/main.css'
            ]
        }
    }
}, function () {
    console.log('running server at http://' + config.api.http.host + ':' + config.api.http.port);
    server.start();
});
