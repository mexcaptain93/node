const expect = require('chai').expect;
const should = require('chai').should;

describe('Pokemon Tests', () => {
	class Pokemon {
		constructor(name, level) {
			this.name = name;
			this.level = level;
		}

		show() {
			return this;
		}
	}

	class PokemonList {
		constructor(list) {
			this.list = list;
		}

		add(pokemon) {
			this.list.push(pokemon);
		}

		show() {
			// console.log(this.list);
			// console.log('Quantity: ' + this.list.length);
			return this.list;
		}
		max() {
			let max = 0;
			this.list.forEach((pokemon) => {
				if (pokemon.level > max) {
					max = pokemon.level;
				}
			});
			return max;
		}
	}

	let pikachu = new Pokemon('Pikachu', 1);
	let bulbasaur = new Pokemon('Bulbasaur', 1);
	let ivisaur = new Pokemon('Ivisaur', 2);
	let charmander = new Pokemon('Charmander', 2);

	let lost = new PokemonList([pikachu, bulbasaur]);
	let found = new PokemonList([ivisaur, charmander]);

	let squirtle = new Pokemon('Squirtle', 4);
	let caterpie = new Pokemon('Caterpie', 3)

	lost.add(squirtle);
	found.add(caterpie);

	lost.show();
	found.show();


	let pokemonToMove = lost.list.splice(0, 1)[0];


	found.add(pokemonToMove);

	lost.show();
	found.show();


	it('Should show pokemon', () => {
		expect(pikachu.show()).to.be.a('object');
	});

	it('Should add pokemon to list', () => {
		const length = lost.show().length;
		lost.add(new Pokemon('myPokemon', 2));
		expect(lost.show().length).to.equal(length + 1);
	});
	it('Should show pokemon list', () => {
		expect(lost.show()).to.be.a('array')
	});

	it('Should show pokemon with max level', () => {
		let max = 0;
		lost.show().forEach((p) => {
			if (p.level > max) {
				max = p.level;
			}
		});
		expect(lost.max()).to.equal(max);
	});

});