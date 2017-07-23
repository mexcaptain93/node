'use strict';

pokemonApp.controller('CreatePokemonCtrl', function($scope) {

    $scope.newPokemon = {};
    $scope.addPokemon = function(myPokemon) {
        console.log(myPokemon);
        $scope.newPokemon = {};
    };

});
