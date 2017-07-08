'use strict';

pokemonApp.controller('PokemonListCtrl', function($scope, PokemonsService, BerriesService) {

    // PokemonsService.getPokemons().then(function(response) {
    //     $scope.pokemons = response.data.results;
    // });
    //
    // BerriesService.getBerries().then(function(response) {
    //     $scope.berries = response.data.results;
    // });

    $scope.pokemonsLoaded = false;
    $scope.berriesLoaded = false;

    PokemonsService.getPokemons().then(function(response) {
        $scope.pokemons = response.data.results;
        $scope.pokemonsLoaded = true;

        return BerriesService.getBerries()
    }).then(function(response) {
        $scope.berries = response.data.results;
		$scope.berriesLoaded = true;
    });



});
