angular
	.module('PokemonApp')
	.factory('BerriesService', function($resource) {
		return $resource('https://api.backendless.com/80153656-A0C1-1735-FFB1-1A7318567300/B68E5193-B06A-923C-FF8B-0C188BA7A000/data/berries', {}, {
			query: {
				method: 'GET',
				headers: { 'application-id': undefined, 'secret-key': undefined },
				isArray: true,
				transformResponse: function(responseData) {
					return angular.fromJson(responseData);
				}
			},
			update: {
				method: 'PUT'
			}
		})
	});
