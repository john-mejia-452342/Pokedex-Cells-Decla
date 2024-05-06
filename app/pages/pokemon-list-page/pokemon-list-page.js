import { CellsPage } from '@cells/cells-page';
import { html, css } from 'lit-element';
import styles from './pokemon-list-page-style.js';


import '../../elements/pokemon-list-dm/pokemon-list-dm';

class PokeListPage extends CellsPage {
  static get is() {
    return 'pokemon-list-page';
  }

  static get properties() {
    return {
      pokemonList: { type: Array },
      selectedPokemon: { type: Object },
      isModalOpen: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.pokemonList = [];
    this.selectedPokemon = null;
    this.isModalOpen = false;
  }

  static get styles() {
    return [ styles ];
  }

  async firstUpdated() {
    this.pokeApiDm = this.shadowRoot.querySelector('#pokeapi-data');
    this.pokemonList = await this.pokeApiDm.fetchPokemonList();
  }

  render() {
    return html`
      <div>
        <div class="pokedex-header">Pokedex</div>
        <div class="container">
        ${this.pokemonList.map(pokemon => html`
          <div class="pokemon-card">
            <img class="pokemon-image" src="${pokemon.sprite}" alt="${pokemon.name}">
            <h2>${pokemon.name.toUpperCase()}</h2>
            <p>ID: ${pokemon.id}</p>
            <div class="tipos">
              ${pokemon.types.map(type => html`
                <p>${type}</>
              `)}
            </div>
            <button class="btn-modal" @click="${() => this.openEvolutionModal(pokemon)}">Ver Evos</button>
          </div>
        `)}
      </div>
    </div>
      <pokemon-list-dm id="pokeapi-data"></pokemon-list-dm>
      ${this.isModalOpen
    ? html`
            <div class="modal">
              <div class="modal-content">
                <div class="header-modal">
                  <h2>Evoluciones de ${this.selectedPokemon?.name.toUpperCase()}</h2>
                  <button class="modal-close" @click="${this.closeEvolutionModal}">Cerrar</button>
                </div>
                <div class="modal-pokes">
                ${this.selectedPokemon.Evos.map(pokemon => html`
                <div class="pokemon-card">
                  <img class="pokemon-image" src="${pokemon.sprite}" alt="${pokemon.name}">
                  <h2>${pokemon.name.toUpperCase()}</h2>
                  <p>ID: ${pokemon.id}</p>
                  <div class="tipos">
                    ${pokemon.types.map(type => html`
                      <p>${type}</>
                    `)}
                  </div>
                </div>
              </div>
              `)}
                
              </div>
            </div>
          `
    : null}
    `;
  }

  openEvolutionModal(pokemon) {
    this.selectedPokemon = pokemon;
    this.isModalOpen = true;
  }

  closeEvolutionModal() {
    this.selectedPokemon = null;
    this.isModalOpen = false;
  }


  // navigateToEvos(pokemon) {
  //   console.log('Pokemon:', pokemon.id);

  //   // this.navigate(`evolution/${pokemon.id}`, { id: pokemon.id });
  //   this.navigate('/evolution', { id: pokemon.id });

  // }

}

window.customElements.define(PokeListPage.is, PokeListPage);