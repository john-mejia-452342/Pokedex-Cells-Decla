import { CellsPage } from '@cells/cells-page';


class PokemonListDM extends CellsPage {

  static get is() {
    return 'pokemon-list-dm';
  }

  static get properties() {
    return {
      pokemonList: { type: Array}
    };
  }

  constructor() {
    super();
    this.pokemonList = [];
  }

  async fetchPokemonList() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
      const data = await response.json();
      return this.processPokemonData(data);
    } catch (error) {
      this.handleError(error);
    }
  }

  async processPokemonData(data) {
    try {
      const promises = data.results.map(async pokeUrl => {
        const response = await fetch(pokeUrl.url);
        const pokemonData = await response.json();

        const evosPokesResponse = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonData.id}`);
        const evosPokemons = await evosPokesResponse.json();

        const pokemonListBase = await fetch(` https://pokeapi.co/api/v2/pokemon/${evosPokemons.chain.species.name}`);
        const Pokemons = await pokemonListBase.json();

        const evoUrls = [];
        if (evosPokemons.chain.evolves_to.length > 0) {
          evoUrls.push(`https://pokeapi.co/api/v2/pokemon/${evosPokemons.chain.evolves_to[0].species.name}`);
          if (evosPokemons.chain.evolves_to[0].evolves_to.length > 0) {
            evoUrls.push(`https://pokeapi.co/api/v2/pokemon/${evosPokemons.chain.evolves_to[0].evolves_to[0].species.name}`);
          }
        }

        const evoPromises = evoUrls.map(async url => {
          const evoResponse = await fetch(url);
          return await evoResponse.json();
        });
        const evoPokemons = await Promise.all(evoPromises);

        return {
          name: Pokemons.name,
          id: Pokemons.id,
          types: Pokemons.types.map(type => type.type.name),
          sprite: Pokemons.sprites.other['official-artwork'].front_default,
          Evos: evoPokemons.map(pokemon => ({
            name: pokemon.name,
            id: pokemon.id,
            types: pokemon.types.map(type => type.type.name),
            sprite: pokemon.sprites.other['official-artwork'].front_default
          }))
        };
      });
      this.pokemonList = await Promise.all(promises);
      return this.pokemonList;

    } catch (error) {
      console.error('Error processing Pokemon data:', error);
    }
  }


  handleError(error) {
    console.error('Error fetching Pokémon list:', error);
  }

}

window.customElements.define(PokemonListDM.is, PokemonListDM);