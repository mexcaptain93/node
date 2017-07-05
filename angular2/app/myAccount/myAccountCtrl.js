'use strict';

angular
	.module('myApp')
	.controller('myAccountCtrl', function() {

		var vm = this;

		vm.saveUser = function(user) {
			console.log(user);
			vm.userForm.$setPristine();
		};

	});
