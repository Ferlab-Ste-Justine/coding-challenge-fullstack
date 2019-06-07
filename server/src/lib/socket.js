
'use strict';

const cookieParser     = require('cookie-parser');
const passportSocketIo = require('passport.socketio');

const config      = require('@lib/config/main');

const log         = require('@lib/log');

const SocketRocket = {
	init: function (http, sessionMiddleware) {
		this.io = require('socket.io')(http);
		this.bindEvents();

		this.io.use(passportSocketIo.authorize({
			cookieParser: cookieParser,
			key:          'express.sid',
			secret:       config.COOKIE_SECRET,
			store:        require('@lib/redis').store,
			success:      onAuthorizeSuccess,
			fail:         onAuthorizeFail
		}));
	},
	bindEvents: function () {
		this.io.on('connection', (socket) => {

			log.info('New socket connection.');


			socket.on('disconnect', () => {
				log.info('Socket disconnected.');
			});
		});
	},
	emitAll: function(eventName, data){
		if(this.io){
			this.io.emit(eventName, data);
		}
	}
};

let onAuthorizeSuccess = function(data, accept){
	accept();
};

let onAuthorizeFail = function(data, message, error, accept){
	accept();
};

module.exports = SocketRocket;