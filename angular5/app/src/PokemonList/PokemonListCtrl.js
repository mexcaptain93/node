'use strict';

pokemonApp.controller('PokemonListCtrl', function($scope, PokemonsService) {

    PokemonsService.getPokemons().then(function(pokemonsData) {
        $scope.pokemons = pokemonsData.data;
    });

    $scope.myOrderProperty = 'weight';

});
