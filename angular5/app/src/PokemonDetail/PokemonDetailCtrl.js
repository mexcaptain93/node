'use strict';

pokemonApp.controller('PokemonDetailCtrl', function($scope, $routeParams, PokemonsService) {

    PokemonsService.getPokemon($routeParams['pokemonId']).then(function(pokemonData) {
        $scope.pokemon = pokemonData.data;
    });

});
