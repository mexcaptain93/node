$(function() {

	// Initialize variables
	var $window = $(window);
	var table = $('.table');

	var socket = io();

	// Socket events

	// Whenever the server emits 'login', log the login message
	socket.on('start', function (data) {
		console.log('started');
		data.people.forEach((person) => {
			table.append('<div class="table__row"><div class="table__cell">' + person.name + '</div><div class="table__cell">' + person.lastname + '</div><div class="table__cell">' + person.phone + '</div></div>')
		})
	});



});