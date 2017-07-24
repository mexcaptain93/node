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
		console.log(this.list);
		console.log('Quantity: ' + this.list.length);
	}
	max() {
		let max = 0;
		let maxPokemon;
		this.list.forEach((p) => {
			if (p.level > max) {
				max = p.level;
				maxPokemon = p;
			}
		});
		return maxPokemon;


	}

}

let pikachu = new Pokemon('Pikachu', 1);
let bulbasaur = new Pokemon('Bulbasaur', 1);
let ivisaur = new Pokemon('Ivisaur', 2);
let charmander = new Pokemon('Charmander', 8);

let lost = new PokemonList([pikachu, bulbasaur]);
let found = new PokemonList([ivisaur, charmander]);

let squirtle = new Pokemon('Squirtle', 4);
let caterpie = new Pokemon('Caterpie', 3)

lost.add(squirtle);
found.add(caterpie);

lost.show();
found.show();

console.log(lost.max());

let pokemonToMove = lost.list.splice(0,1)[0];


found.add(pokemonToMove);

// lost.show();
// found.show();
//
