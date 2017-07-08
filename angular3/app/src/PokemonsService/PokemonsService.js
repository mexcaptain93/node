let appId = '80153656-A0C1-1735-FFB1-1A7318567300';
let secretKey = 'B68E5193-B06A-923C-FF8B-0C188BA7A000';

angular
    .module('PokemonApp')
    .factory('PokemonsService', function($http) {

            return {

                getPokemons: function() {
                    return $http.get('http://pokeapi.co/api/v2/pokemon/?limit=10');
                },

                getPokemon: function(pokemonId) {
                    return $http.get('http://pokeapi.co/api/v2/pokemon/' + pokemonId);
                },

                createPokemon: function(pokemonData) {
                    return $http({
                        method: 'POST',
                        url: 'https://api.backendless.com/' + appId + '/' +  secretKey + '/data/pokemons',
                        data: pokemonData
                    });
                },

                editPokemon: (pokemonData) => {
                    let pokemonId = pokemonData.id;
                    delete pokemonData.id;
                    return $http({
                        method: 'PUT',
						url: 'https://api.backendless.com/' + appId + '/' +  secretKey + '/data/pokemons/' + pokemonId,
                        data: pokemonData
					});
                },

                deletePokemon: function(pokemonId) {
                    return $http({
                        method: 'DELETE',
                        url: 'https://api.backendless.com/' + appId + '/' +  secretKey + '/data/pokemons/' + pokemonId,
                    });
                }

            }

        }

    );
