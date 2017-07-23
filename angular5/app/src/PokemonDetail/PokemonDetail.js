'use strict'

pokemonApp.component('pokemonDetail', {
	bindings: {
		pokemon: '='
	},
	controller: ($scope, $routeParams, PokemonsService) => {
		PokemonsService.getPokemon($routeParams['pokemonId']).then(function(pokemonData) {
			$scope.pokemon = pokemonData.data;
		});
	},
	templateUrl: 'src/PokemonDetail/PokemonDetail.html'
});