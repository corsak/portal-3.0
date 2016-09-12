angular.module('starter.services', function($httpProvider) {
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  var param = function(obj) {
	var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
	  
	for(name in obj) {
	  value = obj[name];
		
	  if(value instanceof Array) {
		for(i=0; i<value.length; ++i) {
		  subValue = value[i];
		  fullSubName = name + '[' + i + ']';
		  innerObj = {};
		  innerObj[fullSubName] = subValue;
		  query += param(innerObj) + '&';
		}
	  }
	  else if(value instanceof Object) {
		for(subName in value) {
		  subValue = value[subName];
		  fullSubName = name + '[' + subName + ']';
		  innerObj = {};
		  innerObj[fullSubName] = subValue;
		  query += param(innerObj) + '&';
		}
	  }
	  else if(value !== undefined && value !== null)
		query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
	}
	  
	return query.length ? query.substr(0, query.length - 1) : query;
  };
  $httpProvider.defaults.transformRequest = [function(data) {
	return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
})
.factory('Userinfo', function() {
	var userinfo = {};

	return {
		save: function(j) {
			for (var k in j) {
				window.localStorage[k] = userinfo[k] = j[k];
			};
			return userinfo;
		},

		remove: function(f) {
			if (f.constructor == Array) {
				for (var i = 0; i < f.length; i++) {
					window.localStorage.removeItem(f[i]);
				}
			}
			window.localStorage.removeItem(f);
		},

		add: function(k, v) {
			window.localStorage[k] = userinfo[k] = v;
		},

		addLong: function(k, v) {
			window.localStorage[k] = v;
		},

		l: window.localStorage
	};
})

.factory('Helpinfo', function() {
		var helpinfo = [];

		return {
			save: function(j) {
				for (var k = 0; k < j.length; k++) {
					helpinfo.push(j[k]);
				}
			},
			get: function(title) {
				for (var i = 0; i < helpinfo.length; i++) {
					if (helpinfo[i].title === title) {
						return helpinfo[i]
					}
				}
				return null;
			},
			all: helpinfo
		}
	})
	.factory('chat', ['$q', '$rootScope',
		function($q, $rootScope) {
			var messages = [];

			function getMessages() {
				return messages;
			}

			function buildChat(history) {
				messages.length = 0;
				history.forEach(addMessage);
			}

			function addMessage(message) {
				console.log(message);
				var time,
					hour,
					minute,
					text,
					newMessage;

				// Convert timestamp to human-friendly format
				time = new Date(message.time);
				hour = time.getHours();
				minute = time.getMinutes();
				time = (hour > 9 ? hour : '0' + hour) + ':' + (minute > 9 ? minute : '0' + minute);

				text = addIcons(message.message_content);

				newMessage = {
					user_nickname: message.user_nickname,
					color: message.color,
					time: time,
					message_content: text
				};
			console.log(message.user_nickname+"Say:"+text);
				messages.push(newMessage);
			}

			function getIcon(icon) {
				icon = icon || ':)';

				var icons = {
					':)': 'smile',
					':(': 'sad',
					':P': 'tongue',
					':O': 'suprised',
					'<3': 'love',
					':/': 'depressed',
					':\\': 'depressed',
					';)': 'blink',
					':S': 'confused',
					':D': 'bigsmile'
				};

				return '<i class="smiley ' + icons[icon] + '" title="' + icon + '"></i>';
			}

			function addIcons(message) {
				message = message.replace(':)', getIcon(':)'))
					.replace(/\(:/gi, getIcon(':)'))
					.replace(/:\(/gi, getIcon(':('))
					.replace(/\):/gi, getIcon(':('))
					.replace(/:P/gi, getIcon(':P'))
					.replace(/P:/gi, getIcon(':P'))
					.replace(/:O/gi, getIcon(':O'))
					.replace(/O:/gi, getIcon(':O'))
					.replace(/<3/gi, getIcon('<3'))
					.replace(/3>/gi, getIcon('<3'))
					.replace(/:\//gi, getIcon(':/'))
					.replace(/:\\/gi, getIcon(':/'))
					.replace(/\/:/gi, getIcon(':/'))
					.replace(/\\:/gi, getIcon(':/'))
					.replace(/;\)/gi, getIcon(';)'))
					.replace(/\(;/gi, getIcon(';)'))
					.replace(/:S/gi, getIcon(':S'))
					.replace(/S:/gi, getIcon(':S'))
					.replace(/:D/gi, getIcon(':D'))
					.replace(/D:/gi, getIcon(':D'));

				return message;
			}

			// Publish API
			return {
				getMessages: getMessages,
				buildChat: buildChat,
				addMessage: addMessage
			};

		}
	]).factory('server', ['$rootScope',
		function($rootScope) {

			var ws;

			function connect() {
				var options;

				console.log('[1/2] Connecting to the server.');
				ws = new WebSocket('ws://127.0.0.1:8098/ws/chat.ws');

				options = {
					onopen: onOpen,
					onmessage: onMessage,
					onerror: onError,
					onclose: onClose
				};

				angular.extend(ws, options);
			}

			function send(message) {
				console.log(message);
				if (ws) {
					ws.send(JSON.stringify(message));
				}
			}

			function disconnect(reconnect) {
				if (ws) {
					ws.close();

					if (reconnect) {
						connect();
					}
				}
			}

			function onOpen() {
				console.log('[2/2] Connected to the server.');
				$rootScope.$broadcast('messageAll', {
					message: 'server:connected'
				});
				$rootScope.$apply();
			}

			function onMessage(response) {
				var data, messages = [];

				response = JSON.parse(response.data);
				data = response.data;

				switch (response.type) {
					case 'message':
						messages.push({
							message: 'chat:message',
							data: data
						});
						break;
					case 'history':
						messages.push({
							message: 'app:loggedIn',
							data: data
						});
						messages.push({
							message: 'chat:history',
							data: data
						});
						break;
					case 'nick_error':
						messages.push({
							message: 'app:nickError'
						});
						break;
					case 'new_user':
						messages.push({
							message: 'userlist:add',
							data: data
						});
						break;
					case 'user_list':
						messages.push({
							message: 'userlist:current',
							data: data
						});
						break;
					case 'remove_user':
						messages.push({
							message: 'userlist:remove',
							data: data
						});
						break;
				}

				messages.forEach(function(message) {
					$rootScope.$broadcast('messageAll', message);
				});

				$rootScope.$apply();
			}

			function onError(error) {
				console.error('Error!\n', 'Code: ' + error.code, '\nReason: ' + (error.reason || '-Unknown-'));
			}

			function onClose(error) {
				if (!error.wasClean) {
					console.error('Error!\n', 'Code: ' + error.code, '\nReason: ' + (error.reason || '-Unknown-'));
				}

				console.log('Disconnected.');
			}

			// Publish API
			return {
				connect: connect,
				send: send,
				disconnect: disconnect
			};

		}
	])