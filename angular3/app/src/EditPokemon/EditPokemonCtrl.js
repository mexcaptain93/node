'use strict';

pokemonApp.controller('EditPokemonCtrl', function($scope, PokemonsService) {

	$scope.editPokemon = function(myPokemon) {

		$scope.editingSuccess = false;

		PokemonsService.editPokemon(myPokemon).then(function(response) {
			$scope.editingSuccess = true;
		});

	}

});
