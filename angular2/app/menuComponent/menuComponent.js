'use strict';

angular
	.module('myApp')
	.component('menuComponent', {
		templateUrl: 'menuComponent/menuComponent.html',
		controller: function($scope) {
			$scope.links = [
				{
					name: 'Список',
					link: 'list'
				},
				{
					name: 'Создать нового',
					link: 'createNewPokemon'
				},
				{
					name: 'Личный кабинет',
					link: 'myAccount'
				}

			];
		}
	});