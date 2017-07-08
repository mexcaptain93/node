'use strict';

pokemonApp.controller('PokemonListCtrl', function($scope, PokemonsService, BerriesService) {

    // PokemonsService.getPokemons().then(function(response) {
    //     $scope.pokemons = response.data.results;
    // });
    //
    // BerriesService.getBerries().then(function(response) {
    //     $scope.berries = response.data.results;
    // });

    PokemonsService.getPokemons().then(function(response) {
        $scope.pokemons = response.data.results;

        return BerriesService.getBerries()
    }).then(function(response) {
        $scope.berries = response.data.results;
    });



});
