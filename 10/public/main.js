$(function() {

	const socket = io();

	var username = '';

	function setUsername() {
		$('.js-btn-username').on('click', function(e) {
			e.preventDefault();
			username = $('.js-input-username').val().trim();
			if (username) {
				$('.js-block-username').fadeOut();
				$('.js-block-message').fadeIn();
				socket.emit('add user', username);
			}
		});
	}

	function sendMessage() {
		$('.js-btn-message').on('click', function(e) {
			e.preventDefault();
			const message = $('.js-input-message').val().trim();
			if (message) {
				$('.js-input-message').val('');
				const data = {
					username: username,
					message: message
				};
				socket.emit('send message', data);

			}
		});
	}

	setUsername();
	sendMessage();

	function log(msg, j) {
		var joined = '';

		if (j) {
			joined = 'joined';
		} else {
			joined = '';
		}

		const window = $('.js-chat-window')

		window.append('<span class="' + joined + '">' + msg + '</span>');
		window.scrollTop(window.prop("scrollHeight"));
	}

	socket.on('user joined', function(data) {
		log('User ' + data.username + ' joined', true);
	});

	socket.on('add message', function(data) {
		log('<b>' + data.username + ':</b> ' + data.message, false);
	});



});