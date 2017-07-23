angular
    .module('PokemonApp')
    .factory('PokemonsService', function($http) {

            return {

                getPokemons: function() {
                    return $http.get('data/pokemons.json');
                },

                getPokemon: function(pokemonId) {
                    return $http.get('data/pokemon.' + pokemonId + '.json');
                }

            }

        }

    );
